import { Component, OnInit, OnDestroy } from '@angular/core';
import {NumerologyService} from "../../services/numerology.service";
import {ActivatedRoute} from "@angular/router";
import {Square} from "../../models/types";
import {RowAndCol} from "../../models/types";
import {ModalController} from '@ionic/angular';
import {Emoji} from "../../../mood/models/types";
import {EmojiEditorComponent} from "../../../mood/components/emoji-editor/emoji-editor.component";
import {ModalDescriptionComponent} from "../modal-description/modal-description.component";

@Component({
  selector: 'app-square',
  templateUrl: './square.component.html',
  styleUrls: ['./square.component.scss'],
})
export class SquareComponent  implements OnInit, OnDestroy {

  numbers!: Square[];
  numbersRowAndCol!: RowAndCol[];
  birthday!: string;

  constructor(
    public numerologyService: NumerologyService,
    private activatedRoute: ActivatedRoute,
    private modalController: ModalController
    ) { }

  ngOnInit() {
    this.birthday = this.activatedRoute.snapshot.params['date']
    this.numbers = this.numerologyService.selectedDate(this.birthday);
    this.numbersRowAndCol = this.numerologyService.colAndRowNumbers(this.numbers);
  }

  async openModalDescription(title: string, text: string) {
    const modal = await this.modalController.create({
      component: ModalDescriptionComponent,
      componentProps: {title, text},
      cssClass: 'numerology-description-style'
    });
    return await modal.present();
  }

  async closeModalDescription() {
    const topModal = await this.modalController.getTop();
    if (topModal) await this.modalController.dismiss();
  }


  ngOnDestroy() {
    this.closeModalDescription();
  }
}
