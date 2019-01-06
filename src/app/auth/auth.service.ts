import { Injectable, EventEmitter } from '@angular/core';
import { HttpService } from '../shared/http.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, of } from 'rxjs';
import { User } from '../shared/models/User';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    user: User;
    loginAction$ = new EventEmitter<any>();

    constructor(
        private http: HttpService,
        public jwtHelper: JwtHelperService
    ) {}

    getUser() {
        return this.user;
    }

    setUser(user) {
        this.user = user;
    }

    login(email, password) {
        this.http.sendMessage('auth', {
            email, password
        });

        return new Promise((res, rej) => {
            const p = this.http.listen('authResult')
            .subscribe((data: any) => {
                if (data.error) {
                    rej(data.error);
                } else {
                    localStorage.setItem('access_token', data.token);
                    this.setUser(data.user);
                    this.loginAction$.emit(true);
                    res(data);
                    console.log('login', data.user);
                }

                p.unsubscribe();
            })
        });
    }

    isLogin(): Observable<any> {
        return new Observable(obs => {
            this.checkLogin()
            .then((data: any) => {
                console.log( 'isLogin', data );
                if (!data) {
                    obs.next(false);
                } else if (data.error) {
                    console.log(data.error.message);
                    obs.next(false);
                    this.logout();
                } else {
                    this.setUser(data.user);
                    obs.next(true);
                }
            });

            this.loginAction$.subscribe(data => {
                obs.next(data);
            });
        });
    }

    checkLogin(): Promise<any> {
        const token = this.getToken();

        if (!token) { return Promise.resolve(false); }

        this.http.sendMessage('checkAuth', {
            token
        });

        return this.http.listen('authResult', true);
    }

    logout() {
        localStorage.removeItem('access_token');
        this.loginAction$.emit(false);
    }

    checkIn(data) {
        this.http.sendMessage('checkIn', data);

        return this.http.listen('checkInResult', true);
    }

    getToken() {
        return localStorage.getItem( 'access_token');
    }
}