import { Component, OnInit } from '@angular/core';
import { GamesService } from '../../../services/games/games.service';
import { Game } from '../../../classes/Game/game';
import {AppStateService} from '../../../services/applicationState/app-state.service';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent implements OnInit {

  public games: any[];

  constructor(private gamesService: GamesService,
              private appStateService: AppStateService) {
    this.games = this.gamesService.getAllGames();
  }

  ngOnInit(): void {
  }

  public seeGameDetails(title: string, price: number, imagePath: string) {
      const game = new Game(title, price, imagePath);
      this.gamesService.accessGameDetails(game);
      this.appStateService.markUserInGameDetailsPage();
  }

}
