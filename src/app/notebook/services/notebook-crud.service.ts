import {Injectable} from '@angular/core';
import {AuthService} from "../../auth/services/auth.service";
import {Note} from "../models/types";
import {first, map, Observable} from "rxjs";
import {ModalController} from "@ionic/angular";
import {SaveMessageComponent} from "../components/save-message/save-message.component";
import {DeleteMessageComponent} from "../components/delete-message/delete-message.component";

@Injectable({
  providedIn: 'root'
})
export class NotebookCrudService {

  noteData!: Note;

  constructor(private authService: AuthService, private modalController: ModalController) {
  }

  private async openSaveMessage() {
    const modal = await this.modalController.create({
      component: SaveMessageComponent,
      cssClass: 'notebook-save-message-style'
    });
    return await modal.present();
  }

  async openDeleteMessage(index: number) {
    if (!this.noteData) return;
    const modal = await this.modalController.create({
      component: DeleteMessageComponent,
      componentProps: {index},
      cssClass: 'notebook-delete-message-style'
    });
    return await modal.present();
  }

  emptyNote(titleValue: string, textValue: string): boolean {
    const regex = /^\s*$/;
    return ((!titleValue || regex.test(titleValue)) &&
      (!textValue || regex.test(textValue)));
  }

  createNote(title: string, text: string) {
    if (this.emptyNote(title, text)) return;
    this.authService.getUserRef().valueChanges().pipe(first()).subscribe((data) => {
      if (data?.notebook) {
        let noteList: Note[] = data.notebook;
        noteList.unshift({
          timestamp: Date.now(),
          title: title || '',
          text: text || ''
        })
        this.authService.getUserRef().update({notebook: noteList}).then(() => this.openSaveMessage())
      } else {
        this.authService.getUserRef().update({
          notebook: [{
            timestamp: Date.now(),
            title: title || '',
            text: text || ''
          }],
        }).then(() => this.openSaveMessage())
      }
    })
  }

  readNotes(): Observable<Note[]> {
    return this.authService.getUserRef()
      .valueChanges().pipe(map(data => data?.notebook ? data.notebook : []));
  }

  async deleteNote(index: number) {
    this.authService.getUserRef().valueChanges().pipe(first()).subscribe((data) => {
      if (!data?.notebook) return;
      let noteList: Note[] = data.notebook;
      noteList.splice(index, 1);
      this.authService.getUserRef().update({notebook: noteList});
    })
  }

  async editNote(note: Note, index: number) {
    if (this.emptyNote(note.title, note.text)) {
      await this.deleteNote(index);
      return;
    }
    if (note.title === this.noteData.title && note.text === this.noteData.text) return;
    this.authService.getUserRef().valueChanges().pipe(first()).subscribe((data) => {
      if (!data?.notebook) return;
      data.notebook[index] = note;
      this.authService.getUserRef().update({notebook: data.notebook}).then(() => this.openSaveMessage());
    })
  }

}
