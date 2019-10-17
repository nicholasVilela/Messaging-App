import { Injectable } from '@angular/core'
import * as signalR from '@microsoft/signalr'
import { AppModel, ChannelModel } from '../Models/app.model'
import { Store, Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { AddMessage, ClearChannelSet, ChangeChannelSet, ClearCurrentMessages, ChangeCurrentChannel } from '../Actions/app.actions';
import { FirebaseService } from './firebase.service';

@Injectable()
export class SignalRService {

    constructor(
        public store: Store,
        public firebaseService: FirebaseService) {
            this.createConnection()
            this.addListener()
            this.startConnection()
         }

    public connection: signalR.HubConnection
    currentState: AppModel

    public createConnection() {
        this.connection = new signalR.HubConnectionBuilder()
            .withUrl('/chathub')
            .build()
    } 

    public startConnection() {
        this.connection
            .start()
            .then(() => console.log('Connection Started.'))
            .catch(err => console.log('Problem starting the connection... ' + err))
    }

    public addListener() {
        this.connection
            .on('ReceiveMessage', (user: string, message: string) => {
                this.store.dispatch(new AddMessage({
                    user: user,
                    message: message
                }))
            })
    }

    public addChannelSetListener() {
        this.connection
            .on('UpdateAllChannelSet', () => {
                this.store.dispatch(new ClearChannelSet([]))
                this.firebaseService.getAllChannels()
            })
    }

    public updateChannelSet() {
        this.connection
            .invoke('UpdateChannelSet')
            .then(() => console.log('Updated channel set'))
            .catch(err => console.log(err))
    }

    public updateCurrentChannel(channel: string) {
        this.connection
            .invoke('UpdateCurrentChannel', channel)
            .then(() => console.log('Updated'))
            .catch(err => console.log(err))
    }

    public addGroupCurrentChannelListener() {
        this.connection 
            .on('UpdateGroupCurrentChannel', () => {
                console.log('this is the first thing but not the next thing.')
                this.store.dispatch(new ClearCurrentMessages([]))
                this.store.dispatch(new ChangeCurrentChannel({
                    name: null,
                    description: null,
                    messages: null,
                    adminUID: null,
                    adminName: null
                }))
                console.log('did a thing.')
            })

        console.log('did another thing but not the last thing.')
    }
 
    public sendChannelMessage(channel: string, user: string, message: string) {
        this.connection
            .invoke('SendChannelMessage', channel, user, message)
            .then(() => console.log('Sent Message'))
            .catch(err => console.log(err))
    }

    public joinChannel(channel: string) {
        this.connection
            .invoke('JoinChannel', channel)
            .then(() => console.log('Joined ' + channel))
            .catch(err => console.log('there was a problem joining the channel... ' + err))
    }

    public leaveChannel(channel: string) {
        this.connection
            .invoke('LeaveChannel', channel)
            .then(() => console.log('Left channel.'))
            .catch(err => console.log(err))
    }
}