import {Component, Input} from '@angular/core';
import {MoodEmojiService} from "../../services/mood-emoji.service";
import {Emoji, Month} from "../../models/types";
import {ModalController} from "@ionic/angular";

@Component({
  selector: 'app-mood-levels',
  templateUrl: './mood-levels.component.html',
  styleUrls: ['./mood-levels.component.scss'],
})
export class MoodLevelsComponent {

  constructor(
    public emojiService: MoodEmojiService,
    private modalController: ModalController
  ) {
  }

  @Input() day!: number;
  @Input() month!: Month;
  @Input() emotionList!: Emoji[];


  timeStamp(): number {
    if (!this.month || !this.month.timestamp) return Date.now();
    return this.month.timestamp;
  }

  async selectedLevel(level: number) {
    await this.modalController.dismiss(level, 'res');
  }

  async close() {
    await this.modalController.dismiss();
  }

}
