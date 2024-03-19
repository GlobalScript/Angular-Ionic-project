import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {NotebookPageComponent} from "./components/notebook-page/notebook-page.component";
import {CreateNotesComponent} from "./components/create-notes/create-notes.component";
import {NoteReaderComponent} from "./components/note-reader/note-reader.component";

const routes: Routes = [
  {path: '', component: NotebookPageComponent},
  {path: 'create', component: CreateNotesComponent},
  {path: 'read/:index', component: NoteReaderComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotebookRoutingModule { }
