import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
declare const io: any;

@Injectable({
    providedIn: 'root'
})
export class HttpService {
    socket;

    constructor() {
        this.socket = io('http://localhost:3000'); 
    }

    sendMessage(eventName: string, msg: any) {
        this.socket.emit(eventName, msg);
    }

    listen(eventName: string, isPromise = false): any {
        if (isPromise) {
            return new Promise((res, rej) => {
                this.socket
                .on(eventName, (data) => {
                    res(data);
                })
            });
        } else {
            return new Observable(observer => {
                this.socket
                .on(eventName, (data) => {
                    observer.next(data);
                })
            })
        }
    }
}