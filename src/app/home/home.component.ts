import { Component } from '@angular/core';
import { User } from '../_models/user';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  // styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  user: User;
  // gets the current logged in user from the account service and makes it available to the template via the user object property
  constructor(private accountService: AccountService) {
    this.user = this.accountService.userValue;
   }

}
