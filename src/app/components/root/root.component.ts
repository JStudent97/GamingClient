import { Component, OnInit } from '@angular/core';
import {AppStateService} from '../../services/applicationState/app-state.service';
import {UserService} from '../../services/user/user.service';

@Component({
  selector: 'app-my-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.css']
})
export class RootComponent implements OnInit {

  user: any;

  constructor(
    private appStateService: AppStateService,
    private userService: UserService
  ) {
      this.userService.setCurrentUser$.subscribe((user) => {
        this.sendUser(user);
      });
  }

  ngOnInit(): void {
  }

  private sendUser(user) {
    this.user = user;
  }

  public isUserLoggedOut() {
    return this.appStateService.isUserLoggedOut();
  }

  public isUserLoggedIn() {
    return this.appStateService.isUserLoggedIn();
  }

  public isUserSigningUp() {
    return this.appStateService.isUserSigningUp();
  }

}
