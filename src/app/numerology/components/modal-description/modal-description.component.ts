import {Component, Input, OnInit} from '@angular/core';
import {ModalController} from "@ionic/angular";

@Component({
  selector: 'app-modal-description',
  templateUrl: './modal-description.component.html',
  styleUrls: ['./modal-description.component.scss'],
})
export class ModalDescriptionComponent  implements OnInit {

  @Input() title!: string;
  @Input() text!: string;

  constructor(private modalController: ModalController) { }

  ngOnInit() {}

  async close() {
    await this.modalController.dismiss();
  }

}
