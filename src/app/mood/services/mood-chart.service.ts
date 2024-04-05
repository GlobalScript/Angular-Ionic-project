import {Injectable} from '@angular/core';
import {DataMonth, Month} from '../models/types';

@Injectable({
  providedIn: 'root'
})
export class MoodChartService {

  constructor() {
  }

  private activeItem: boolean = false;

  private dateOptions(timeStamp: number | null = null): { daysInMonth: number, month: number, year: number } {
    const date = timeStamp ? new Date(timeStamp) : new Date();
    date.setMonth(date.getMonth() + 1);
    date.setDate(0);
    return {
      daysInMonth: date.getDate(),
      month: date.getMonth() + 1,
      year: date.getFullYear(),
    }
  }

  private moodLevels(levels: number[], numberOfDays: number): number[] {
    let nextNumber: number = 0;
    return Array.from({length: numberOfDays}, (_, index) => index + 1).map((_, index) => {
      const itemLevel: number | undefined = levels[index];
      if (itemLevel || itemLevel === 0) {
        nextNumber = itemLevel
        return itemLevel;
      }
      return nextNumber;
    })
  }

  active(): boolean {
    return this.activeItem
  }

  currentTimeStamp(): number {
    const currentDate = new Date();
    currentDate.setDate(1);
    currentDate.setHours(0, 0, 0, 0);
    return currentDate.getTime();
  }

  dataCurrentMonth(getMonths: DataMonth[] = []): Month {
    this.activeItem = false;
    const date = this.dateOptions();
    let levelLength: number = 0;
    let currentDay: number = new Date().getDate();
    const monthData: DataMonth | undefined = getMonths
      .find(obj => obj.timestamp === this.currentTimeStamp());
    if (monthData) levelLength = Object.keys(monthData.levels).length;
    if (levelLength !== currentDay) {
      currentDay = currentDay - 1;
      this.activeItem = true;
    }
    return {
      days: Array.from({length: date.daysInMonth}, (_, index) => index + 1),
      month: date.month,
      year: date.year,
      levels: this.moodLevels(monthData?.levels || [], currentDay),
      timestamp: monthData?.timestamp || null
    }
  }

  dataOtherMonth(month: DataMonth): Month {
    this.activeItem = false;
    const date = this.dateOptions(month.timestamp);
    return {
      days: Array.from({length: date.daysInMonth}, (_, index) => index + 1),
      month: date.month,
      year: date.year,
      levels: this.moodLevels(month.levels, date.daysInMonth),
      timestamp: month.timestamp
    }
  }
}
