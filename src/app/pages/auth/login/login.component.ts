import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth.service';
import {Router} from "@angular/router";
import {NbIconLibraries} from "@nebular/theme";
import {User} from "../../../@core/data/user";

@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  private user: User;
  private submitteded: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {
    this.user = {
      email: '',
      password: ''
    }
  }

  ngOnInit() {
  }

  storeUser(user, token) {
    sessionStorage.setItem('user', JSON.stringify(user));
    sessionStorage.setItem('authToken', token);
  }

  googleLogin() {
    this.authService.googleAuth().then(response => {
      console.log(response);
      let userInfo = response.user
      let storedUser = {
        name: userInfo.displayName,
        photoURL: userInfo.photoURL,
        email: userInfo.email,
      }
      this.storeUser(storedUser, response.credential.idToken);
      this.router.navigate(['/dashboard/']);
    })
  }

  userLogin() {
    this.authService.credentialLogin(this.user).then(loggedInUser => {
      console.log(loggedInUser);
      if(loggedInUser.user) {

        let storedUser = {
          email: loggedInUser.user.email,
        }
        this.storeUser(storedUser, loggedInUser.user.getIdToken());
        this.router.navigate(['/dashboard/'])
      }
    }).catch(err => {
      console.log(err);
    })
  }

}
