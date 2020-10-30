import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AccountService } from '../../_services/account.service'
import { AlertService } from '../../_services/alert.service';
import { ResponseModelDetails } from 'src/app/_models/response_get_details';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  // styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  form: FormGroup;
  id: string;
  loading = false;
  submitted = false;
  public user: ResponseModelDetails;


  constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private accountService: AccountService,
        private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.id = this.accountService.userValue.id;
    // password not required in edit mode
    const passwordValidators = [Validators.minLength(6)];

    this.form = this.formBuilder.group({
        firstname: ['', Validators.required],
        lastname: ['', Validators.required],
        username: ['', Validators.required],
        password: ['', passwordValidators]
    });

    // GET request
    this.accountService.getAll()
    .pipe(first())
    .subscribe(x => this.form.patchValue(x));
  }

  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }

  onSubmit() {
    this.submitted = true;

    // reset alerts on submit
    this.alertService.clear();

    // stop here if form is invalid
    if (this.form.invalid) {
        return;
    }
    this.loading = true;
    this.updateUser();
  }

  private updateUser() {
    this.accountService.update(this.id, this.form.value)
        .pipe(first())
        .subscribe({
            next: () => {
                this.alertService.success('Update successful', { keepAfterRouteChange: true });
                this.router.navigate(['../../'], { relativeTo: this.route });
            },
            error: error => {
                this.alertService.error(error);
                this.loading = false;
            }
        });
  }

}

