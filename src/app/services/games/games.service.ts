import { Injectable } from '@angular/core';
import {Game} from '../../classes/Game/game';
import {Subject} from 'rxjs';

declare var electron: any;

@Injectable({
  providedIn: 'root'
})
export class GamesService {

  private games: any[] = [];
  private installedGames: any[] = [];
  private accessGame = new Subject();
  accessGame$ = this.accessGame.asObservable();

  constructor() {
    const gamesData =  electron.ipcRenderer.sendSync('fetch-all-games');
    const installedGames = electron.ipcRenderer.sendSync('fetch-installed-games');

    // add to games property the games from the object gamesData
    this.addFromGamesObjectToArray(gamesData, 'games');

    // add to installedGames property the games from the object installedGames
    this.addFromGamesObjectToArray(installedGames, 'installedGames');
  }

  private addFromGamesObjectToArray(dataObject: object, property: string) {
    for (const appId in dataObject) {
      if (dataObject.hasOwnProperty(appId)) {
        this[property].push(dataObject[appId]);
      }
    }
  }

  public getAllGames() {
    return this.games;
  }

  public getInstalledGames() {
    return this.installedGames;
  }

  public launchGame(name) {
    const result = electron.ipcRenderer.send('launch-game', name);
  }

  public accessGameDetails(game: Game) {
    this.accessGame.next(game);
  }

}
