import { Component, OnInit } from '@angular/core';
import {AppStateService} from '../../services/applicationState/app-state.service';

@Component({
  selector: 'app-my-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.css']
})
export class RootComponent implements OnInit {

  constructor(
    private appStateService: AppStateService
  ) { }

  ngOnInit(): void {
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
