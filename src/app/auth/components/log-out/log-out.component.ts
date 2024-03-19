import {Component} from '@angular/core';
import {ModalController} from "@ionic/angular";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-log-out',
  templateUrl: './log-out.component.html',
  styleUrls: ['./log-out.component.scss'],
})
export class LogOutComponent {

  constructor(private modalController: ModalController, public auth: AuthService) {
  }

  logout() {
    this.auth.signOut().then(() => {
      this.closeMessage();
    })
  }

  async closeMessage() {
    await this.modalController.dismiss();
  }

}
