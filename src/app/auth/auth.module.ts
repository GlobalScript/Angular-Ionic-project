import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AuthRoutingModule} from './auth-routing.module';
import {LoginPageComponent} from "./components/login-page/login-page.component";
import {IonicModule} from "@ionic/angular";
import {LogOutComponent} from "./components/log-out/log-out.component";
import {TranslateModule} from "@ngx-translate/core";


@NgModule({
  declarations: [
    LoginPageComponent,
    LogOutComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    IonicModule,
    TranslateModule
  ]
})
export class AuthModule {
}
