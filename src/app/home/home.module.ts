import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { HomeComponent } from './home.component';
import { AuthModule } from '../auth/auth.module';
import { MeetingListComponent } from './meeting-list/meeting-list.component';
import { MeetingComponent } from './meeting/meeting.component';
import { GameGeneratorComponent } from './game-generator/game-generator.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
    declarations: [
        HomeComponent,
        MeetingListComponent,
        MeetingComponent,
        GameGeneratorComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild([
            {
                path: '', 
                component: HomeComponent
            }
        ]),
        ReactiveFormsModule,
        AuthModule,
        SharedModule
    ]
})
export class HomeModule {

}