import {AfterViewInit, ChangeDetectorRef, Component, Input, OnInit, ViewChild} from '@angular/core';
import {FriendsService} from '../../../services/friends/friends.service';
import {MessagesService} from '../../../services/messages/messages.service';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent implements OnInit, AfterViewInit {

  @Input() user;
  @ViewChild('windowDiv') chatWindow;

  public friends: any[];
  public selectedFriend;
  public placeholder = 'Insert message...';
  public messages: any[];
  public inputMessage;


  constructor(
    private friendsService: FriendsService,
    private messagesService: MessagesService,
    private cdr: ChangeDetectorRef
    ) {
    this.friends = this.friendsService.getFriends();
    this.selectedFriend = this.friends[0];
    this.messages = this.messagesService.getMessages();
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    const windowDomElement = this.chatWindow.nativeElement;
    windowDomElement.scrollTop = windowDomElement.scrollHeight;
  }

  public selectFriend(friend) {
    this.selectedFriend = friend;
  }

  public addMessage() {
    this.messages.push({
      sender: this.user.name,
      receiver: this.selectedFriend,
      message: this.inputMessage
    });

    this.inputMessage = '';
    this.cdr.detectChanges();
    const windowDomElement = this.chatWindow.nativeElement;
    windowDomElement.scrollTop = windowDomElement.scrollHeight;
  }

}
