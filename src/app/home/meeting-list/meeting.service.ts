import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { HttpService } from '../../shared/http.service';
import { Meeting } from '../../shared/models/meeting';
import { User } from '../../shared/models/User';

@Injectable({
    providedIn: 'root'
})
export class MeetingService {
    constructor(
        private http: HttpService
    ) {}

    getMeeting(): Observable<Meeting[]> {
        this.http.sendMessage('getMeeting', {});

        return this.http.listen('hello')
        .pipe(
            map((result: any) => {
              const data = JSON.parse(result);
              data.forEach(item => {
                item.score = JSON.parse(item.score);
                item.games = JSON.parse(item.games);
              });
              
              return data;
            })
        )
    }

    addMeeting(gameType: string, token: string) {
        this.http.sendMessage('newMeeting', {gameType, token});

        return this.http.listen('meetingAdded', true);
    }

    newMeetingAdded() {
        return this.http.listen('newMeetingAdded');
    }
}