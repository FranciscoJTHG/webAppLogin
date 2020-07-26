import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenStoreService } from '../../services/token-store.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(private authSvc: TokenStoreService, private router: Router) { }

    canActivate() {

        const listElement = this.authSvc.getToken();
        const user = listElement.email;

        if (!user) {
            console.log('No esta logueado');
            this.router.navigate(['/']);
            return false;
        }

        return true;
    }

}
