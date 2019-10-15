import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/Services/firebase.service';
import { SignalRService } from 'src/app/Services/signalR.service';

@Component({
    selector: 'app-header',
    templateUrl: 'header.component.html',
    styleUrls: ['./header.component.css'],
    providers: [FirebaseService, SignalRService]
})

export class HeaderComponent implements OnInit {
    constructor() { }

    ngOnInit() { }
}