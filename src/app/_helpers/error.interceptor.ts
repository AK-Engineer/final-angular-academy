//intercepts http responses from the api to check if there were any errors
import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AccountService } from '../_services/account.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private accountService: AccountService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
          //If there is a 401 Unauthorized or 403 Forbidden response the user is automatically logged out of the application
            if ([401, 403].includes(err.status) && this.accountService.userValue) {
                // auto logout if 401 or 403 response returned from api
                this.accountService.logout();
            }
            //all other errors are re-thrown up to the calling service so an alert with the error can be displayed on the screen
            const error = err.error?.message || err.statusText;
            console.error(err);
            return throwError(error);
        }))
    }
}
