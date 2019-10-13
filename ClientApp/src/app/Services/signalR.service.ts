import { Injectable } from '@angular/core'
import * as signalR from '@microsoft/signalr'
import { AppModel, ChannelModel } from '../Models/app.model'
// import { AddMessageAction } from '../Actions/app.action' 
import { Store, Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { AddMessage } from '../Actions/app.actions';

@Injectable()
export class SignalRService {

    constructor(
        public store: Store) {
            this.createConnection()
            this.addMessageListener()
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

    public addMessageListener() {
        this.connection
            .on('ReceiveMessage', (user: string, message: string) => {
                this.store.dispatch(new AddMessage({
                    user: user,
                    message: message
                }))
            })
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