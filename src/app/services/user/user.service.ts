import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';

declare var electron: any;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private setCurrentUser = new Subject();
  setCurrentUser$ = this.setCurrentUser.asObservable();

  constructor() { }

  public setUser(user) {
    this.setCurrentUser.next(user);
  }

  public async createUser(email, username, password) {
    const result = electron.ipcRenderer.sendSync('create-user', {
      email,
      username,
      password
    });

    console.log(result);
  }

  public async loginUser(username, password) {
    const result = electron.ipcRenderer.sendSync('login-user', {
      username,
      password
    });

    return result;
  }
}
