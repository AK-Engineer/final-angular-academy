import { Component } from '@angular/core';

import { AccountService } from './_services/account.service';
import { User } from './_models/user';


@Component({
  selector: 'app',
  templateUrl: './app.component.html'
  // styleUrls: ['./app.component.scss']
})
export class AppComponent {
  user: User;


  // Subscribe to user Observable of accountService
  // To Show/Hide the main navbar when user logs in/out
  constructor(private accountService: AccountService) {
    this.accountService.user.subscribe(x => this.user = x);
  }

  //logout link in the main nav bar.logs the user out and redirect to the login page.
  logout() {
    this.accountService.logout();
}

}
