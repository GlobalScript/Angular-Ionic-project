import {Component, Input, OnInit} from '@angular/core';
import {BalanceChartService} from "../../services/balance-chart.service";
import {BalanceCrudService} from "../../services/balance-crud.service";
import {ModalController} from "@ionic/angular";

@Component({
  selector: 'app-balance-editor',
  templateUrl: './balance-editor.component.html',
  styleUrls: ['./balance-editor.component.scss'],
})
export class BalanceEditorComponent implements OnInit {

  @Input() areasLevels!: number[];

  levelValues!: number[];

  constructor(
    public balanceChartService: BalanceChartService,
    private balanceCRUDService: BalanceCrudService,
    private modalController: ModalController
  ) {
  }

  ngOnInit() {
    if (this.areasLevels)
      this.levelValues = this.areasLevels.slice();
  }

  changeLevel(event: Event, index: number) {
    this.levelValues[index] = Number((event.target as HTMLInputElement).value);
  }

  async closeModal(event: Event) {
    const target = event.target as HTMLElement;
    if (target.className !== 'editor-wrapper') return;
    await this.modalController.dismiss(this.levelValues);
  }
}
