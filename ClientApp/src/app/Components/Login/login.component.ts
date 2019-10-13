import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { FirebaseService } from 'src/app/Services/firebase.service'

@Component({
    selector: 'app-login',
    templateUrl: 'login.component.html',
    styleUrls: ['./login.component.css'],
    providers: [FirebaseService]
})
export class LoginComponent implements OnInit {
    constructor(public firebaseService: FirebaseService, private router: Router) { }

    username: string
    password: string

    googleLogin() {
        console.log('test')
        this.firebaseService.googleLogin()
            .then(() => this.router.navigate(['chat']))
    }

    ngOnInit() { }
}