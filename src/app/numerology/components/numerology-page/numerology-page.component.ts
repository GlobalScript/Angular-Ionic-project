import {Component, OnDestroy, ViewChild} from '@angular/core';
import {IonDatetime} from "@ionic/angular";
import {Router} from "@angular/router";

@Component({
  selector: 'app-numerology-page',
  templateUrl: './numerology-page.component.html',
  styleUrls: ['./numerology-page.component.scss'],
})
export class NumerologyPageComponent implements OnDestroy {

  constructor(private router: Router) {
  }

  @ViewChild('datetimepicker') datetimepicker!: IonDatetime;
  dateTime!: string | undefined;

  async dateReset() {
    this.dateTime = undefined;
    await this.datetimepicker.reset()
  }

  async calculate() {
    if (!this.dateTime) return;
    await this.router.navigate(['numerology/square', this.dateTime.split('T')[0]]);
  }

  ngOnDestroy() {
    this.dateReset();
  }

}
