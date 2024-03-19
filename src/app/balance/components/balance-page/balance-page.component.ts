import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {BalanceChartComponent} from "../balance-chart/balance-chart.component";
import {BalanceCrudService} from "../../services/balance-crud.service";
import {Subscription} from "rxjs";
import {BalanceEditorComponent} from "../balance-editor/balance-editor.component";
import {ModalController} from "@ionic/angular";

@Component({
  selector: 'app-balance-page',
  templateUrl: './balance-page.component.html',
  styleUrls: ['./balance-page.component.scss'],
})
export class BalancePageComponent implements OnInit, OnDestroy {

  balanceSub!: Subscription;
  areasLevels!: number[];

  @ViewChild(BalanceChartComponent) balanceChart!: BalanceChartComponent;
  @ViewChild(BalanceEditorComponent) balanceEditor!: BalanceEditorComponent;


  constructor(
    private balanceCRUDService: BalanceCrudService,
    public modalController: ModalController
  ) {
  }

  ngOnInit() {
    this.balanceSub = this.balanceCRUDService.readBalance().subscribe(data => {
      this.balanceChart.showChart(data);
      this.areasLevels = data;
    })
  }

  async openBalanceEditor() {
    const modal = await this.modalController.create({
      component: BalanceEditorComponent,
      componentProps: {
        areasLevels: this.areasLevels,
      },
      cssClass: 'balance-editor-modal'
    });
    modal.onDidDismiss().then((modalData) => {
      if (modalData.data) {
        this.balanceCRUDService.createBalance(modalData.data);
      }
    });
    return await modal.present();
  }

  async closeBalanceEditor() {
    const topModal = await this.modalController.getTop();
    if (topModal) await this.modalController.dismiss();
  }

  ngOnDestroy() {
    this.balanceSub.unsubscribe();
    this.closeBalanceEditor();
  }
}
