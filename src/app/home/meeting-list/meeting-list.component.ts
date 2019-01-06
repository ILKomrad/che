import { Component } from '@angular/core';

import { Meeting } from '../../shared/models/meeting';
import { MeetingService } from './meeting.service';

@Component({
    selector: 'app-meeting-list',
    templateUrl: './meeting-list.component.html',
    styleUrls: ['./meeting-list.component.scss']
})
export class MeetingListComponent {
    meeting;

    constructor(
        private meetingService: MeetingService
    ) {}

    ngOnInit() {
        this.meetingService.getMeeting()
        .subscribe((meeting: Meeting[]) => {
            console.log( 'meeting', meeting );
            this.meeting = meeting;
        });

        this.meetingService.newMeetingAdded()
        .subscribe(meeting => {
            console.log( 'newMeetingAdded', meeting );
            this.meeting.push(new Meeting(
                meeting.id, 
                meeting.games,
                0,
                meeting.type,
                meeting.score
            ));
        })
    }

    onSelect(data) {
        console.log( data );
    }
}