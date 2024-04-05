import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {BalanceRoutingModule} from './balance-routing.module';
import {IonicModule} from "@ionic/angular";
import {BalancePageComponent} from "./components/balance-page/balance-page.component";
import {BalanceEditorComponent} from "./components/balance-editor/balance-editor.component";
import {BalanceChartComponent} from "./components/balance-chart/balance-chart.component";
import {AreaEditorComponent} from "./components/area-editor/area-editor.component";
import {NgChartsModule} from "ng2-charts";
import {SharedModule} from "../shared/shared.module";
import {MainModule} from "../main/main.module";
import {TranslateModule} from "@ngx-translate/core";


@NgModule({
  declarations: [
    BalancePageComponent,
    BalanceEditorComponent,
    BalanceChartComponent,
    AreaEditorComponent
  ],
  imports: [
    CommonModule,
    BalanceRoutingModule,
    IonicModule,
    NgChartsModule,
    SharedModule,
    MainModule,
    TranslateModule
  ]
})
export class BalanceModule {
}
