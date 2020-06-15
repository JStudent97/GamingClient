import { Injectable } from '@angular/core';

declare var electron:any;

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  private messages: any[] = [];

  constructor() {
    this.updateMessages();
  }

  private updateMessages() {
    const messageRecords = electron.ipcRenderer.sendSync('get-messages');
    const newMessages = [];
    for(const messageRecord of messageRecords) {
      newMessages.push({
        sender: messageRecord._doc.sender,
        receiver: messageRecord._doc.receiver,
        message: messageRecord._doc.message
      });
    }

    this.messages = newMessages;
  }

  public getMessages(currentUser, chatPartner): any[] {
    const currentsUserMessages = [];
    this.updateMessages();

    for(let message of this.messages) {
      if((message.sender === currentUser && message.receiver === chatPartner) || (message.sender === chatPartner && message.receiver === currentUser)) {
        currentsUserMessages.push(message);
      }
    }

    return currentsUserMessages;
  }

  public sendMessage(message): void {
    electron.ipcRenderer.sendSync('add-message', message);
  }
}
