import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import {StartPageComponent} from "./components/start-page/start-page.component";
import {NotFoundComponent} from "./components/not-found/not-found.component";
import {MainRoutingModule} from "./main-routing.module";
import {SharedModule} from "../shared/shared.module";
import {HeaderComponent} from "./components/header/header.component";



@NgModule({
  declarations: [
    StartPageComponent,
    NotFoundComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    MainRoutingModule,
    SharedModule
  ],
  exports: [HeaderComponent]
})
export class MainModule { }
