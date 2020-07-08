import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth.service';
import {Router} from "@angular/router";
import {NbIconLibraries, NbToastrService} from "@nebular/theme";
import {User} from "../../../@core/data/user";

@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user: User;
  submitteded: boolean = false;
  logginngIn: boolean = false;

  constructor(
    public authService: AuthService,
    private router: Router,
    private toastr: NbToastrService
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
    this.logginngIn = true;

    this.authService.googleAuth().then(response => {
      console.log(response);
      let userInfo = response.user
      let storedUser = {
        name: userInfo.displayName,
        photoURL: userInfo.photoURL,
        email: userInfo.email,
      }
      this.storeUser(storedUser, response.credential.idToken);
      this.logginngIn = false;
      this.router.navigate(['/dashboard/']);
    }).catch(err => {
      this.logginngIn = false;
      this.toastr.danger('Během přihlašování nastala chyba!', 'Chyba');
    })
  }

  userLogin(form) {
    this.logginngIn = true;
    this.authService.credentialLogin(this.user).then(loggedInUser => {
      console.log(loggedInUser);
      if(loggedInUser.user) {
        let storedUser = {
          email: loggedInUser.user.email,
        }
        this.storeUser(storedUser, loggedInUser.user.getIdToken());
        this.logginngIn = false;
        this.router.navigate(['/dashboard/'])
      }
    }).catch(err => {
      this.logginngIn = false;
      this.submitteded = false;
      form.reset();
      this.toastr.danger(err.message ? err.message : 'Během přihlášení nastala chyba, zkuste se prosím přihlásit později.', 'Chyba')
    })
  }

}
