import {Injectable} from '@angular/core';
import {CharacterTraits, RowAndCol, Square} from "../models/types";
import {NumerologyDescriptionService} from "./numerology-description.service";

@Injectable({
  providedIn: 'root'
})
export class NumerologyService {

  constructor(private numDescription: NumerologyDescriptionService) {
  }

  private summarize(sort: Square[], oneNum: number, twoNum: number, threeNum: number): number {
    return (sort[oneNum].result + sort[twoNum].result + sort[threeNum].result).length
  }

  private showDescription(outNum: string | number, data: CharacterTraits) {
    let num;
    if (typeof outNum === "string") num = outNum.length;
    else num = outNum;

    switch (num) {
      case 0:
        return data.no;
      case 1:
        return data.one;
      case 2:
        return data.two;
      case 3:
        return data.three;
      case 4:
        return data.four;
      case 5:
        return data.five;
      default:
        return data.six;
    }
  }

  private sortNumbers(allNumbers: string): Square[] {
    const sort = [
      {title: "характер", figure: 1, result: '', description: ''},
      {title: "здоров'я", figure: 4, result: '', description: ''},
      {title: "везіння", figure: 7, result: '', description: ''},
      {title: "енергетика", figure: 2, result: '', description: ''},
      {title: "логіка", figure: 5, result: '', description: ''},
      {title: "обов'язок", figure: 8, result: '', description: ''},
      {title: "навчання", figure: 3, result: '', description: ''},
      {title: "працьовитість", figure: 6, result: '', description: ''},
      {title: "пам'ять", figure: 9, result: '', description: ''}
    ];
    allNumbers.split('').map(item => {
      switch (item) {
        case '1':
          sort[0].result += item;
          break;
        case '4':
          sort[1].result += item;
          break;
        case '7':
          sort[2].result += item;
          break;
        case '2':
          sort[3].result += item;
          break;
        case '5':
          sort[4].result += item;
          break;
        case '8':
          sort[5].result += item;
          break;
        case '3':
          sort[6].result += item;
          break;
        case '6':
          sort[7].result += item;
          break;
        case '9':
          sort[8].result += item;
          break;
      }
    });

    sort[0].description = this.showDescription(sort[0].result, this.numDescription.description.dataNumbers.oneNum);
    sort[1].description = this.showDescription(sort[1].result, this.numDescription.description.dataNumbers.fourNum);
    sort[2].description = this.showDescription(sort[2].result, this.numDescription.description.dataNumbers.sevenNum);
    sort[3].description = this.showDescription(sort[3].result, this.numDescription.description.dataNumbers.twoNum);
    sort[4].description = this.showDescription(sort[4].result, this.numDescription.description.dataNumbers.fiveNum);
    sort[5].description = this.showDescription(sort[5].result, this.numDescription.description.dataNumbers.eightNum);
    sort[6].description = this.showDescription(sort[6].result, this.numDescription.description.dataNumbers.threeNum);
    sort[7].description = this.showDescription(sort[7].result, this.numDescription.description.dataNumbers.sixNum);
    sort[8].description = this.showDescription(sort[8].result, this.numDescription.description.dataNumbers.nineNum);
    return sort;
  }

  selectedDate(date: string): Square[] {
    const value = date.split('-');
    const year = value[0];
    const month = String(parseInt(value[1], 10));
    const day = String(parseInt(value[2], 10));
    let stringDate: string = day + month + year;
    let oneNumber: number = stringDate.split('').reduce((accum: number, elem) => accum + Number(elem), 0);
    let twoNumber: number = String(oneNumber).split('').reduce((accum: number, elem) => accum + Number(elem), 0);
    let threeNumber!: number;
    let fourNumber!: number;
    let allNumbers!: string;
    if (year <= '1999') {
      threeNumber = oneNumber - (Number(day.split('')[0]) * 2);
      fourNumber = String(threeNumber).split('').reduce((accum: number, elem) => accum + Number(elem), 0);
      allNumbers = stringDate + String(oneNumber) + String(twoNumber) + String(threeNumber) + String(fourNumber);
    }
    if (year >= '2000') {
      threeNumber = oneNumber + 19;
      fourNumber = String(threeNumber).split('').reduce((accum: number, elem) => accum + Number(elem), 0);
      allNumbers = stringDate + String(oneNumber) + String(twoNumber) + String(threeNumber) + String(fourNumber) + 19;
    }
    return this.sortNumbers(allNumbers);
  }

