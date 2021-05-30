import { Subject } from "rxjs/Subject";
import { Router } from "@angular/router";
import { Injectable } from "@angular/core";
import { User } from "./user.model";
import { AuthData } from "./auth-data.model";
import { AngularFireAuth } from "@angular/fire/auth";
import * as firebase from "firebase";
import { BehaviorSubject } from "rxjs";

@Injectable()
export class AuthService {
  authChange = new Subject<boolean>();
  isAuthenticated =new BehaviorSubject<boolean>(false);
  currentuser: string = "Default";
  constructor(private router: Router, private afAuth: AngularFireAuth) {
    if(localStorage.getItem('currentuserBank'))
     this.isAuthenticated.next(true); 
     else
     this.isAuthenticated.next(false); 
  }
  public get currentUserAuth(): boolean {
    return this.isAuthenticated.value;
}
  registerUser(authData: AuthData) {
    this.afAuth
      .createUserWithEmailAndPassword(authData.email, authData.password)
      .then((result) => {
        this.authSuccessfully();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  login(authData: AuthData) {
    var name = authData.email.replace(/@.*$/, "");
    this.currentuser = name;
    this.afAuth
      .signInWithEmailAndPassword(authData.email, authData.password)
      .then((result) => {
        this.authSuccessfully();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  logout() {
    this.authChange.next(false);
    localStorage.removeItem("currentuserBank");
    this.router.navigate(["/login"]);
    // this.isAuthenticated = false;

    this.isAuthenticated.next(false);  }

  isAuth() {
    return this.isAuthenticated;
  }

  private authSuccessfully() {
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        // this.user = user;
        // this.currentuser.next(user);
        localStorage.setItem("currentuserBank", JSON.stringify(user));
      } else {
        localStorage.setItem("currentuserBank", null);
      }
    });
    var user = this.afAuth.currentUser;
    // this.isAuthenticated = true;
    this.isAuthenticated.next(true); 
    this.authChange.next(true);
    // this.router.navigate(['/training']);
    this.router.navigate(["/accounts"]);
  }
  private updateuser() {
    // var user = this.afAuth.user;
    // var user = currentUser;
    // this.afAuth.updateCurrentUser({
    //   displayName: "Jane Q. User",
    //   photoURL: "https://example.com/jane-q-user/profile.jpg"
    // }).then(function() {
    //   // Update successful.
    // }).catch(function(error) {
    //   // An error happened.
    // });
  }
}
