import { Injectable } from '@angular/core';

declare var electron: any;

@Injectable({
  providedIn: 'root'
})
export class FriendsService {

  private friends: any[] = [];

  constructor() { }

  public getFriends(username) {
    return electron.ipcRenderer.sendSync('get-friends', {
      username
    });
  }

  public sendFriendRequest(sender, recipient): void {
    electron.ipcRenderer.sendSync('send-friend-request', {
      sender,
      recipient
    });
  }

  public getIncomingFriendRequests(recipientName) {
   return electron.ipcRenderer.sendSync('get-incoming-friend-requests', {
      recipient: recipientName
    });
  }

  public acceptFriendRequest(sender, recipient) {
    electron.ipcRenderer.sendSync('accept-friend-request', {
      sender,
      recipient
    });
  }

  public denyFriendRequest(sender, recipient) {
    electron.ipcRenderer.sendSync('deny-friend-request', {
      sender,
      recipient
    });
  }

}
