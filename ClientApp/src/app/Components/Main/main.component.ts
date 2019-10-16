import { Component, OnInit } from '@angular/core';
import { SignalRService } from 'src/app/Services/signalR.service';

@Component({
    selector: 'app-main',
    templateUrl: 'main.component.html'
    // providers: [SignalRService]
})

export class MainComponent implements OnInit {
    constructor(
        // public signalRService: SignalRService
    ) { }

    ngOnInit() { 
        // this.signalRService.addListener()
    }
}