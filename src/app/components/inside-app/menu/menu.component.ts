import {Component, Input, OnInit} from '@angular/core';
import {AppStateService} from '../../../services/applicationState/app-state.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  @Input() user;
  public cssClassState = 1;

  constructor(private appStateService: AppStateService) { }

  ngOnInit(): void {
  }

  public moveUserToStore() {
    this.cssClassState = 1;
    this.appStateService.markUserInStore();
  }

  public moveUserToLibrary() {
    this.cssClassState = 2;
    this.appStateService.markUserInLibrary();
  }

  public moveUserToFriends() {
    this.cssClassState = 3;
    this.appStateService.markUserInFriends();
  }

  public logoutUser() {
    this.appStateService.markUserInStore();
    this.appStateService.markUserLoggedOut();
  }

  // TODO: create exit function

}
