import { Injectable } from '@angular/core';
import {Game} from '../../classes/Game/game';
import {Subject} from 'rxjs';

declare var electron: any;

@Injectable({
  providedIn: 'root'
})
export class GamesService {

  private games: any[] = [];
  private accessGame = new Subject();
  accessGame$ = this.accessGame.asObservable();

  constructor() {
    const gamesData =  electron.ipcRenderer.sendSync('fetch-all-games');
    for (const appId in gamesData) {
      if (gamesData.hasOwnProperty(appId)) {
        this.games.push(gamesData[appId]);
      }
    }
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
