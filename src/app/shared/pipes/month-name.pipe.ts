import {Pipe, PipeTransform} from '@angular/core';
import {AuthService} from "../../auth/services/auth.service";
import {Language} from "../../localization/models/enums";
import {TranslateService} from "@ngx-translate/core";


@Pipe({
  name: 'monthName'
})
export class MonthNamePipe implements PipeTransform {

  private getUpperMonth!: string[];
  private getLowerMonth!: string[];

  constructor(
    private auth: AuthService,
    private translateService: TranslateService
  ) {
    this.getTranslations();
  }

  private getTranslations() {
    this.translateService
      .get(['monthPipe.upperMonths', 'monthPipe.lowerMonths'])
      .subscribe(translations => {
        const translateValues = Object.values(translations);
        this.getUpperMonth = translateValues[0] as string[];
        this.getLowerMonth = translateValues[1] as string[];
      });
  }

  transform(
    timestamp: number | undefined | null,
    day: number | 'full' | null = null,
  ): string {

    if (!timestamp) return 'There is no date';

    const dateObject = new Date(timestamp);
    const month = dateObject.getMonth() + 1;
    const year = dateObject.getFullYear();
    const dayOfTheMonth = dateObject.getDate();

    const englishShortDate = `${this.getUpperMonth[month]} ${day}`;
    const englishFullDate = `${this.getUpperMonth[month]} ${dayOfTheMonth}, ${year}`;
    const ukrainianShortDate = `${day} ${this.getLowerMonth[month]}`;
    const ukraineFullDate = `${dayOfTheMonth} ${this.getLowerMonth[month]} ${year}`;

    if (!day) return `${this.getUpperMonth[month]} ${year}`;
    if (day === 'full') return this.auth.userLanguage === Language.EN ? englishFullDate : ukraineFullDate;
    return this.auth.userLanguage === Language.EN ? englishShortDate : ukrainianShortDate;
  }
}
