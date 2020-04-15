import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import {JwtHelperService} from "@auth0/angular-jwt";
import {User} from "../../@core/data/user";
import UserCredential = firebase.auth.UserCredential;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    public fireAuth: AngularFireAuth
  ) { }

  googleAuth() {
    return new Promise<any>((resolve, reject) => {
      let provider = new firebase.auth.GoogleAuthProvider();
      provider.addScope('profile');
      provider.addScope('email');
      this.fireAuth.auth
        .signInWithPopup(provider)
        .then(res => {
          resolve(res);
        }).catch(err => {
          reject(err);
      })
    })
  }

  isTokenValid() {
    const token = this.getToken();
    return token ? !new JwtHelperService().isTokenExpired(token) : false;
  }

  isLoggedIn() {
    return this.isTokenValid() && this.getUser();
  }

  logOut() {
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('authToken');
    window.location.reload();
  }

  getUser() {
    return JSON.parse(sessionStorage.getItem('user'));
  }

  getToken(): string {
    return sessionStorage.getItem('authToken');
  }

  credentialLogin(credentials: User): Promise<UserCredential> {
    return this.fireAuth.auth.signInWithEmailAndPassword(credentials.email, credentials.password)
  }
}
