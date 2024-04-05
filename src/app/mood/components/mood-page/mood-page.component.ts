import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Subscription} from 'rxjs';
import {DataMonth, Emoji, Month} from '../../models/types';
import {MoodChartComponent} from "../mood-chart/mood-chart.component";
import {MoodLevelsComponent} from "../mood-levels/mood-levels.component";
import {MoodChartService} from "../../services/mood-chart.service";
import {MoodCrudService} from "../../services/mood-crud.service";
import {MoodEmojiService} from "../../services/mood-emoji.service";
import {IonContent, ModalController} from '@ionic/angular';

@Component({
  selector: 'app-mood-page',
  templateUrl: './mood-page.component.html',
  styleUrls: ['./mood-page.component.scss'],
})
export class MoodPageComponent implements OnInit, OnDestroy {

  constructor(
    public dateService: MoodChartService,
    public crud: MoodCrudService,
    private emojiService: MoodEmojiService,
    private modalController: ModalController
  ) {
  }

  @ViewChild(MoodChartComponent) moodChart!: MoodChartComponent;
  @ViewChild(IonContent) content!: IonContent;

  private selectedMonth!: number;
  private data!: DataMonth[];
  private monthListSub!: Subscription;
  private emotionListSub!: Subscription;
  showMonth!: Month;
  emotionList!: Emoji[];
  currentTimestamp = Date.now();

  ngOnInit(): void {
    this.emotionListSub = this.emojiService.getEmotions().subscribe(data => this.emotionList = data);
    this.monthListSub = this.crud.readMonths().subscribe(list => {
      this.data = list;
      let monthIndex: number | undefined;
      if (sessionStorage.getItem('monthIndex') != null) monthIndex = Number(sessionStorage.getItem('monthIndex'));
      if (monthIndex !== undefined && list.length) {
        this.showMonth = this.dateService.dataOtherMonth(list[monthIndex]);
        this.selectedMonth = monthIndex;
      } else {
        this.showMonth = this.dateService.dataCurrentMonth(list);
        this.selectedMonth = list.length - 1;
      }
      this.moodChart.showChart(this.showMonth);
    });
  }

  timeStamp(): number {
    if (!this.showMonth || !this.showMonth.timestamp) return Date.now();
    return this.showMonth.timestamp;
  }

  scrollToTop() {
    this.content.scrollToTop(300);
  }

  selectedLevel(level: number, selectedDay: number) {
    this.showMonth.levels[selectedDay - 1] = level;
    if (!this.showMonth.timestamp) {
      this.crud.createMonth({timestamp: null, levels: this.showMonth.levels});
    }
    this.crud.updateMonth(this.showMonth);
  }

  async openLevelEditor(selectedDay: number) {
    const modal = await this.modalController.create({
      component: MoodLevelsComponent,
      componentProps: {day: selectedDay, month: this.showMonth, emotionList: this.emotionList},
      cssClass: 'mood-levels-style'
    });
    modal.onDidDismiss().then((modalData) => {
      if (modalData.data === undefined) return;
      this.selectedLevel(modalData.data, selectedDay);
    });
    return await modal.present();
  }

  async closeLevelEditor() {
    const topModal = await this.modalController.getTop();
    if (topModal) await this.modalController.dismiss();
  }

  nextMonth(num: number) {
    if (!this.data.length) return;
    const dataLength = this.data.length - 1;
    if ((this.selectedMonth === 0 && num === -1) || (this.selectedMonth >= dataLength && num === 1)) return;
    this.selectedMonth += num;
    if (this.selectedMonth === dataLength) {
      this.showMonth = this.dateService.dataCurrentMonth(this.data);
      sessionStorage.removeItem('monthIndex');
    } else {
      this.showMonth = this.dateService.dataOtherMonth(this.data[this.selectedMonth]);
      sessionStorage.setItem("monthIndex", String(this.selectedMonth));
    }
    this.moodChart.showChart(this.showMonth);
  }

  ngOnDestroy(): void {
    sessionStorage.removeItem("monthIndex");
    this.monthListSub.unsubscribe();
    this.emotionListSub.unsubscribe();
    this.closeLevelEditor();
  }
}
