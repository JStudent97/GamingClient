import { Component, OnInit } from '@angular/core';
import {AppStateService} from '../../services/applicationState/app-state.service';
import {UserService} from '../../services/user/user.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  username: string;

  constructor(
    private appStateService: AppStateService,
    private userService: UserService
    ) { }

  ngOnInit(): void {
  }

  setUserInSignUp() {
    this.appStateService.markUserSigningUp();
  }

  loginUser(username) {
    this.appStateService.markUserLoggedIn();
    this.userService.setUser({name: username});
  }
}
