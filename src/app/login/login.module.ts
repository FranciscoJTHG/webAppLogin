import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './../material.module';
import { HttpClientModule } from '@angular/common/http';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { CookieService } from 'ngx-cookie-service';
// import { AlertModule } from 'alert-notification';
/* import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSliderModule } from '@angular/material/slider'; */

@NgModule({
    declarations: [
        LoginComponent
    ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ],
    imports: [
        CommonModule,
        LoginRoutingModule,
        ReactiveFormsModule,
        MaterialModule,
        HttpClientModule,
        // AlertModule
        /* MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatSliderModule */
    ],
    exports: [
        LoginComponent
    ],
    providers: [
        CookieService
    ]
})
export class LoginModule { }
