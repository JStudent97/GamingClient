import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RootComponent } from './components/root/root.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { SignupPageComponent } from './components/signup-page/signup-page.component';
import { InsideRootComponent } from './components/inside-app/inside-root/inside-root.component';
import { MenuComponent } from './components/inside-app/menu/menu.component';
import { StoreComponent } from './components/inside-app/store/store.component';
import { LibraryComponent } from './components/inside-app/library/library.component';
import { FriendsComponent } from './components/inside-app/friends/friends.component';
import { GamePageComponent } from './components/inside-app/game-page/game-page.component';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    RootComponent,
    LoginPageComponent,
    SignupPageComponent,
    InsideRootComponent,
    MenuComponent,
    StoreComponent,
    LibraryComponent,
    FriendsComponent,
    GamePageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
