import {AfterViewInit, ChangeDetectorRef, Component, Input, OnInit, ViewChild} from '@angular/core';
import {FriendsService} from '../../../services/friends/friends.service';
import {MessagesService} from '../../../services/messages/messages.service';

declare var electron:any;
@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent implements OnInit, AfterViewInit {

  @Input() user;
  @ViewChild('windowDiv') chatWindow;

  public friends: any[];
  public friendToBe;
  public selectedFriend;
  public placeholder = 'Insert message...';
  public messages: any[];
  public inputMessage;
  public incomingFriendRequests: any;


  constructor(
    private friendsService: FriendsService,
    private messagesService: MessagesService,
    private cdr: ChangeDetectorRef
    ) {
    electron.ipcRenderer.on('reload-messages', () => {
      this.messages = this.messagesService.getMessages(this.user.name, this.selectedFriend);
      console.log(this.messages);
      this.cdr.detectChanges();
      const windowDomElement = this.chatWindow.nativeElement;
      windowDomElement.scrollTop = windowDomElement.scrollHeight;
    })
  }

  ngOnInit(): void {
    this.incomingFriendRequests = this.friendsService.getIncomingFriendRequests(this.user.name);
    this.friends = this.friendsService.getFriends(this.user.name);
    this.selectedFriend = this.friends[0];
    this.messages = this.messagesService.getMessages(this.user.name, this.selectedFriend);
  }

  ngAfterViewInit(): void {
    const windowDomElement = this.chatWindow.nativeElement;
    windowDomElement.scrollTop = windowDomElement.scrollHeight;
  }

  public selectFriend(friend) {
    this.selectedFriend = friend;
    this.messages = this.messagesService.getMessages(this.user.name, this.selectedFriend);
    this.cdr.detectChanges();
  }

  public addMessage() {
    const message = {
      sender: this.user.name,
      receiver: this.selectedFriend,
      message: this.inputMessage
    };

    // update the interface
    this.inputMessage = '';
    this.cdr.detectChanges();
    const windowDomElement = this.chatWindow.nativeElement;
    windowDomElement.scrollTop = windowDomElement.scrollHeight;

    // send message to backend
    this.messagesService.sendMessage(message);
  }

  public sendFriendRequest() {
    this.friendsService.sendFriendRequest(this.user.name, this.friendToBe);
    this.friendToBe = '';
  }

  public acceptFriendRequest(sender, recipient) {
    this.incomingFriendRequests.incomingFriendRequest = false;
    this.friendsService.acceptFriendRequest(sender, recipient);
  }

  public denyFriendRequest(sender, recipient) {
    this.incomingFriendRequests.incomingFriendRequest = false;
    this.friendsService.denyFriendRequest(sender, recipient);
  }

}
