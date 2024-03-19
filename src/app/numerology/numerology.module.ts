import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NumerologyRoutingModule } from './numerology-routing.module';
import {NumerologyPageComponent} from "./components/numerology-page/numerology-page.component";
import {IonicModule} from "@ionic/angular";
import {SharedModule} from "../shared/shared.module";
import {FormsModule} from "@angular/forms";
import {SquareComponent} from "./components/square/square.component";
import {DescriptionComponent} from "./components/description/description.component";
import {ModalDescriptionComponent} from "./components/modal-description/modal-description.component";
import {MainModule} from "../main/main.module";


@NgModule({
  declarations: [
    NumerologyPageComponent,
    SquareComponent,
    DescriptionComponent,
    ModalDescriptionComponent
  ],
  imports: [
    CommonModule,
    NumerologyRoutingModule,
    IonicModule,
    SharedModule,
    FormsModule,
    MainModule
  ]
})
export class NumerologyModule { }
