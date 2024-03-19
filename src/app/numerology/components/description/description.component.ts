import {Component, OnInit, ViewChild} from '@angular/core';
import {IonContent} from '@ionic/angular';
import {ActivatedRoute} from "@angular/router";
import {NumerologyService} from "../../services/numerology.service";

@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.scss'],
})
export class DescriptionComponent implements OnInit {
  birthdayParam!: string;
  description!: {title: string; text: string}[];

  constructor(public numerologyService: NumerologyService, private activatedRoute: ActivatedRoute) {
  }

  @ViewChild(IonContent) content!: IonContent;

  ngOnInit() {
    this.birthdayParam = `/numerology/square/${this.activatedRoute.snapshot.params['date']}`
    this.description = this.numerologyService.fullDescription(this.activatedRoute.snapshot.params['date']);
  }

  async scrollToTop() {
    await this.content.scrollToTop(300);
  }

}
