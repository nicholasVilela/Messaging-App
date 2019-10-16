import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/Services/firebase.service';
import { SignalRService } from 'src/app/Services/signalR.service';
import { Select, Store } from '@ngxs/store';
import { AppState } from 'src/app/State/app.state';
import { Observable } from 'rxjs';
import { AppModel } from 'src/app/Models/app.model';

@Component({
    selector: 'app-header',
    templateUrl: 'header.component.html',
    styleUrls: ['./header.component.css'],
    // providers: [FirebaseService, SignalRService]
})

export class HeaderComponent implements OnInit {
    @Select(AppState.getState) appState: Observable<AppModel>
    constructor(
        private store: Store
    ) {
        this.appState.subscribe(x => this.currentState = x)
    }

    currentState: AppModel

    ngOnInit() { }
}