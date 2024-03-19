import { Component } from '@angular/core';
import {AuthService} from "../../../auth/services/auth.service";

@Component({
  selector: 'app-start-page',
  templateUrl: './start-page.component.html',
  styleUrls: ['./start-page.component.scss'],
})
export class StartPageComponent {

  constructor(public auth: AuthService) { }

  sections = [
    {
      title: "Настрій",
      description: "",
      icon: "analytics-outline",
      path: '/mood'
    },
    {
      title: "Баланс",
      description: "",
      icon: "body-outline",
      path: '/balance'
    },
    {
      title: "Щоденник",
      description: "",
      icon: "book-outline",
      path: "/notebook"
    },
    {
      title: "Нумерологія",
      description: "",
      icon: "infinite-outline",
      path: "/numerology"
    }
  ]

}
