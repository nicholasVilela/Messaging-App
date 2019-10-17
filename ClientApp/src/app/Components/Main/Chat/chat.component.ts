import { Component, OnInit } from '@angular/core';
import { SignalRService } from 'src/app/Services/signalR.service';
import { AppModel, UserModel, ChannelModel } from 'src/app/Models/app.model';
import { FirebaseService } from 'src/app/Services/firebase.service';
import { AppState } from '../../../State/app.state'
import { Store, Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { constructor } from 'q';
import { UserState } from 'src/app/State/user.state';
import { AddMessage } from 'src/app/Actions/app.actions';

@Component({
    selector: 'app-chat',
    templateUrl: 'chat.component.html',
    styleUrls: ['./chat.component.css'],
    providers: [SignalRService, FirebaseService]
})

export class ChatComponent implements OnInit {
    @Select(AppState.getState) appState: Observable<AppModel>
    @Select(UserState.getUser) userState: Observable<UserModel>

    constructor(
        public signalRService: SignalRService,
        public firebaseService: FirebaseService,
        private store: Store
    ) { 
        
        this.appState.subscribe(x => this.currentState = x)
        this.userState.subscribe(x => this.currentUser = x)
    }

    currentState: AppModel
    currentUser: UserModel
    message: string

    sendMessage() {
        this.getState()
        this.signalRService.sendChannelMessage(this.currentState.currentChannel.name, this.currentUser.displayName, this.message)
        this.firebaseService.addMessage(this.currentState.currentChannel.name, this.currentUser.displayName, this.message)
        this.message = ''
    }

    getState() {
        this.appState.subscribe(x => this.currentState = x)
        this.userState.subscribe(x => this.currentUser = x)
    }

    ngOnInit() { 
        this.firebaseService.readMessages(this.currentState.channelSet[0].name)
    }
}