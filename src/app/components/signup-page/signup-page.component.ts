import { Component, OnInit } from '@angular/core';
import {AppStateService} from '../../services/applicationState/app-state.service';

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.css']
})
export class SignupPageComponent implements OnInit {

  constructor(private appStateService: AppStateService) { }

  ngOnInit(): void {
  }

  setUserLoggedOut() {
    this.appStateService.markUserLoggedOut();
  }

}
