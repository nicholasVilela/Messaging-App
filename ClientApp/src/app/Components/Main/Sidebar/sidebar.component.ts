import { Component, OnInit } from '@angular/core'
import { UserModel, ChannelModel, AppModel } from 'src/app/Models/app.model'
import { FirebaseService } from 'src/app/Services/firebase.service'
import { SignalRService } from 'src/app/Services/signalR.service'
import { Store, Select } from '@ngxs/store'
import { AppState } from 'src/app/State/app.state'
import { Observable } from 'rxjs'
import { UserState } from 'src/app/State/user.state'
import { ChangeCurrentChannel, ClearCurrentMessages, ClearChannelSet } from 'src/app/Actions/app.actions'

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
        this.store.dispatch(new ClearChannelSet([]))
        this.firebaseService.getAllChannels()
        console.log(this.currentUser)
        console.log(this.currentState)
    }

    currentState: AppModel
    currentUser: UserModel
    showModal: boolean = false
    
    newChannelName: string
    newChannelDesc: string

    flipModal() {
        this.newChannelDesc = ''
        this.newChannelName = ''
        this.showModal = !this.showModal
    }

    deleteChannel(channel: string) {
        console.log(channel)
        this.firebaseService.deleteChannel(channel)
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

    changeChannel(channel: string) {
        this.store.dispatch(new ClearCurrentMessages([]))
        this.signalRService.joinChannel(channel)
        this.store.dispatch(new ChangeCurrentChannel(channel))
        this.firebaseService.readMessages(channel)
    }

    ngOnInit() {
        this.signalRService.joinChannel(this.currentState.channelSet[0].name)
     }
}