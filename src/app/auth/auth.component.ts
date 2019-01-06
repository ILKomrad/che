import { Component, ViewChild, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { AuthService } from './auth.service';
import { SelectComponent } from '../shared/select/select.component';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.scss']
})
export class AuthComponent {
    authForm: FormGroup;
    state = 'login';

    @Output() formSubmit = new EventEmitter<boolean>();
    @ViewChild(SelectComponent) private selectComponent: SelectComponent;

    constructor(
        private authService: AuthService,
        private fb: FormBuilder
    ) {}

    ngOnInit() {
        this.authForm = this.fb.group({
            name: ['', Validators.required],
            password: ['', Validators.required],
            email: ['', Validators.required]
        })
    }

    get title() {
        if (this.state === 'reg') {
            return 'Зарегистрироваться';
        } else {
            return 'АВТОРИЗОВАТЬСЯ';
        }
    }

    get stateAlias() {
        if (this.state === 'reg') {
            return 'Авторизация';
        } else {
            return 'Регистрация';
        }
    }

    get btnTitle() {
        if (this.state === 'reg') {
            return 'Зарегистрироваться';
        } else {
            return 'АВТОРИЗОВАТЬСЯ';
        }
    }

    toggleState() {
        if (this.state === 'reg') {
            this.state = 'login';
        } else {
            this.state = 'reg';
        }

        this.resetForm();
    }

    resetForm() {
        this.authForm.patchValue({
            name: '',
            password: '',
            email: ''
        });
    }

    checkIn(password, email) {
        const category = this.selectComponent.value,
            name = this.authForm.get('name').value;
        this.authService.checkIn({name, password, category, email})
        .then(result => {
            if (result === true) {
                console.log('registration completed successfully');
                this.resetForm();
                this.state = 'login';
            } else {
                console.log(result);
            }
        });
    }

    login(password, email) {
        this.authService.login(email, password)
        .then(d => {
            this.formSubmit.emit(true);
            this.resetForm();
        })
        .catch(error => {
            console.log(error);
        })
    }

    onSubmit() {
        const password = this.authForm.get('password').value,
            email = this.authForm.get('email').value;
    
        if (this.state === 'login') {
            this.login(password, email);
        } else {
            this.checkIn(password, email);
        }
    }
}