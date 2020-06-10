import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';

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
}
