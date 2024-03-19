import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {MoodEmojiService} from "../../services/mood-emoji.service";
import {Emoji} from "../../models/types";
import {EmojiEditorComponent} from "../emoji-editor/emoji-editor.component";
import {ModalController} from '@ionic/angular';

@Component({
  selector: 'app-editor-page',
  templateUrl: './editor-page.component.html',
  styleUrls: ['./editor-page.component.scss'],
})
export class EditorPageComponent implements OnInit, OnDestroy {

  emojiListSub!: Subscription;
  emojiList!: Emoji[];

  constructor(public emojiService: MoodEmojiService, private modalController: ModalController) {
  }

  ngOnInit() {
    this.emojiListSub = this.emojiService.getEmotions()
      .subscribe(data => this.emojiList = data);
  }

  async openEmojiEditor(emotion: Emoji, index: number) {
    const modal = await this.modalController.create({
      component: EmojiEditorComponent,
      componentProps: {emotion, index},
      cssClass: 'mood-emoji-style'
    });
    return await modal.present();
  }

  async closeEmojiEditor() {
    const topModal = await this.modalController.getTop();
    if (topModal) await this.modalController.dismiss();
  }


  ngOnDestroy() {
    this.closeEmojiEditor();
    this.emojiListSub.unsubscribe();
  }
}
