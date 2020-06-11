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
              private appStateService: AppStateService
  ) {
    this.games = this.gamesService.getAllGames();
  }

  ngOnInit(): void {
  }

  public seeGameDetails(name: string, price: number, imageUri: string, description: string, requirements: string, developers: string[], publishers: string[], availableOnWindows: boolean, availableOnMac: boolean, availableOnLinux: boolean) {
      const game = new Game(name, price, imageUri, description, requirements, developers, publishers, availableOnWindows, availableOnMac, availableOnLinux);
      this.gamesService.accessGameDetails(game);
      this.appStateService.markUserInGameDetailsPage();
  }

}
