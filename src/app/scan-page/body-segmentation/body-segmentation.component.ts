import { EstimationConfig } from './../../../../node_modules/@tensorflow-models/face-landmarks-detection/dist/types.d';
import { Component, ElementRef, OnInit, QueryList, Renderer2, ViewChild, ViewChildren } from '@angular/core';
import * as bodyPix from '@tensorflow-models/body-pix';
import { FaceLandmarksDetector } from '@tensorflow-models/face-landmarks-detection';
import { WebcamInitError } from 'ngx-webcam';
import { Subscription } from 'rxjs';
import { BodySegmentationService } from 'src/app/services/body-segmentation.service';
import { FaceDetectionService } from 'src/app/services/face-detection.service';

@Component({
  selector: 'app-body-segmentation',
  templateUrl: './body-segmentation.component.html',
  styleUrls: ['./body-segmentation.component.scss']
})
export class BodySegmentationComponent implements OnInit{
  subscription!: Subscription;

  segmentations: bodyPix.SemanticPartSegmentation[] = [];

  @ViewChildren('imageCanvas', { read: ElementRef }) imageCanvas!: ElementRef;

  @ViewChild('webcam', { read: ElementRef }) webcamElement!: ElementRef;
  @ViewChild('webcamCanvas', { read: ElementRef }) webcamCanvasElement!: ElementRef;
  previousSegmentationComplete = true;

  videoRenderCanvas!: HTMLCanvasElement;
  videoRenderCanvasCtx!: CanvasRenderingContext2D | null;

  pdmm: number = 0;
  pixelShoulderWidth: number = 0;
  faces: FaceLandmarksDetector | undefined;

  personDistanceToCamera: number = 0;
  pixelScaleFactor: number = 0;
  realWorldShoulderWidth: number = 0;

  measuresToAverage: number[] = [];

  numberOfCameras: number = 0;

  constructor(private renderer: Renderer2, public bodySegmentationService: BodySegmentationService, public faceDetectionService: FaceDetectionService) {
    this.faceDetectionService.loadModel().then((faces: FaceLandmarksDetector) => {
      // console.log('Faces', faces);
      this.faces = faces;
    });
    //get number of cameras

  }
  ngOnInit(): void {
    navigator.mediaDevices.enumerateDevices().then((devices) => {
      devices.forEach((device) => {
        // console.log(device.kind + ": " + device.label);
        if (device.kind == 'videoinput') {
          this.numberOfCameras++;
        }
      });
    });
    //wait for the webcam to load
    this.enableCam();
  }

  onImageClick(event: any, index: any) {
    if (this.segmentations[index]) {
      return;
    }

    if (this.subscription) {
      this.subscription.unsubscribe();
      this.subscription = undefined as any;
    }

    this.subscription = this.bodySegmentationService.segmentation$.subscribe((parts: bodyPix.SemanticPartSegmentation) => {
      if (!parts) return;

      this.segmentations[index] = parts;

      const canvas = this.imageCanvas.nativeElement;
      canvas.width = parts.width;
      canvas.height = parts.height;

      this.processSegmentation(canvas, parts);
    });

    this.bodySegmentationService.segmentPersonParts(event.target);
  }

  // render returned segmentation data to a given canvas context.
  private processSegmentation(canvas: any, segmentation: any) {
    // The colored part image is an rgb image with a corresponding color from the rainbow colors
    // for each part at each pixel, and black pixels where there is no part.
    // console.log(segmentation);
    const coloredPartImage = bodyPix.toColoredPartMask(segmentation);

    // Draw the colored part image on top of the original image onto a canvas.
    // The colored part image will be drawn semi-transparent, with an opacity of 0.7,
    // allowing for the original image to be visible under.
    const opacity = 0.7;
    const flipHorizontal = false;
    const maskBlurAmount = 0;
    // console.log(canvas.width, canvas.height, coloredPartImage.width, coloredPartImage.height);
    //bodyPix.drawMask(canvas, canvas, coloredPartImage, opacity, maskBlurAmount, flipHorizontal);
    //this.drawSegmentLines(canvas, coloredPartImage);

  }

  // Check if webcam access is supported.
  hasGetUserMedia() {
    return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
  }

