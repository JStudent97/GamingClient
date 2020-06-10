import { Injectable } from '@angular/core';
import {Game} from '../../classes/Game/game';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GamesService {

  private games: any[] = [];
  private accessGame = new Subject();
  accessGame$ = this.accessGame.asObservable();

  constructor() {
    for (let i = 0; i <= 10; i++) {
      this.games.push({
        title: 'Some Game',
        price: 320,
        imagePath: './assets/images/fantasy.jpg'
      });
    }

    this.games.push({
      title: 'Some Game1',
      price: 3201,
      imagePath: './assets/images/fantasy.jpg'
    });

    this.games.push({
      title: 'Some Game2',
      price: 3202,
      imagePath: './assets/images/fantasy.jpg'
    });

    this.games.push({
      title: 'Some Game3',
      price: 3203,
      imagePath: './assets/images/fantasy.jpg'
    });
  }

  public getAllGames() {
    return this.games;
  }

  public getInstalledGames() {
    const installedGames: Game[] = [];
    for (let i = 10; i < this.games.length; i++) {
      installedGames.push(this.games[i]);
    }
    return installedGames;
  }

  public accessGameDetails(game: Game) {
    this.accessGame.next(game);
  }

}
