import { Component, OnInit } from '@angular/core';
import {AppStateService} from '../../services/applicationState/app-state.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  constructor(private appStateService: AppStateService) { }

  ngOnInit(): void {
  }

  setUserInSignUp() {
    this.appStateService.markUserSigningUp();
  }
}
