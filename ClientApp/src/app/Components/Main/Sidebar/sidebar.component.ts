import { Component, OnInit } from '@angular/core'
import { UserModel, ChannelModel, AppModel } from 'src/app/Models/app.model'
import { FirebaseService } from 'src/app/Services/firebase.service'
import { SignalRService } from 'src/app/Services/signalR.service'
import { Store, Select } from '@ngxs/store'
import { AppState } from 'src/app/State/app.state'
import { Observable } from 'rxjs'
import { UserState } from 'src/app/State/user.state'
import { ChangeCurrentChannel } from 'src/app/Actions/app.actions'

@Component({
    selector: 'app-sidebar',
    templateUrl: 'sidebar.component.html',
    styleUrls: ['./sidebar.component.css'],
    providers: [FirebaseService, SignalRService]
})

export class SidebarComponent implements OnInit {
    @Select(AppState.getState) appState: Observable<AppModel>
    @Select(UserState.getUser) userState: Observable<UserModel>
    constructor(
        private store: Store,
        public signalRService: SignalRService,
        public firebaseService: FirebaseService,
    ) { 
        this.userState.subscribe(x => this.currentUser = x)
        this.appState.subscribe(x => this.currentState = x)
        console.log(this.currentUser)
        console.log(this.currentState)
    }

    currentState: AppModel
    currentUser: UserModel
    showModal: boolean = false
    
    newChannelName: string
    newChannelDesc: string

    flipModal() {
        this.showModal = !this.showModal
    }

    createChannel() {
        const newChannel: ChannelModel = {
            name: this.newChannelName,
            description: this.newChannelDesc,
            messages: [],
            adminUID: this.currentUser.uid,
            adminName: this.currentUser.displayName
        }

        this.firebaseService.addChannel(newChannel)
        this.firebaseService.getAllChannels()
        this.flipModal()
    }

    changeChannel(channel: ChannelModel) {
        this.signalRService.joinChannel(channel.name)
        this.store.dispatch(new ChangeCurrentChannel(channel))
        this.firebaseService.readMessages(channel.name)
    }

    ngOnInit() {
        this.signalRService.joinChannel(this.currentState.currentChannel.name)
     }
}