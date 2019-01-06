import { Component, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { SelectComponent } from '../../shared/select/select.component';
import { AuthService } from '../../auth/auth.service';
import { MeetingService } from '../meeting-list/meeting.service';

@Component({
    selector: 'app-game-generator',
    templateUrl: './game-generator.component.html'
})
export class GameGeneratorComponent {
    generatorForm: FormGroup;
    gameType = '';

    @ViewChild(SelectComponent) private selectComponent: SelectComponent;

    constructor(
        private fb: FormBuilder,
        private authService: AuthService,
        private meetingService: MeetingService
    ) {}

    ngOnInit() {
        this.generatorForm = this.fb.group({
            gameType: ''
        });
    }

    ngAfterViewInit() {
        this.setGameType();
    }

    createGame() {
        this.meetingService.addMeeting(this.gameType, this.authService.getToken())
        .then(d => {
            console.log('newMeeting', d);
        })
    }

    setGameType() {
        this.gameType = this.selectComponent.value;
    }
}