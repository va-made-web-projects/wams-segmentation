import { Component, ElementRef, Renderer2, ViewChild, ViewChildren } from '@angular/core';
import { FaceLandmarksDetector } from '@tensorflow-models/face-landmarks-detection';
import { FaceDetectionService } from '../services/face-detection.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page {
  subscription!: Subscription;

  @ViewChildren('imageCanvas', { read: ElementRef }) imageCanvas!: ElementRef;

  @ViewChild('webcam', { read: ElementRef }) webcamElement!: ElementRef;
  @ViewChild('webcamCanvas', { read: ElementRef })
  webcamCanvasElement!: ElementRef;
  previousSegmentationComplete = true;

  videoRenderCanvas!: HTMLCanvasElement;
  videoRenderCanvasCtx!: CanvasRenderingContext2D | null;

  pdmm: number = 0;
  pixelPdDistance: number = 0;
  pixelShoulderWidth: number = 0;
  faces: FaceLandmarksDetector | undefined;

  constructor(
    private renderer: Renderer2,
    public faceDetectionService: FaceDetectionService
  ) {
    this.faceDetectionService
      .loadModel()
      .then((faces: FaceLandmarksDetector) => {
        console.log('Faces', faces);
        this.faces = faces;
      });
  }

  // Check if webcam access is supported.
  hasGetUserMedia() {
    return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
  }

  ngOnInit(): void {
    //wait for the webcam to load
    this.enableCam();
  }

  // Enable the live webcam view and start classification.
  enableCam() {
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
      this.renderer.listen(webcamEl, 'loadeddata', () => this.predictWebcam());
    });
  }

  private processFaceDetection(canvas: any) {
    console.log('Faces', this.faces);
    this.faces?.estimateFaces(canvas).then((predictions: any) => {
      console.log('Preds', predictions);
      predictions.forEach((prediction: any) => {
        prediction.landmarks.forEach((landmark: any) => {
          console.log('Landmark', landmark);
        });
      });
    });
}


  predictWebcam() {
    // Call this function again to keep predicting when the browser is ready.
    this.videoRenderCanvasCtx!.drawImage(this.webcamElement.nativeElement, 0, 0);
    // this.processFaceDetection(this.videoRenderCanvas);
    window.requestAnimationFrame(this.predictWebcam.bind(this));
  }

}
