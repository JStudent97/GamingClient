import {Component, Input, OnInit} from '@angular/core';
import {AppStateService} from '../../../services/applicationState/app-state.service';
import {Game} from '../../../classes/Game/game';
import {GamesService} from '../../../services/games/games.service';

@Component({
  selector: 'app-inside-root',
  templateUrl: './inside-root.component.html',
  styleUrls: ['./inside-root.component.css']
})
export class InsideRootComponent implements OnInit {

  // TODO: creat type User
  @Input() user: any;
  game: Game;

  constructor(private appStateService: AppStateService,
              private gamesService: GamesService
  ) {
    this.gamesService.accessGame$.subscribe((game: Game) => {
      this.accessGameDetails(game);
    });
  }

  ngOnInit(): void {
  }

  private accessGameDetails(game: Game) {
    this.game = game;
  }

  private setUser(user) {
    this.user = user;
  }

  public isUserInStore(): boolean {
    return this.appStateService.isUserInStore();
  }

  public isUserInLibrary(): boolean {
    return this.appStateService.isUserInLibrary();
  }

  public isUserInFriends(): boolean {
    return this.appStateService.isUserInFriends();
  }

  public isUserInGameDetailsPage(): boolean {
    return this.appStateService.isUserInGameDetailsPage();
  }

}
