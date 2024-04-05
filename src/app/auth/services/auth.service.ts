import {Injectable} from '@angular/core';
import {AngularFireDatabase, AngularFireObject} from '@angular/fire/compat/database';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import {GithubAuthProvider, GoogleAuthProvider} from 'firebase/auth';
import {Router} from '@angular/router';
import {first, map, take} from 'rxjs';
import {LanguageCode} from "../../localization/models/types";
import {Language} from "../../localization/models/enums";
import {TranslateService} from "@ngx-translate/core";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private uid = 'HzSyk4ttRoTnwZLIr2qgUrbHAG62';
  private isLogged = false;
  private userName = "Demo User";
  private language!: LanguageCode;


  constructor(
    private db: AngularFireDatabase,
    private angularFireAuth: AngularFireAuth,
    private router: Router,
    private translate: TranslateService
  ) {
    this.getUserSession()
  }


  private signIn(provider: GoogleAuthProvider | GithubAuthProvider) {
    this.angularFireAuth
      .signInWithPopup(provider)
      .then(res => {
        if (!res.user?.displayName) return;
        this.userName = res.user?.displayName;
        this.uid = res.user?.uid;
        this.getUserLanguage();
        this.isLogged = true;
        this.router.navigate(['start']);
      })
  }

  googleAuth() {
    return this.signIn(new GoogleAuthProvider());
  }

  gitHubAuth() {
    return this.signIn(new GithubAuthProvider())
  }

  private getUserSession() {
    this.angularFireAuth.authState
      .pipe(take(1)).subscribe(user => {
      if (!user?.displayName) return;
      this.userName = user?.displayName;
      this.uid = user?.uid;
      this.getUserLanguage();
      this.isLogged = true;
      this.router.navigate(['/start'])
      return;
    })
    this.getUserLanguage();
  }

  signOut() {
    return this.angularFireAuth.signOut().then(() => {
      this.isLogged = false;
      this.userName = "Demo User";
      this.uid = "HzSyk4ttRoTnwZLIr2qgUrbHAG62";
      this.getUserLanguage();
      this.router.navigate(['/login']);
    });
  }

  getUserRef(): AngularFireObject<any> {
    return this.db.object(this.uid);
  }

  get userLanguage() {
    return this.language;
  }

  set userLanguage(lang) {
    this.language = lang;
  }

  private getUserLanguage(): void {
    this.getUserRef().valueChanges()
      .pipe(first(), map(data => data?.language || Language.EN))
      .subscribe(lang => {
        this.userLanguage = lang;
        this.translate.use(lang);
      });
  }


  isLoggedIn() {
    return this.isLogged;
  }

  getUserName() {
    return this.userName;
  }

}
