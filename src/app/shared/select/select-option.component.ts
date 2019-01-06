import { Component, Input } from '@angular/core';
import { SelectComponent } from './select.component';

@Component({
    selector: 'app-select-option',
    templateUrl: './select-option.component.html',
    styleUrls: ['./select-option.component.scss']
})
export class SelectOptionComponent {
    @Input() value;
    @Input() key;

    constructor(
        private selectComponent: SelectComponent
    ) {}

    ngOnInit() {
        this.selectComponent.addOption(this);
    }

    onClick() {
        this.selectComponent.select({key: this.key, value: this.value});
    }
}