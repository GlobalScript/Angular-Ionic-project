import {Injectable} from '@angular/core';
import {DataMonth} from '../models/types';
import {first, map, Observable} from 'rxjs';
import {AuthService} from 'src/app/auth/services/auth.service';
import {MoodChartService} from "./mood-chart.service";

@Injectable({
  providedIn: 'root'
})
export class MoodCrudService {

  constructor(
    private dateService: MoodChartService,
    private authService: AuthService
  ) {
  }

  async createMonth(month: DataMonth) {
    this.authService.getUserRef().valueChanges().pipe(first()).subscribe((data) => {
      if (data?.months) {
        let monthList = data.months;
        monthList.push({
          timestamp: this.dateService.currentTimeStamp(),
          levels: month.levels
        })
        this.authService.getUserRef().update({months: monthList})
      } else {
        this.authService.getUserRef().update({
          months: [{
            timestamp: this.dateService.currentTimeStamp(),
            levels: month.levels
          }],
        })
      }
    })
  }

  readMonths(): Observable<DataMonth[]> {
    return this.authService.getUserRef()
      .valueChanges().pipe(map(data => data?.months ? data.months : []));
  }

  async updateMonth(month: DataMonth) {
    this.authService.getUserRef()
      .valueChanges()
      .pipe(first(), map(data => data?.months ? data.months : []))
      .subscribe((data: DataMonth[]) => {
        if (!data.length) return;
        data.forEach((element, index) => {
          if (element.timestamp === month.timestamp) {
            data[index].levels = month.levels;
            this.authService.getUserRef().update({months: data})
          }
        });
      })
  }

}
