"use strict";
const fs = require('fs');
const exec = require('child_process').execFile;
const privateKeys = require('./config/privateKeys');


class GamesHandler {

  allGames;
  installedGames = [];

  constructor(){}

  async getSteamOwnedGames() {

    // check if file exists and take the games from there
    if (fs.existsSync("./backendEndpoint/ownedGames.json")) {

      const data = await fs.readFileSync("./backendEndpoint/ownedGames.json", "utf-8");
      return JSON.parse(data).response.games;

    } else {

      // steam-api fetch games
      const response = await fetch(`http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${privateKeys.steamApiKey}&include_appinfo=true&steamid=${privateKeys.steamUserId}&format=json`)
      const json = await response.json();

      // write games to file
      fs.writeFileSync("./backendEndpoint/ownedGames.json", JSON.stringify(json), "utf-8");
      return json;

    }
  }

  async getGamesDetails() {

    const appIdToGameDetail = {};

    // check if file exists and take the games from there
    if (fs.existsSync("./backendEndpoint/ownedGamesDetails.json")) {

      const data = fs.readFileSync("./backendEndpoint/ownedGamesDetails.json", "utf-8");
      this.allGames = JSON.parse(data);

    } else {

      // for each game from this.getSteamOwnedGames call api to get it's details
      const steamOwnedGames = await this.getSteamOwnedGames();

      for (let game of steamOwnedGames.response.games) {
        const appId = game.appid;
        const response = await fetch(`https://store.steampowered.com/api/appdetails?appids=${appId}`);
        const json = await response.json();
        appIdToGameDetail[appId] = json[appId].data;
        appIdToGameDetail[appId].playtime = game.playtime_forever;
      }

      // write object to file
      fs.writeFileSync("./backendEndpoint/ownedGamesDetails.json", JSON.stringify(appIdToGameDetail), "utf-8");

      this.allGames = appIdToGameDetail;
    }

    return this.allGames;
  }

  launchGame(gameName) {
    const parsedName = gameName.replace(/:/g, '');
    const installedGamesDefaultDirectory = 'D:\\NonWork\\SteamGames\\steamapps\\common';
    const gameToLaunchPath = `${installedGamesDefaultDirectory}\\${parsedName}`;

    if (fs.existsSync(gameToLaunchPath)) {

      // read files inside game directory
      const dirs = fs.readdirSync(gameToLaunchPath);

      // filter the .exe files
      const exeFiles = dirs.filter( (file) => file.includes('.exe'));

      // launch game
      if (exeFiles.length > 1) {

        console.log(`launching game..`);
        console.log(`${gameToLaunchPath}\\${exeFiles[exeFiles.length - 1]}`);
        exec(`${gameToLaunchPath}\\${exeFiles[exeFiles.length - 1]}`);

      } else {

        console.log(`launching game..`);
        console.log(`${gameToLaunchPath}\\${exeFiles[0]}`);
        exec(`${gameToLaunchPath}\\${exeFiles[0]}`);

      }
    } else {
      console.log('invalid path');
    }
  }

  getInstalledGames() {
    // path of steam games
    const steamGamesPath = 'D:\\NonWork\\SteamGames\\steamapps\\common\\';

    // check installed games
    const games = fs.readdirSync(steamGamesPath);

    // from all available games, take only the ones found in pc
    for (const appid in this.allGames) {
      if(this.allGames.hasOwnProperty(appid)) {
        if (games.includes(this.allGames[appid].name.replace(/:/g, ''))) {
          this.installedGames.push(this.allGames[appid]);
        }
      }
    }

    return this.installedGames;
  }

}

module.exports = GamesHandler;