  colAndRowNumbers(sort: Square[]): RowAndCol[] {
    const comparison = {title: '', result: 0, description: ''};
    const spirituality = this.summarize(sort, 0, 4, 8);
    const temperament = this.summarize(sort, 2, 4, 6);

    if (spirituality === temperament) {
      comparison.title = "рівновага";
      comparison.result = 0;
      comparison.description = this.numDescription.description.maxDiag.equality;
    } else {
      comparison.title = spirituality > temperament ? "духовність" : "темперамент";
      comparison.result = spirituality > temperament ? spirituality : temperament;
      comparison.description = spirituality > temperament ? this.numDescription.description.maxDiag.max159 : this.numDescription.description.maxDiag.max753;
    }

    return [
      {
        title: "рішучість",
        img: "/assets/rows-and-cols/147.png",
        result: this.summarize(sort, 0, 1, 2),
        description: this.showDescription(this.summarize(sort, 0, 1, 2),
          this.numDescription.description.dataRow.row147)
      },
      {
        title: "сімейність",
        img: "/assets/rows-and-cols/258.png",
        result: this.summarize(sort, 3, 4, 5),
        description: this.showDescription(this.summarize(sort, 3, 4, 5),
          this.numDescription.description.dataRow.row258)
      },
      {
        title: "стабільність",
        img: "/assets/rows-and-cols/369.png",
        result: this.summarize(sort, 6, 7, 8),
        description: this.showDescription(this.summarize(sort, 6, 7, 8),
          this.numDescription.description.dataRow.row369)
      },
      {
        title: "самооцінка",
        img: "/assets/rows-and-cols/123.png",
        result: this.summarize(sort, 0, 3, 6),
        description: this.showDescription(this.summarize(sort, 0, 3, 6),
          this.numDescription.description.dataCol.col123)
      },
      {
        title: "достаток",
        img: "/assets/rows-and-cols/456.png",
        result: this.summarize(sort, 1, 4, 7),
        description: this.showDescription(this.summarize(sort, 1, 4, 7),
          this.numDescription.description.dataCol.col456)
      },
      {
        title: "талант",
        img: "/assets/rows-and-cols/789.png",
        result: this.summarize(sort, 2, 5, 8),
        description: this.showDescription(this.summarize(sort, 2, 5, 8),
          this.numDescription.description.dataCol.col789)
      },
      {
        title: "духовність",
        img: "/assets/rows-and-cols/159.png",
        result: this.summarize(sort, 0, 4, 8),
        description: this.showDescription(this.summarize(sort, 0, 4, 8),
          this.numDescription.description.dataDiag.diag159)
      },
      {
        title: "темперамент",
        img: "/assets/rows-and-cols/753.png",
        result: this.summarize(sort, 2, 4, 6),
        description: this.showDescription(this.summarize(sort, 2, 4, 6),
          this.numDescription.description.dataDiag.diag753)
      },
      {
        title: comparison.title,
        img: "/assets/rows-and-cols/159-753.png",
        result: comparison.result,
        description: comparison.description
      }
    ]
  }

  fullDescription(birthday: string) {
    const numbers = this.selectedDate(birthday)
    const description = [
      {title: numbers[0].title, text: numbers[0].description},
      {title: numbers[3].title, text: numbers[3].description},
      {title: numbers[6].title, text: numbers[6].description},
      {title: numbers[1].title, text: numbers[1].description},
      {title: numbers[4].title, text: numbers[4].description},
      {title: numbers[7].title, text: numbers[7].description},
      {title: numbers[2].title, text: numbers[2].description},
      {title: numbers[5].title, text: numbers[5].description},
      {title: numbers[8].title, text: numbers[8].description},
    ];
    this.colAndRowNumbers(numbers).map(item => description.push({title: item.title, text: item.description}));
    return description;
  }
}

