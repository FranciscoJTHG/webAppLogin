import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormGroup, FormBuilder, Validators, ValidationErrors } from '@angular/forms';
import { LoginService } from '../services/login.service';
import { TokenStoreService } from '../services/token-store.service';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DialogMatComponent } from '../dialog-mat/dialog-mat.component';

interface errorMessage {
    errorMessage: string;
}

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    errorMessage: string;

    public formLogin: FormGroup;

    constructor( private formBuilder: FormBuilder, public loginService: LoginService, public tokenStoreService: TokenStoreService, public router: Router, private  dialog:  MatDialog ) { }

    public ngOnInit () {
        this.buildForm();
    }

    private buildForm () {

        const minPassLength = 4;

        this.formLogin = this.formBuilder.group({
            email: ['', [
                Validators.required,
                Validators.email
            ]],
            password: ['', [
                Validators.required,
                Validators.minLength(minPassLength),
            ]]
        });
    }

    public getError(controlName: string): ValidationErrors | null {

        let error = null;
        const control = this.formLogin.get(controlName);

        if ( control.touched && control.errors != null ) {

            if (control.errors.required && controlName == 'email') {
                error = 'El email electronido es requerido';
            } else if (control.errors.email) {
                error = 'El email es invalido';
            }

            if (control.errors.required && controlName == 'password') {
                error = 'El password es requerido';
            } else if (control.errors.minlength) {
                error = 'EL password es de min 4 caracteres';
            }
        }

        return error;
    }

    public onSubmit () {
        if (this.formLogin.valid) {
            const user = this.formLogin.value;
            this.loginService.login(user).subscribe( data => {
                console.log(data);

                this.tokenStoreService.setToken(data.sessionTokenBck, data.userRole.userRole, data.email);
                this.router.navigateByUrl('/home');
            },
            err => {

                this.errorMessage = err.error;
                this.openDialog(this.errorMessage);
            });
        }
    }

    openDialog(error): void {

        this.dialog.open(DialogMatComponent, {
            data: {
                errorMessage: error
            }
        });
    }

    public reloadPage(time) {
        setTimeout(function () {
            window.location.reload();
        }, time);
    }
}