  // Enable the live webcam view and start classification.
  enableCam() {

    if (this.subscription && !this.subscription.closed) {
      this.subscription.unsubscribe();
    }
    // We will also create a tempory canvas to render to that is in memory only
    // to store frames from the web cam stream for classification.
    this.videoRenderCanvas = document.createElement('canvas');
    this.videoRenderCanvasCtx = this.videoRenderCanvas.getContext('2d');


    // getUsermedia parameters.
    const constraints = {

      video: {
        width: { ideal: 640 },
        height: { ideal: 480 },
        facingMode: { ideal: "environment" }
      },
    };

    // Activate the webcam stream.
    navigator.mediaDevices.getUserMedia(constraints).then(stream => {
      const webcamEl = this.webcamElement.nativeElement;
      this.renderer.setProperty(webcamEl, 'srcObject', stream);

      this.renderer.listen(webcamEl, 'loadedmetadata', () => {
        // Update widths and heights once video is successfully played otherwise
        // it will have width and height of zero initially causing classification to fail.
        this.renderer.setProperty(this.webcamCanvasElement.nativeElement, 'width', webcamEl.videoWidth);
        this.renderer.setProperty(this.webcamCanvasElement.nativeElement, 'height', webcamEl.videoHeight);

        this.videoRenderCanvas.width = webcamEl.videoWidth;
        this.videoRenderCanvas.height = webcamEl.videoHeight;

      });

      this.subscription = this.bodySegmentationService.segmentation$.subscribe((parts: bodyPix.SemanticPartSegmentation) => {
        if (parts.width > 0 && this.webcamCanvasElement.nativeElement.width > 0) {
        this.processSegmentation(this.webcamCanvasElement.nativeElement, parts);

          let grid = this.transformInt32ArrayToGriddedArray(parts.data, parts.width, parts.height);

          // find matching items in int32array and return the x and y coordinates
          let matchingIndexesInGrid = this.getIndexesOfMatchingNumbersInGrid(grid, [12, 13]);
          // console.log(matchingIndexesInGrid);
          let boundingBox = this.GetBoundingBoxFromArrayCoordinates(matchingIndexesInGrid);
          this.pixelShoulderWidth = boundingBox.xMax - boundingBox.xMin;
          if (this.pixelScaleFactor != 0) {
            let cmMeasureOfShoulders = (this.pixelShoulderWidth * this.pixelScaleFactor) / 10;
            //convert to inches
            let inMeasureOfShoulders = cmMeasureOfShoulders / 2.54;

            //add to array to average
            this.measuresToAverage.push(inMeasureOfShoulders);
            // if average is greater than length 10, remove the first item
            if (this.measuresToAverage.length > 1000) {
              this.measuresToAverage.shift();
            }

            //get average
            let sum = 0;
            this.measuresToAverage.forEach(measure => {
              sum += measure;
            });
            this.realWorldShoulderWidth = sum / this.measuresToAverage.length;
          }
          //draw bounding box red
          let ctx = this.webcamCanvasElement.nativeElement.getContext('2d');
          //clear canvas
          ctx.clearRect(0, 0, this.webcamCanvasElement.nativeElement.width, this.webcamCanvasElement.nativeElement.height);
          ctx.strokeStyle = 'green';
          ctx.lineWidth = 2;
          ctx.strokeRect(boundingBox.xMin, boundingBox.yMin, boundingBox.xMax - boundingBox.xMin, boundingBox.yMax - boundingBox.yMin);

          this.DrawBlackPixelsAsCoordinates(this.webcamCanvasElement.nativeElement, matchingIndexesInGrid);


          // console.log(matchingIdexes);
          parts.allPoses[0].keypoints.forEach(part => {
            this.drawDotAndLabel(this.webcamCanvasElement.nativeElement, part.position.x, part.position.y, part.part );
          });

          //get keypoints that have "shoulder" in name
          let shoulderKeypoints = parts.allPoses[0].keypoints.filter((keypoint: any) => keypoint.part.includes('Shoulder'));
          // console.log(shoulderKeypoints);


        }
        this.previousSegmentationComplete = true;
        // console.log(parts.allPoses[0]);
      });

      this.renderer.listen(webcamEl, 'loadeddata', () => this.predictWebcam());
    });
  }


