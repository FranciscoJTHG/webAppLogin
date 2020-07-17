import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { Login } from '../models/login.model';


const AUTH_API = " https://dev.tuten.cl/TutenREST/rest/user/testapis%40tuten.cl";

/* const httpOptions = {
    headers: new HttpHeaders(
        {'Content-Type': 'application/json', 'app': 'APP_BCK'}
    )
}; */

@Injectable({
    providedIn: 'root'
})
export class LoginService {

    constructor( private http: HttpClient, private cookies: CookieService) { }

    login (user: Login): Observable<any> {
        return this.http.put(AUTH_API, {email: user.email}, {
            headers: new HttpHeaders(
                {'Content-Type': 'application/json', 'password': user.password, 'app': 'APP_BCK'}
            )
        });
    }
}
