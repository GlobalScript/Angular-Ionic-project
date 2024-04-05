import {Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {Emoji, Month} from '../../models/types';
import {MoodCrudService} from "../../services/mood-crud.service";
import {MoodChartService} from "../../services/mood-chart.service";
import {MoodEmojiService} from "../../services/mood-emoji.service";
import {EmojiEditorComponent} from "../emoji-editor/emoji-editor.component";

@Component({
  selector: 'app-emoji-section',
  templateUrl: './emoji-section.component.html',
  styleUrls: ['./emoji-section.component.scss'],
})
export class EmojiSectionComponent {

  constructor(
    private crud: MoodCrudService,
    public dateService: MoodChartService,
    public emojiService: MoodEmojiService) {
  }

  @ViewChild(EmojiEditorComponent) emojiEditor!: EmojiEditorComponent;
  @Input() data!: Month;
  @Input() emotionList!: Emoji[];
  @Output() scrollUp: EventEmitter<void> = new EventEmitter<void>();

  selectedLevel(level: number) {
    this.scrollToTop();
    if (!this.dateService.active()) {
      this.data.levels[this.data.levels.length - 1] = level;
      this.crud.updateMonth(this.data);
      return;
    }
    this.data.levels.push(level);
    if (!this.data.timestamp) this.crud.createMonth(this.data)
    else this.crud.updateMonth(this.data)
  }

  scrollToTop() {
    this.scrollUp.emit();
  }
}
