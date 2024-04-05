import {Component, Input} from '@angular/core';
import {AuthService} from "../../../auth/services/auth.service";
import {ModalController} from "@ionic/angular";
import {TranslateService} from "@ngx-translate/core";
import {LogOutComponent} from "../../../auth/components/log-out/log-out.component";
import {LocalizationService} from "../../../localization/services/localization.service";
import {Language} from "../../../localization/models/enums";
import {LanguageCode} from "../../../localization/models/types";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {

  @Input() headerSetting!: { backBtn?: boolean, link?: string, translate?: boolean };

  constructor(
    public auth: AuthService,
    private modalController: ModalController,
    private translate: TranslateService,
    public localServ: LocalizationService,
  ) {
  }

  switchLanguages(languageCode: LanguageCode) {
    if (languageCode === Language.EN) {
      this.translate.use(Language.UA)
      this.auth.userLanguage = Language.UA;
      if (this.auth.isLoggedIn()) this.localServ.setUserLanguage(Language.UA);
    } else {
      this.translate.use(Language.EN);
      this.auth.userLanguage = Language.EN;
      if (this.auth.isLoggedIn()) this.localServ.setUserLanguage(Language.EN);
    }
  }

  async openLogOutModal() {
    const modal = await this.modalController.create({
      component: LogOutComponent,
      cssClass: 'auth-log-out-style'
    });
    return await modal.present();
  }
}
