import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogMatComponent } from './dialog-mat.component';



@NgModule({
    declarations: [
        DialogMatComponent
    ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ],
    imports: [
        CommonModule,
    ]
})
export class DialogMatModule { }
