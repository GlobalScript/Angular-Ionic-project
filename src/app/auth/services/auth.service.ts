import {Injectable} from '@angular/core';
import {AngularFireDatabase, AngularFireObject} from '@angular/fire/compat/database';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import {GoogleAuthProvider} from 'firebase/auth';
import {Router} from '@angular/router';
import {take} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private uid = 'HzSyk4ttRoTnwZLIr2qgUrbHAG62';
  private isLogged = false;
  private userName = "Demo User";

  constructor(
    private db: AngularFireDatabase,
    private angularFireAuth: AngularFireAuth,
    private router: Router
  ) {
    this.getUserSession()
  }

  googleSignIn(provider: any) {
    this.angularFireAuth
      .signInWithPopup(provider)
      .then(res => {
        if(!res.user?.displayName) return;
        this.userName = res.user?.displayName;
        this.uid = res.user?.uid;
        this.isLogged = true;
        this.router.navigate(['start']);
      })
  }

  googleAuth() {
    return this.googleSignIn(new GoogleAuthProvider());
  }

  private getUserSession() {
    this.angularFireAuth.authState
      .pipe(take(1)).subscribe(user => {
        if(!user?.displayName) return;
      this.userName = user?.displayName;
      this.uid = user?.uid;
      this.isLogged = true;
      this.router.navigate(['/start'])
    })
  }

  signOut() {
    return this.angularFireAuth.signOut().then(() => {
      this.isLogged = false;
      this.userName = "Demo User";
      this.uid = "HzSyk4ttRoTnwZLIr2qgUrbHAG62";
      this.router.navigate(['/login']);
    });
  }

  isLoggedIn() {
    return this.isLogged;
  }

  getUserName() {
    return this.userName;
  }

  getUserRef(): AngularFireObject<any> {
    return this.db.object(this.uid)
  }

}
