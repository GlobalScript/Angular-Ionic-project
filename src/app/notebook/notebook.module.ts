import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {NotebookRoutingModule} from './notebook-routing.module';
import {NotebookPageComponent} from "./components/notebook-page/notebook-page.component";
import {SharedModule} from "../shared/shared.module";
import {IonicModule} from "@ionic/angular";
import {CreateNotesComponent} from "./components/create-notes/create-notes.component";
import {FormsModule} from '@angular/forms';
import {SaveMessageComponent} from "./components/save-message/save-message.component";
import {NoteReaderComponent} from "./components/note-reader/note-reader.component";
import {DeleteMessageComponent} from "./components/delete-message/delete-message.component";
import {MainModule} from "../main/main.module";
import {TranslateModule} from "@ngx-translate/core";


@NgModule({
  declarations: [
    NotebookPageComponent,
    CreateNotesComponent,
    SaveMessageComponent,
    DeleteMessageComponent,
    NoteReaderComponent
  ],
  imports: [
    CommonModule,
    NotebookRoutingModule,
    SharedModule,
    IonicModule,
    FormsModule,
    MainModule,
    TranslateModule
  ]
})
export class NotebookModule {
}
