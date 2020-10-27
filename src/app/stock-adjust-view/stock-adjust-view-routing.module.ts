import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StockAdjustViewPage } from './stock-adjust-view.page';

const routes: Routes = [
  {
    path: '',
    component: StockAdjustViewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StockAdjustViewPageRoutingModule {}
