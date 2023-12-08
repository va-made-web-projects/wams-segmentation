import { Injectable } from '@angular/core';
import * as facedet from '@tensorflow-models/face-landmarks-detection';


@Injectable({
  providedIn: 'root'
})
export class FaceDetectionService {

  constructor() { }

  async loadModel() {
    const faceMesh = facedet.createDetector(facedet.SupportedModels.MediaPipeFaceMesh, {
      runtime: 'tfjs',
      refineLandmarks: true,
      maxFaces: 1,
    });
    const model = await faceMesh;

    return model;
  }
}
