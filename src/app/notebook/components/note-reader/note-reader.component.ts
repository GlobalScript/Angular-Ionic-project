import {Component, OnDestroy, OnInit} from '@angular/core';
import {NotebookCrudService} from "../../services/notebook-crud.service";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-note-reader',
  templateUrl: './note-reader.component.html',
  styleUrls: ['./note-reader.component.scss'],
})
export class NoteReaderComponent implements OnInit, OnDestroy {
  textAreaValue!: string;
  inputValue!: string;
  noteIndex!: number;
  routerSub!: Subscription;

  constructor(
    public noteBookService: NotebookCrudService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit() {
    if (!this.noteBookService.noteData) {
      this.router.navigate(['/notebook']);
    }
    this.inputValue = this.noteBookService.noteData.title;
    this.textAreaValue = this.noteBookService.noteData.text;
    this.noteIndex = Number(this.activatedRoute.snapshot.params['index']);
    this.routerSub = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.noteBookService.editNote(
          {
            title: this.inputValue,
            text: this.textAreaValue,
            timestamp: this.noteBookService.noteData.timestamp
          }, this.noteIndex);
      }
    });
  }

  async removeNote() {
    await this.noteBookService.openDeleteMessage(this.noteIndex);
  }

  ngOnDestroy() {
    if (this.routerSub) this.routerSub.unsubscribe();
  }
}
