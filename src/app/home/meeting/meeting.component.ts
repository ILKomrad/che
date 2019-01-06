import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Meeting } from '../../shared/models/meeting';

@Component({
    selector: 'meeting',
    templateUrl: './meeting.component.html',
    styleUrls: ['./meeting.component.scss']
})
export class MeetingComponent {
    @Input() data: Meeting;
    @Output() selectMeeting = new EventEmitter<any>();

    ngOnChanges() {
        
    }

    startPlay() {
        this.selectMeeting.emit({id: this.data.id});
    }
}