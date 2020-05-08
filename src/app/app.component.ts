import { Component } from '@angular/core';

declare var electron: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'electron-angular-demo';

  constructor() {
    const result = electron.ipcRenderer.sendSync('ping', {message: 'pong', b: 'info'});

    console.log(result);

  }
}
