import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import {AuthModule} from "./auth/auth.module";

const firebase =  {
    appId: '1:263805802771:web:6d401c18058de41e3462e6',
    databaseURL: 'https://mood-tracker-5dfdc-default-rtdb.europe-west1.firebasedatabase.app',
    storageBucket: 'mood-tracker-5dfdc.appspot.com',
    apiKey: 'AIzaSyCZt6x2QPTwWJQA8Xa1RAA97L6xw1RUcNw',
    authDomain: 'mood-tracker-5dfdc.firebaseapp.com',
    messagingSenderId: '263805802771',
    measurementId: 'G-BW99F6MEWJ',
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    AuthModule,
    AngularFireModule.initializeApp(firebase)],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
