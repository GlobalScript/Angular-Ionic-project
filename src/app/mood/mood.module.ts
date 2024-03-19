import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MoodRoutingModule } from './mood-routing.module';
import {MoodPageComponent} from "./components/mood-page/mood-page.component";
import {MoodLevelsComponent} from "./components/mood-levels/mood-levels.component";
import {MoodChartComponent} from "./components/mood-chart/mood-chart.component";
import {EmojiSectionComponent} from "./components/emoji-section/emoji-section.component";
import {EmojiEditorComponent} from "./components/emoji-editor/emoji-editor.component";
import {SharedModule} from "../shared/shared.module";
import {IonicModule} from "@ionic/angular";
import {NgChartsModule} from "ng2-charts";
import {FormsModule} from "@angular/forms";
import {MonthNamePipe} from "../shared/pipes/month-name.pipe";
import {EditorPageComponent} from "./components/editor-page/editor-page.component";
import {HeaderComponent} from "../main/components/header/header.component";
import {MainModule} from "../main/main.module";


@NgModule({
  declarations: [
    MoodPageComponent,
    MoodLevelsComponent,
    MoodChartComponent,
    EmojiSectionComponent,
    EmojiEditorComponent,
    EditorPageComponent
  ],
  imports: [
    CommonModule,
    MoodRoutingModule,
    SharedModule,
    IonicModule,
    NgChartsModule,
    FormsModule,
    MainModule
  ],
  providers: [MonthNamePipe],
})
export class MoodModule { }
