import {AppState} from './app-state.enum';

export class ApplicationState {

  private state: AppState;
  private inAppState: AppState;

  get getState(): AppState {
    return this.state;
  }

  get getInAppState(): AppState {
    return this.inAppState;
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

  public InStore() {
    if (this.state === AppState.LoggedIn) {
      this.inAppState = AppState.InStore;
    }
  }

  public InLibrary() {
    if (this.state === AppState.LoggedIn) {
      this.inAppState = AppState.InLibrary;
    }
  }

  public InFriends() {
    if (this.state === AppState.LoggedIn) {
      this.inAppState = AppState.InFriends;
    }
  }

  public InGameDetailsPage() {
    if (this.state === AppState.LoggedIn) {
      this.inAppState = AppState.InGameDetailsPage;
    }
  }

  constructor() {
    this.state = AppState.LoggedOut;
    this.inAppState = AppState.InStore;
  }


}
