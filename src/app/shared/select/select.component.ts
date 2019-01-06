import { Component, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-select',
    templateUrl: './select.component.html',
    styleUrls: ['./select.component.scss']
})
export class SelectComponent {
    @Output() change = new EventEmitter<string>();

    options = [];
    hide = true;
    title = null;
    value = '';

    addOption(option) {
        this.options.push(option);

        if (this.title === null) {
            this.title = option.key;
            this.value = option.value;
        }
    }

    toggleHide() {
        this.hide = !this.hide;
    }

    select(data) {
        this.title = data.key;
        this.value = data.value;
        this.hide = true;
        this.change.emit(this.value);
    }

    getValue() {
        return this.value;
    }
}