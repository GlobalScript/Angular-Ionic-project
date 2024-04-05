import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {IonContent} from '@ionic/angular';
import {ActivatedRoute} from "@angular/router";
import {NumerologyService} from "../../services/numerology.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.scss'],
})
export class DescriptionComponent implements OnInit, OnDestroy {

  birthdayParam!: string;
  description!: { title: string; text: string }[];
  subscription!: Subscription;

  constructor(public numerologyService: NumerologyService, private activatedRoute: ActivatedRoute) {
  }

  @ViewChild(IonContent) content!: IonContent;

  ngOnInit() {
    this.birthdayParam = `/numerology/square/${this.activatedRoute.snapshot.params['date']}`
    this.subscription = this.numerologyService.getFullDescription(this.activatedRoute.snapshot.params['date'])
      .subscribe(data => this.description = data);
  }

  async scrollToTop() {
    await this.content.scrollToTop(300);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
