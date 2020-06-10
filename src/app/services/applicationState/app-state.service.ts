import {Injectable} from '@angular/core';
import {ApplicationState} from '../../classes/applicationState/application-state';
import {AppState} from '../../classes/applicationState/app-state.enum';

@Injectable({
  providedIn: 'root'
})
export class AppStateService {

  private appState: ApplicationState;

  constructor() {
    this.appState = new ApplicationState();
  }

  public markUserLoggedOut() {
    this.appState.Logout();
  }

  public markUserLoggedIn() {
    this.appState.Login();
  }

  public markUserSigningUp() {
    this.appState.SignUp();
  }

  public markUserInStore() {
    this.appState.InStore();
  }

  public markUserInLibrary() {
    this.appState.InLibrary();
  }

  public markUserInFriends() {
    this.appState.InFriends();
  }

  public markUserInGameDetailsPage() {
    this.appState.InGameDetailsPage();
  }

  public getState() {
    return this.appState.getState;
  }

  public isUserLoggedIn(): boolean {
    return this.appState.getState === AppState.LoggedIn;
  }

  public isUserLoggedOut(): boolean {
    return this.appState.getState === AppState.LoggedOut;
  }

  public isUserSigningUp(): boolean {
    return this.appState.getState === AppState.SigningUp;
  }

  public isUserInStore(): boolean {
    return this.appState.getInAppState === AppState.InStore;
  }

  public isUserInLibrary(): boolean {
    return this.appState.getInAppState === AppState.InLibrary;
  }

  public isUserInFriends(): boolean {
    return this.appState.getInAppState === AppState.InFriends;
  }

  public isUserInGameDetailsPage(): boolean {
    return this.appState.getInAppState === AppState.InGameDetailsPage;
  }

}
