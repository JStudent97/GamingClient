# ElectronAngularDemo

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.1.4.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.
In order to launch the application on angular's server, without any errors you need to cut any connection to electron and ipc by commenting the following lines:
- in app.component.ts comment the lines 14 and 15 which use electron.
- in src/index.html commend the declaration of electron which is found inside <script> tags (currently) on line 13.  

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## Launch the application in Electron
Run `npm run start:electron` to launch the application with electron. The application will not refresh automatically when you make changes.
