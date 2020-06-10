import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FriendsService {

  private friends: any[] = [];

  constructor() {
    for (let i = 0; i <= 5; i++) {
      this.friends.push(`friend${i}`);
    }
  }

  public getFriends() {
    return this.friends;
  }

}
