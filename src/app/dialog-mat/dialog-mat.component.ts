import { Component, Inject, Injectable } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

interface errorMessage {
    errorMessage: string;
}

@Component({
    selector: 'app-dialog-mat',
    templateUrl: './dialog-mat.component.html',
    styleUrls: ['./dialog-mat.component.scss']
})
export class DialogMatComponent {

    constructor(
        public dialogRef: MatDialogRef<DialogMatComponent>,
        @Inject(MAT_DIALOG_DATA) public data: errorMessage) { }

    public closeMe() {
        this.dialogRef.close();
    }
}
