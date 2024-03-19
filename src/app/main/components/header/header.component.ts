import { Component, Input } from '@angular/core';
import {AuthService} from "../../../auth/services/auth.service";
import {ModalController} from "@ionic/angular";
import {LogOutComponent} from "../../../auth/components/log-out/log-out.component";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent  {

  @Input() headerSetting!: {backBtn?: boolean, link?: string};

  constructor(public auth: AuthService,  private modalController: ModalController) { }

 async openLogOutModal() {
    const modal = await this.modalController.create({
      component: LogOutComponent,
      cssClass: 'auth-log-out-style'
    });
    return await modal.present();
  }
}
