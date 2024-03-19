import {Component, OnInit} from '@angular/core';
import {NotebookCrudService} from "../../services/notebook-crud.service";
import {Router} from "@angular/router";
import {Observable} from "rxjs";
import {Note} from "../../models/types";

@Component({
  selector: 'app-notebook-page',
  templateUrl: './notebook-page.component.html',
  styleUrls: ['./notebook-page.component.scss'],
})
export class NotebookPageComponent implements OnInit {
  notes!: Observable<Note[]>

  constructor(public notebookService: NotebookCrudService, private router: Router) {
  }

  ngOnInit() {
    this.notes = this.notebookService.readNotes();
  }

  async readNote(note: Note, index: number) {
    this.notebookService.noteData = note;
    await this.router.navigate(['/notebook/read', index]);
  }
}
