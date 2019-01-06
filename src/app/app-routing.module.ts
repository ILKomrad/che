import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

@NgModule({
    imports: [
        RouterModule.forRoot([
            {
                path: '',
                loadChildren: './home/home.module#HomeModule'
            }
        ])
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {}