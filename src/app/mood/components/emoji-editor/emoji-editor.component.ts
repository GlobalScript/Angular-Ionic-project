import {Component, Input} from '@angular/core';
import {Emoji} from '../../models/types';
import {MoodEmojiService} from "../../services/mood-emoji.service";
import {ModalController} from '@ionic/angular';

@Component({
  selector: 'app-emoji-editor',
  templateUrl: './emoji-editor.component.html',
  styleUrls: ['./emoji-editor.component.scss'],
})
export class EmojiEditorComponent {

  @Input() emotion!: Emoji;
  @Input() index!: number;

  constructor(public emojiService: MoodEmojiService, private modalController: ModalController,) {
  }

  settingChange(emoji: string | null = null) {
    this.modalController.dismiss().then(() => {
      this.emojiService.editEmotion(
        this.emotion.title,
        emoji || this.emotion.emoji,
        this.index
      );
    });
  }
}
