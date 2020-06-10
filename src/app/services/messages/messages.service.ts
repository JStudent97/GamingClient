import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  private messages: any[] = [];

  constructor() {
    for(let i = 0; i <= 20; i++) {
      this.messages.push({
        sender: 'Username',
        receiver: 'friend1',
        message: 'Hello Dude!'
      });
    }

    this.messages.push({
      sender: 'friend1',
      receiver: 'Username',
      message: 'yo! wassup man?'
    });

    this.messages.push({
      sender: 'Username',
      receiver: 'friend1',
      message: 'all good m8. what \'bout you?'
    });

    this.messages.push({
      sender: 'friend1',
      receiver: 'Username',
      message: 'it\'s cool...it\'s cool'
    });
  }

  public getMessages(): any[] {
    return this.messages;
  }
}
