import { Component, OnInit } from '@angular/core';
import {GamesService} from '../../../services/games/games.service';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.css']
})
export class LibraryComponent implements OnInit {

  public games: any[];

  constructor(private gamesService: GamesService) {
    this.games = this.gamesService.getInstalledGames();
  }

  ngOnInit(): void {
  }

}
