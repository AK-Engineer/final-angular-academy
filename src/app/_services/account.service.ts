import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { User } from '../_models/user';
import { ResponseModel } from '../_models/response';
import { ResponseModelDetails } from '../_models/response_get_details';



@Injectable({ providedIn: 'root' })
export class AccountService {
  // RxJS Subjects and Observables are used to store the current user object and notify other components when the user logs in and out of the app.
    private userSubject: BehaviorSubject<User>;
    public user: Observable<User>;

    constructor(
        private router: Router,
        private http: HttpClient
    ) {
        this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')));
        this.user = this.userSubject.asObservable();
    }

    public get userValue(): User {
        return this.userSubject.value;
    }

    login(username, password, rememberMe) {
        return this.http.post<ResponseModel>(`${environment.apiUrl}/users/signin`, { username, password })
            .pipe(tap(user => {
                if(rememberMe){
                  // store user details and jwt token in local storage to keep user logged in between page refreshes
                  localStorage.setItem('user', JSON.stringify(user));
                }else{
                  sessionStorage.setItem('user', JSON.stringify(user));
                }
                const userAuth = new User(user.user.id, user.user.username, user.user.firstname, user.user.lastname, user.jwt);
                this.userSubject.next(userAuth);
            }));
    }

    logout() {
        // remove user from local storage and set current user to null
        localStorage.removeItem('user');
        this.userSubject.next(null);
        this.router.navigate(['/account/login']);
    }

    register(user: User) {
        return this.http.post(`${environment.apiUrl}/users`, user);
    }

    getAll() {
        return this.http.get<ResponseModelDetails>(`${environment.apiUrl}/users/details`);
    }

    update(id, params) {
        return this.http.put(`${environment.apiUrl}/users/`, params)
            .pipe(map(x => {
                // update stored user if the logged in user updated their own record
                if (id == this.userValue.id) {
                    // update local storage
                    const user = { ...this.userValue, ...params };
                    localStorage.setItem('user', JSON.stringify(user));
                    // publish updated user to subscribers
                    this.userSubject.next(user);
                }
                return x;
            }));
    }
}
