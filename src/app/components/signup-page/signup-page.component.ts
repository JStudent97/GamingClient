import { Component, OnInit } from '@angular/core';
import {AppStateService} from '../../services/applicationState/app-state.service';
import {UserService} from '../../services/user/user.service';

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.css']
})
export class SignupPageComponent implements OnInit {

  public email: string;
  public username: string;
  public password: string;

  constructor(
    private appStateService: AppStateService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
  }

  async createUser(): Promise<void> {
    // create the user
    await this.userService.createUser(this.email, this.username, this.password);

    // return user to logging page
    this.appStateService.markUserLoggedOut();
  }

}
