import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { StockAdjustViewPageRoutingModule } from "./stock-adjust-view-routing.module";

import { StockAdjustViewPage } from "./stock-adjust-view.page";

@NgModule({
  imports: [
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    IonicModule,
    StockAdjustViewPageRoutingModule,
  ],
  declarations: [StockAdjustViewPage],
})
export class StockAdjustViewPageModule {}
