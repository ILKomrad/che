import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectComponent } from './select/select.component';
import { SelectOptionComponent } from './select/select-option.component';

@NgModule({
    imports: [CommonModule],
    declarations: [
        SelectComponent,
        SelectOptionComponent
    ],
    exports: [
        SelectComponent,
        SelectOptionComponent
    ]
})
export class SharedModule {}