  public reverseCamera() {
    let webcamEl = this.webcamElement.nativeElement;
    let facingMode = webcamEl.getAttribute('facingMode');
    // console.log(webcamEl);
    if (facingMode == 'environment') {
      facingMode = 'user';
    } else {
      facingMode = 'environment';
    }
    webcamEl.setAttribute('facingMode', facingMode);
    // wait 2 seconds for the camera to switch
    setTimeout(() => {
      this.enableCam();
    }, 2000);
  }

  private MeasureShoulders(leftShoulder: any, rightShoulder: any) {
    let leftShoulderX = leftShoulder.position.x;
    let leftShoulderY = leftShoulder.position.y;
    let rightShoulderX = rightShoulder.position.x;
    let rightShoulderY = rightShoulder.position.y;

    let shoulderDistance = Math.sqrt(Math.pow(leftShoulderX - rightShoulderX, 2) + Math.pow(leftShoulderY - rightShoulderY, 2));
    console.log(shoulderDistance);
  }

  private processFaceDetection(canvas: any, drawCanvas: any) {
      this.faces?.estimateFaces(canvas,  ).then((predictions: any) => {
        // draw the face bounding box
        // console.log('Preds', predictions);
        // let boundingBox = predictions[0].box;
        // console.log('Box', boundingBox);
        let ctx = drawCanvas.getContext('2d');
        // ctx.strokeStyle = 'green';
        // ctx.lineWidth = 2;
        //draw box with xMin, yMin, xMax, yMax
        // ctx.strokeRect(boundingBox.xMin, boundingBox.yMin, boundingBox.width, boundingBox.height);

        const keypoints = predictions[0].keypoints;
        //find all keypoints with name property equeal to "leftIris"
        let leftIris = keypoints.filter((keypoint: any) => keypoint.name === 'leftIris');
        // console.log('leftIris', leftIris);
        // draw small red dot on each leftIris keypoint
        leftIris.forEach((keypoint: any) => {
          this.drawRedDot(drawCanvas, keypoint.x, keypoint.y);
        });

        //connect top and bottom leftIris keypoints with a line
        ctx.beginPath();
        ctx.moveTo(leftIris[0].x, leftIris[0].y);
        ctx.lineTo(leftIris[2].x, leftIris[2].y);

        ctx.strokeStyle = 'green';
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(leftIris[1].x, leftIris[1].y);
        ctx.lineTo(leftIris[3].x, leftIris[3].y);

        ctx.strokeStyle = 'green';
        ctx.lineWidth = 2;
        ctx.stroke();

        // get the distance between the top and bottom leftIris keypoints
        let leftrightIrisDistance = this.getPixelMeasurementBetweenPoints(leftIris[0], leftIris[2]);
        let topBottomIrisDistance = this.getPixelMeasurementBetweenPoints(leftIris[1], leftIris[3]);

        // get the average of the two distances
        let averageIrisDistancePixels = (leftrightIrisDistance + topBottomIrisDistance) / 2;
        // console.log('averageIrisDistance', averageIrisDistancePixels);

        const dx = averageIrisDistancePixels;
        const dX = 11.7;


        // Logitech HD Pro C922	Norm focal
        const normalizedFocaleX = 1.40625;
        const fx = Math.min(drawCanvas.width, drawCanvas.height) * normalizedFocaleX;
        let dZ = (fx * (dX / dx)) / 10.0;
        this.pixelScaleFactor = dX / dx;

        // this.personDistanceToCamera = dZ;
        //convert to inches
        this.personDistanceToCamera = dZ / 2.54;

        // let stringdZ = dZ.toFixed(2);
        //console.log(dZ + " cm");


      });
  }

  // Draw black pixels as coordinates on the canvas.
  private DrawBlackPixelsAsCoordinates(canvas: any, coodrinates: number[][]) {
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = 'black';
    coodrinates.forEach(coordinate => {
      ctx.fillRect(coordinate[0], coordinate[1], 1, 1);
    });


  }


