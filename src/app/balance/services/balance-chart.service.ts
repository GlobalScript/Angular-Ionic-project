import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BalanceChartService {

  constructor() {
  }

  colors = [
    "#FFB6C1",
    "#E6E6FA",
    "#FFDAB9",
    "#98FB98",
    "#ADD8E6",
    "#FFFACD",
    "#FF6B6B",
    "#d090ee",
  ];

  polarAreaChartLabels = [
    "balance.health",
    "balance.work",
    "balance.environment",
    "balance.relationShip",
    "balance.relaxation",
    "balance.selfImprovement",
    "balance.fulfillment",
    "balance.spirituality"
  ];

}
