import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MonthNamePipe} from './pipes/month-name.pipe';
import {IonicModule} from "@ionic/angular";
import {SharedRoutingModule} from "./shared-routing.module";


@NgModule({
  declarations: [
    MonthNamePipe
  ],
  imports: [
    CommonModule,
    IonicModule,
    SharedRoutingModule
  ],
  exports: [
    MonthNamePipe
  ]
})
export class SharedModule {
}
