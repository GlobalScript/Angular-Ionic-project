import {Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {ChartConfiguration, ChartOptions} from "chart.js";
import {BaseChartDirective} from 'ng2-charts';
import {MonthNamePipe} from 'src/app/shared/pipes/month-name.pipe';
import {Month} from "../../models/types";
import {TranslateService} from "@ngx-translate/core";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-mood-chart',
  templateUrl: './mood-chart.component.html',
  styleUrls: ['./mood-chart.component.scss'],
})
export class MoodChartComponent implements OnInit, OnDestroy {

  @Output() level = new EventEmitter<number>();
  @ViewChild(BaseChartDirective) chart!: BaseChartDirective;

  translateSub!: Subscription;
  toolTipTitle!: unknown;
  toolTipLabel!: unknown;
  toolTipBeforeTitle!: unknown;

  constructor(public monthName: MonthNamePipe, private translateService: TranslateService) {
  }

  ngOnInit() {
    this.getTranslations();
  }

  showChart(showMonth: Month) {
    if (this.chart.data && this.chart.chart) {
      this.chart.chart.data.datasets[0].data = showMonth.levels;
      this.chart.data.labels = showMonth.days;
      this.chart.chart.update("show");
    }
  }

  moodLevel(event: any) {
    if (!event.active.length) return;
    const index: number = event.active[0].index + 1;
    this.level.emit(index)
  }

  getTranslations() {
    this.translateSub = this.translateService
      .get(['mood.chart.title', 'mood.chart.label', 'mood.chart.beforeTitle'])
      .subscribe(translations => {
        const translateValues = Object.values(translations);
        this.toolTipTitle = translateValues[0];
        this.toolTipLabel = translateValues[1];
        this.toolTipBeforeTitle = translateValues[2];
      });
  }

  ngOnDestroy() {
    this.translateSub.unsubscribe();
  }

  lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: [],
    datasets: [
      {
        data: [],
        label: '',
        tension: 0.3,
        borderColor: 'black',
        backgroundColor: 'rgba(255,0,0,0.3)',
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)',
        pointRadius: 8,
        borderWidth: 1,
        borderDash: [5, 3],
      }
    ]
  };

  lineChartOptions: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        display: false,
        position: 'top',
        align: 'center',
        labels: {
          boxWidth: 0,
          textAlign: 'right',
          font: {
            size: 20
          }
        }
      },
      tooltip: {
        enabled: true,
        displayColors: false,
        callbacks: {
          label: (context) => {
            const datasetLabel = context.formattedValue;
            return `${this.toolTipLabel} ${datasetLabel}`;
          },
          title: (context) => {
            const datasetTitle = context[0].label;
            return `${this.toolTipTitle} ${datasetTitle}`;
          },
          beforeTitle: (context) => {
            return `${this.toolTipBeforeTitle}`
          }
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        min: -6,
        max: 6,
        ticks: {
          stepSize: 1,
        },
        grid: {
          color: ['#e3e3e3', '#e3e3e3', '#e3e3e3', '#e3e3e3', '#e3e3e3', '#e3e3e3', 'skyblue', '#e3e3e3']
        },
      }
    }
  };

}
