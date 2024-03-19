import {Component, Input} from '@angular/core';
import {NotebookCrudService} from "../../services/notebook-crud.service";
import {ModalController} from "@ionic/angular";
import {Router} from "@angular/router";

@Component({
  selector: 'app-delete-message',
  templateUrl: './delete-message.component.html',
  styleUrls: ['./delete-message.component.scss'],
})
export class DeleteMessageComponent {

  @Input() index!: number;

  constructor(
    private noteBookService: NotebookCrudService,
    private modalController: ModalController,
    private router: Router
  ) {
  }

  removeNote() {
    this.noteBookService.deleteNote(this.index)
      .then(() => this.closeDeleteMessage()
        .then(() => this.router.navigate(['/notebook'])));
  }

  async closeDeleteMessage() {
    const topModal = await this.modalController.getTop();
    if (topModal) await this.modalController.dismiss();
  }

}
