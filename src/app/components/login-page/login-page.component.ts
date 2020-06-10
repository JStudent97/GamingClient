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
  password: string;

  constructor(
    private appStateService: AppStateService,
    private userService: UserService
    ) { }

  ngOnInit(): void {
  }

  setUserInSignUp() {
    this.appStateService.markUserSigningUp();
  }

  async loginUser() {
    // attempt to login the user
    const attempt = await this.userService.loginUser(this.username, this.password);

    if (attempt.status) {
      this.appStateService.markUserLoggedIn();
      this.userService.setUser({name: this.username});
    } else {
      console.log(attempt);
    }
  }
}
