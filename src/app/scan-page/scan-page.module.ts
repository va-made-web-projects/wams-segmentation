import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ScanPagePageRoutingModule } from './scan-page-routing.module';

import { ScanPagePage } from './scan-page.page';
import { WebcamModule } from 'ngx-webcam';
import { BodySegmentationComponent } from './body-segmentation/body-segmentation.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ScanPagePageRoutingModule,
    WebcamModule
  ],
  declarations: [ScanPagePage, BodySegmentationComponent],
  exports: [BodySegmentationComponent]
})
export class ScanPagePageModule {}
