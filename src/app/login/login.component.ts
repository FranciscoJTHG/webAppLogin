import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormGroup, FormBuilder, Validators, ValidationErrors } from '@angular/forms';
import { LoginService } from '../services/login.service';
import { TokenStoreService } from '../services/token-store.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    /* email: string;
    password: string; */
    errorMessage: string;

    public formLogin: FormGroup;

    constructor( private formBuilder: FormBuilder, public loginService: LoginService, public tokenStoreService: TokenStoreService, public router: Router ) { }

    public ngOnInit () {
        this.buildForm();
    }

    private buildForm () {
        // const emailPattern: any = '/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i';
        const minPassLength = 4;

        this.formLogin = this.formBuilder.group({
            email: ['', [
                Validators.required,
                Validators.email
            ]],
            password: ['', [
                Validators.required,
                Validators.minLength(minPassLength),
                // this.validatePassword
            ]]
        });
    }

    /* private validatePassword(control: AbstractControl): ValidationErrors | null {
        const password = control.value;
        let error = null;

        if (!password.includes('$')) {
            error = { ...error, dollar: 'needs a dollar symbol' };
        }

        if (!parseFloat(password[0])) {
            error = { ...error, number: 'must start with a number' };
        }
        return error;
    } */

    public getError(controlName: string): ValidationErrors | null {

        let error = null;
        const control = this.formLogin.get(controlName);

        if ( control.touched && control.errors != null ) {

            if (control.errors.required && controlName == 'email') {
                error = 'El correo electronido es requerido';
            } else if (control.errors.email) {
                error = 'El correo es invalido';
            }

            if (control.errors.required && controlName == 'password') {
                error = 'El password es requerido';
            } else if (control.errors.minlength) {
                error = 'EL password es de min 4 caracteres';
            }
        }

        return error;
    }

    /* login (user: object) {
        const user = {email: this.email, password: this.password};
        this.loginService.login(user).subscribe( data  => {
            console.log(data);
            https://la.spankbang.com/

        })
    } */

    public onSubmit () {
        if (this.formLogin.valid) {
            const user = this.formLogin.value;
            this.loginService.login(user).subscribe( data => {
                console.log(data);

                this.tokenStoreService.setToken(data.sessionTokenBck, data.userRole.userRole, data.email);
                this.router.navigateByUrl('/home');
            },
            err => {
                console.error('')
                this.errorMessage = err.error;
                // this.reloadPage(1000);
                // this.formLogin.reset();
            });
        } else {
            alert('Invalid');
        }
    }

    public reloadPage(time) {
        setTimeout(function () {
            window.location.reload();
        }, time);
    }

    public ocultar (span, property) {
        // onclick="this.parentElement.style.display='none';"
        span.parentElement.style.display = property;
        // this.reloadPage(1000);
    }

}
