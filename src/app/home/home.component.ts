import { Component, OnInit, ViewChild } from '@angular/core';
import { TokenStoreService } from '../services/token-store.service';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

export interface ListadoElement {
    email: string;
    token: string;
    app: string;
}

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

    displayedColumns: string[];
    dataSource: any;

    constructor(public tokenStoreService: TokenStoreService, public router: Router) { }

    @ViewChild(MatSort, { static: true }) sort: MatSort;

    user = this.tokenStoreService.getToken().user;

    ngOnInit() {
        this.listado();
    }

    private listado() {
        const listElement = this.tokenStoreService.getToken();
        const token = listElement.token;
        const email = listElement.email;
        const app = 'APP_BCK';
        const user = listElement.user;

        this.tokenStoreService.obtenerListado(email, token, app).subscribe(data => {
            this.displayedColumns = ['bookingId', 'tutenUserClient', 'bookingTime', 'locationId', 'bookingPrice'];
            this.dataSource = new MatTableDataSource(data);
            this.sort.sort({ id: 'bookingId', start: 'asc', disableClear: false });
            this.dataSource.sort = this.sort;
        },
            err => {
                console.log(err);
            });
    }

    logout() {
        this.tokenStoreService.logout();
        this.router.navigateByUrl('/');
    }

}
