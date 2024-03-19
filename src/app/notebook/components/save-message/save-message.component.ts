import {Component, OnInit} from '@angular/core';
import {ModalController} from "@ionic/angular";

@Component({
  selector: 'app-save-message',
  templateUrl: './save-message.component.html',
  styleUrls: ['./save-message.component.scss'],
})
export class SaveMessageComponent implements OnInit {

  constructor(private modalController: ModalController) {
  }

  ngOnInit() {
    setTimeout(() => {
      this.closeModal();
    }, 1500)
  }

  async closeModal() {
    const topModal = await this.modalController.getTop();
    if (topModal) await this.modalController.dismiss();
  }
}
