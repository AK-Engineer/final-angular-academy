import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { LayoutComponent } from './layout/layout.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { EditComponent } from './edit/edit.component';

@NgModule({
  // which other angular modules are required by this module
    imports: [
        CommonModule,
        ReactiveFormsModule,
        AccountRoutingModule,
        MDBBootstrapModule.forRoot()
    ],
    // which components belong to this module
    declarations: [
        LayoutComponent,
        LoginComponent,
        RegisterComponent,
        EditComponent
    ]
})
export class AccountModule { }
