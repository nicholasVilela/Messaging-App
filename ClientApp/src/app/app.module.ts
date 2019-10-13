import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';

import {NgxsModule} from '@ngxs/store'
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin'
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin'
import { AppState } from './State/app.state';
import { UserState } from './State/user.state';
import { AngularFireModule } from '@angular/fire';
import { firebaseConfig } from './Config/firebase.config';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { ChatComponent } from './Components/Main/Chat/chat.component';
import { HeaderComponent } from './Components/Main/Header/header.component';
import { MainComponent } from './Components/Main/main.component';
import { SidebarComponent } from './Components/Main/Sidebar/sidebar.component';
import { FirebaseService } from './Services/firebase.service';
import { SignalRService } from './Services/signalR.service';
import { LoginComponent } from './Components/Login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    ChatComponent,
    HeaderComponent,
    MainComponent,
    SidebarComponent,
    LoginComponent
  ],
  imports: [
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireModule,
    AngularFireAuthModule,
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    NgxsModule.forRoot([
      AppState,
      UserState
    ]),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    NgxsLoggerPluginModule.forRoot(),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: 'chat', component: MainComponent, pathMatch: 'full'},
      { path: 'login', component: LoginComponent, pathMatch: 'full'}
    ])
  ],
  providers: [FirebaseService, SignalRService],
  bootstrap: [AppComponent]
})
export class AppModule { }
