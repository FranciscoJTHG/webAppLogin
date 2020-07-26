import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
// import { Login } from '../models/login.model';


const AUTH_API = "https://dev.tuten.cl/TutenREST/rest/user/contacto%40tuten.cl/bookings?current=true";

@Injectable({
    providedIn: 'root'
})
export class TokenStoreService {

    constructor(private http: HttpClient, private cookies: CookieService) { }

    setToken (token: string, user: string, email: string) {
        this.cookies.set('token', token);
        this.cookies.set('user', user);
        this.cookies.set('email', email);
    }

    getToken () {
        return this.cookies.getAll();
    }

    logout () {
        return this.cookies.deleteAll();
    }

    obtenerListado (email: string, token: string, app: string): Observable<any> {
        return this.http.get(AUTH_API, {
            headers: new HttpHeaders(
                {'Content-Type': 'application/json', 'adminemail': email, 'token': token, 'app': app}
            )
        });
    }
}
