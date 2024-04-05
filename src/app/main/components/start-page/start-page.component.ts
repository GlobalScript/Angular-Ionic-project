import {Component} from '@angular/core';
import {AuthService} from "../../../auth/services/auth.service";

@Component({
  selector: 'app-start-page',
  templateUrl: './start-page.component.html',
  styleUrls: ['./start-page.component.scss'],
})
export class StartPageComponent {

  constructor(public auth: AuthService) {
  }

  category = [
    {
      title: "main.mood",
      path: "/mood",
      icon: "analytics-outline"
    },
    {
      title: "main.balance",
      path: "/balance",
      icon: "body-outline"
    },
    {
      title: "main.notebook",
      path: "/notebook",
      icon: "book-outline"
    },
    {
      title: "main.numerology",
      path: "/numerology",
      icon: "infinite-outline"
    },
  ]

}
