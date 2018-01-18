import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { NavbarService } from './navbar.service';
import 'rxjs/add/operator/map'

@Injectable()
export class AuthenticationService {
    constructor(private http: Http,public nav: NavbarService) { }

    login(username: string, password: string) {
        return this.http.post('/users/login', { username: username, password: password })
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let user = response.json();

                if (user[0].email_id.toLowerCase() == username.toLowerCase()) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user[0].user_id));
                    localStorage.setItem('userName',JSON.stringify(user[0].user_name));
                    localStorage.setItem('userRole',JSON.stringify(user[0].role));

                   if(user[0].role == 'user')   
                     this.nav.hide();
                  else
                     this.nav.show();
                }

                return user;
            });
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        localStorage.removeItem('userName');
        localStorage.removeItem('userRole');
        localStorage.removeItem('clickedDevice');
        localStorage.removeItem('clickedItem');
    }
}