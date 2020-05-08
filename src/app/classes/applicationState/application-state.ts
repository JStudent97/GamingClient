import {AppState} from './app-state.enum';

export class ApplicationState {

  private state: AppState;

  get getState(): AppState {
    return this.state;
  }

  public loggedOut() {
    if(this.state === AppState.LoggedIn) {
      this.state = AppState.LoggedOut;
    }
  }

  public loggedIn() {
    if (this.state === AppState.LoggedOut) {
      this.state = AppState.LoggedIn;
    }
  }

  constructor() {
    this.state = AppState.LoggedOut;
  }


}
