import {Injectable} from '@angular/core';
import {AuthService} from "../../auth/services/auth.service";
import {LanguageCode} from "../models/types";

@Injectable({
  providedIn: 'root'
})
export class LocalizationService {

  constructor(private authService: AuthService) {
  }

  async setUserLanguage(languageCode: LanguageCode) {
    await this.authService.getUserRef().update({language: languageCode})
  }

}
