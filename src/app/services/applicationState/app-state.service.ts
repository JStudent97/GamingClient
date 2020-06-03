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

  public getState() {
    return this.appState.getState;
  }

  public isUserLoggedIn() {
    return this.appState.getState === AppState.LoggedIn;
  }

  public isUserLoggedOut() {
    return this.appState.getState === AppState.LoggedOut;
  }

  public isUserSigningUp() {
    return this.appState.getState === AppState.SigningUp;
  }

}
