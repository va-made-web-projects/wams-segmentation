import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ScanPagePage } from './scan-page.page';

const routes: Routes = [
  {
    path: '',
    component: ScanPagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ScanPagePageRoutingModule {}
