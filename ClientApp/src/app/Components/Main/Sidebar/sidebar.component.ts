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
        this.signalRService.addChannelSetListener()
        this.userState.subscribe(x => this.currentUser = x)
        this.appState.subscribe(x => this.currentState = x)
        // this.signalRService.updateChannelSet()
        this.firebaseService.getAllChannels()
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
        this.firebaseService.deleteChannel(channel)
        this.signalRService.updateChannelSet()  
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
        this.signalRService.updateChannelSet()
        this.changeChannel(newChannel)
        this.flipModal()
    }

    changeChannel(channel: ChannelModel) {
        this.store.dispatch(new ClearCurrentMessages([]))
        this.store.dispatch(new ChangeCurrentChannel(channel))
        this.signalRService.joinChannel(channel.name)
        this.firebaseService.readMessages(channel.name)
    }

    ngOnInit() {
        setTimeout(() => {
            this.changeChannel(this.currentState.channelSet[0])
        }, 1000)
     }
}