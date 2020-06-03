import {AppState} from './app-state.enum';

export class ApplicationState {

  private state: AppState;

  get getState(): AppState {
    return this.state;
  }

  public Logout() {
    if (this.state === AppState.LoggedIn || this.state === AppState.SigningUp) {
      this.state = AppState.LoggedOut;
    }
  }

  public Login() {
    if (this.state === AppState.LoggedOut) {
      this.state = AppState.LoggedIn;
    }
  }

  public SignUp() {
    if (this.state === AppState.LoggedOut) {
      this.state = AppState.SigningUp;
    }
  }

  constructor() {
    this.state = AppState.LoggedOut;
  }


}
