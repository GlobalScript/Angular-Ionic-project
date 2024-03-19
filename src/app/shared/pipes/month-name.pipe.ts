import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'monthName'
})
export class MonthNamePipe implements PipeTransform {

  transform(
    timestamp: number | undefined | null,
    day: number | 'full' | null = null,
  ): string {

    if(!timestamp) return 'There is no date';

    const dateObject = new Date(timestamp);
    const month = dateObject.getMonth() + 1;
    const year = dateObject.getFullYear();
    const numOfTheMonth = dateObject.getDate();

    const monthUpperCase: string[] = [
      'Україна',
      'Січень',
      'Лютий',
      'Березень',
      'Квітень',
      'Травень',
      'Червень',
      'Липень',
      'Серпень',
      'Вересень',
      'Жовтень',
      'Листопад',
      'Грудень'
    ];

    const monthLowerCase: string[] = [
      'Україна',
      'січня',
      'лютого',
      'березня',
      'квітня',
      'травня',
      'червня',
      'липня',
      'серпня',
      'вересня',
      'жовтня',
      'листопада',
      'грудня'
    ];

    if(!day) return `${monthUpperCase[month]} ${year}`;
    if(day === 'full') return `${numOfTheMonth} ${monthLowerCase[month]} ${year}`;
    return `${day} ${monthLowerCase[month]}`;
  }
}
