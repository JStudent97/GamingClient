"use strict";
const fs = require('fs');
const privateKeys = require('./config/privateKeys');


class GamesHandler {

  allGames;

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
      }

      // write object to file
      fs.writeFileSync("./backendEndpoint/ownedGamesDetails.json", JSON.stringify(appIdToGameDetail), "utf-8");

      this.allGames = appIdToGameDetail;
    }

    return this.allGames;
  }

}

module.exports = GamesHandler;

