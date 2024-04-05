import {Component, OnDestroy, OnInit} from '@angular/core';
import {NumerologyService} from "../../services/numerology.service";
import {ActivatedRoute} from "@angular/router";
import {RowAndCol, Square} from "../../models/types";
import {ModalController} from '@ionic/angular';
import {ModalDescriptionComponent} from "../modal-description/modal-description.component";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-square',
  templateUrl: './square.component.html',
  styleUrls: ['./square.component.scss'],
})
export class SquareComponent implements OnInit, OnDestroy {

  squareSub!: Subscription;
  colAndRowSub!: Subscription;
  numbersOfTheSquare!: Square[];
  numbersOfRowAndCol!: RowAndCol[];
  birthday!: string;

  constructor(
    public numerologyService: NumerologyService,
    private activatedRoute: ActivatedRoute,
    private modalController: ModalController
  ) {
  }

  ngOnInit() {
    this.birthday = this.activatedRoute.snapshot.params['date']
    this.squareSub = this.numerologyService.getNumbersOfTheSquare(this.birthday)
      .subscribe(square => this.numbersOfTheSquare = square);
    this.colAndRowSub = this.numerologyService.getNumbersOfColAndRow(this.numbersOfTheSquare)
      .subscribe(rowAndCol => this.numbersOfRowAndCol = rowAndCol);
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
    this.squareSub.unsubscribe();
    this.colAndRowSub.unsubscribe();
  }
}
