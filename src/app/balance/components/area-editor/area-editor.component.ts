import {Component, Input} from '@angular/core';
import {ModalController} from '@ionic/angular';

@Component({
  selector: 'app-area-editor',
  templateUrl: './area-editor.component.html',
  styleUrls: ['./area-editor.component.scss'],
})
export class AreaEditorComponent {

  @Input() areaTitle!: string;
  @Input() areasLevels!: number[];
  @Input() areaIndex!: number;

  constructor(private modalController: ModalController) {
  }


  changeLevel(event: Event) {
    const value: number = Number((event.target as HTMLInputElement).value);
    this.areasLevels[this.areaIndex] = value;
  }

  async closeModal() {
    await this.modalController.dismiss(this.areasLevels);
  }
}