  predictWebcam() {
    if (this.previousSegmentationComplete && this.webcamCanvasElement) {
      this.previousSegmentationComplete = false;
      // Copy the video frame from webcam to a tempory canvas in memory only (not in the DOM).
      this.videoRenderCanvasCtx!.drawImage(this.webcamElement.nativeElement, 0, 0);
      this.processFaceDetection(this.videoRenderCanvas,this.webcamCanvasElement.nativeElement );

      // Now classify the canvas image we have available.
      // this.bodySegmentationService.segmentPersonParts(this.videoRenderCanvas);
      this.bodySegmentationService.segmentPersonWithRetry(this.videoRenderCanvas, 5);

    }
    // Call this function again to keep predicting when the browser is ready.
    window.requestAnimationFrame(this.predictWebcam.bind(this));
  }

  public handleInitError(error: WebcamInitError): void {
    if (error.mediaStreamError && error.mediaStreamError.name === "NotAllowedError") {
      console.warn("Camera access was not allowed by user!");
    }
  }

  private drawRedDot(canvas: any, x: any, y: any) {
    const ctx = canvas.getContext('2d');
    ctx.beginPath();
    ctx.arc(x, y, 1, 0, 2 * Math.PI);
    ctx.fillStyle = 'red';
    ctx.fill();
  }

  private drawDotAndLabel(canvas: any, x: any, y: any, label: any) {
    const ctx = canvas.getContext('2d');
    ctx.beginPath();
    ctx.arc(x, y, 5, 0, 2 * Math.PI);
    ctx.fillStyle = 'red';
    ctx.fill();
    ctx.font = "15px Arial";
    ctx.fillText(label, x + 10, y + 10);
  }

  private getPixelMeasurementBetweenPoints(point1: any, point2: any) {
    const xDiff = point1.x - point2.x;
    const yDiff = point1.y - point2.y;
    return Math.sqrt((xDiff * xDiff) + (yDiff * yDiff));
  }

  private transformInt32ArrayToGriddedArray(int32Array: any, width: any, height: any) {
    const grid = [];
    for (let i = 0; i < height; i++) {
      grid.push(int32Array.slice(i * width, (i + 1) * width));
    }
    return grid;
  }

  private getIndexesOfMatchingNumbers(numbers: Int32Array, query: number): number[] {
    const indexes: number[] = [];

    for (let i = 0; i < numbers.length; i++) {
        if (numbers[i] === query) {
            indexes.push(i);
        }
    }

    return indexes;
}

private getIndexesOfMatchingNumbersInGrid(grid: any, query: number[]): number[][] {
  // return the row and column for the matching numbers
  const indexes: number[][] = [];

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
        if (query.includes(grid[i][j])) {
            indexes.push([j, i]);
        }
    }
  }

  return indexes;
}

private GetBoundingBoxFromArrayCoordinates(coordinates: number[][]) {
  let xMin = Number.MAX_VALUE;
  let xMax = Number.MIN_VALUE;
  let yMin = Number.MAX_VALUE;
  let yMax = Number.MIN_VALUE;

  coordinates.forEach(coordinate => {
    if (coordinate[0] < xMin) {
      xMin = coordinate[0];
    }
    if (coordinate[0] > xMax) {
      xMax = coordinate[0];
    }
    if (coordinate[1] < yMin) {
      yMin = coordinate[1];
    }
    if (coordinate[1] > yMax) {
      yMax = coordinate[1];
    }
  });

  return { xMin, xMax, yMin, yMax };
}



  // draw lines on the canvas connecting the top and botton of each segment
  private drawSegmentLines(canvas: any, segmentation: any) {
    const ctx = canvas.getContext('2d');
    ctx.lineWidth = 2;
    ctx.strokeStyle = 'red';

    // draw top bottom segmentation lines
    for (let i = 0; i < segmentation.length; i++) {
      const segment = segmentation[i];
      ctx.beginPath();
      ctx.moveTo(segment.top[0], segment.top[1]);
      ctx.lineTo(segment.bottom[0], segment.bottom[1]);
      ctx.stroke();
    }

    // draw left right segmentation lines
    for (let i = 0; i < segmentation.length; i++) {
      const segment = segmentation[i];
      ctx.beginPath();
      ctx.moveTo(segment.left[0], segment.left[1]);
      ctx.lineTo(segment.right[0], segment.right[1]);
      ctx.stroke();
    }

  }
}

