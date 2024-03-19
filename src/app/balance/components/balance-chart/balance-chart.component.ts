import { Component, ViewChild, OnDestroy } from '@angular/core';
import { BaseChartDirective } from "ng2-charts";
import { ChartData, ChartOptions } from 'chart.js';
import { BalanceChartService } from "../../services/balance-chart.service";
import { Subscription } from "rxjs";
import { AreaEditorComponent } from "../area-editor/area-editor.component";
import { ModalController } from '@ionic/angular';
import { BalanceCrudService } from "../../services/balance-crud.service";

@Component({
  selector: 'app-balance-chart',
  templateUrl: './balance-chart.component.html',
  styleUrls: ['./balance-chart.component.scss'],
})


export class BalanceChartComponent implements OnDestroy {

  balanceSub!: Subscription;
  levelsAreas: number[] = [];

  @ViewChild(BaseChartDirective) chart!: BaseChartDirective;

  constructor(
    public balanceChartServices: BalanceChartService,
    private balanceCRUDService: BalanceCrudService,
    public modalController: ModalController
  ) {
  }

  showChart(areas: number[]) {
    this.levelsAreas = areas;
    if (this.chart.data && this.chart.chart) {
      this.chart.chart.data.datasets[0].data = areas;
      this.chart.chart.update("show");
    }
  }

  async openAreaEditor(event: any) {
    let areaIndex!: number;
    if (event.active) {
      if (!event.active.length) return;
      areaIndex = event.active[0].index;
    }
    if (typeof event === 'number') areaIndex = event;
    const modal = await this.modalController.create({
      component: AreaEditorComponent,
      componentProps: {
        areaTitle: this.balanceChartServices.polarAreaChartLabels[areaIndex],
        areasLevels: this.levelsAreas,
        areaIndex
      },
      cssClass: 'balance-area-modal'
    });
    modal.onDidDismiss().then((modalData) => {
      if (modalData.data) {
        this.balanceCRUDService.createBalance(modalData.data);
      }
    });
    return await modal.present();
  }

 async closeAreaEditor() {
   const topModal = await this.modalController.getTop();
   if (topModal) await this.modalController.dismiss();
  }

  ngOnDestroy() {
   this.closeAreaEditor();
  }

  polarAreaChartData: ChartData<'polarArea'> = {
    labels: this.balanceChartServices.polarAreaChartLabels,
    datasets: [
      {
        data: [],
        backgroundColor: this.balanceChartServices.colors,
        label: '',
        borderWidth: 0
      },
    ],
  };

  polarAreaOptions: ChartOptions<'polarArea'> = {
    responsive: true,
    plugins: {
      title: {
        display: false,
        align: "center",
        text: "Example"
      },
      legend: {
        display: false,
        align: "center",
        position: "right",
        labels: {
          padding: 20,
          usePointStyle: true,
          font: {
            size: 16
          }
        }
      },
    },
    layout: {
      padding: {
        left: 30,
        right: 30,
        top: 0,
        bottom: 0,
      },
    },
    scales: {
      r: {
        grid: {
          color: '#f7f8f9'
        },
        suggestedMin: 0,
        suggestedMax: 10,
        ticks: {
          stepSize: 10,
          color: "#f7f8f9",
          backdropColor: '#3C3F41FF'
        }
      }
    }
  };

}
