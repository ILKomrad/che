import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent {
    login = false;

    constructor(
        private authService: AuthService
    ) {}

    ngOnInit() {
        this.authService.isLogin()
        .subscribe(data => {
            this.login = data;
        });
    }

    logout() {
        this.authService.logout();
    }
}