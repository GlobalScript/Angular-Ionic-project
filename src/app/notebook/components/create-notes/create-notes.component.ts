import {Component, OnDestroy, OnInit} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {Subscription} from "rxjs";
import {NotebookCrudService} from "../../services/notebook-crud.service";

@Component({
  selector: 'app-create-notes',
  templateUrl: './create-notes.component.html',
  styleUrls: ['./create-notes.component.scss'],
})
export class CreateNotesComponent implements OnInit, OnDestroy {
  routerSub!: Subscription;
  inputValue!: string;
  textAreaValue!: string;

  constructor(
    private router: Router,
    private noteBookService: NotebookCrudService,
  ) {
  }

  ngOnInit() {
    this.routerSub = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.noteBookService.createNote(this.inputValue, this.textAreaValue);
        this.textAreaValue = '';
        this.inputValue = '';
      }
    });
  }

  ngOnDestroy() {
    this.routerSub.unsubscribe();
  }

}
