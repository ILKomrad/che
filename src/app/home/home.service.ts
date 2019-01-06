import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { map } from 'rxjs/operators';
import { HttpService } from '../shared/http.service';
import { Meeting } from '../shared/models/meeting';

@Injectable()
export class HomeService {
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
}