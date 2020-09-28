import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { User } from '../user';
import { UserService } from '../user.service';
import { userActionTypes, usersLoaded } from './../store/user.actions';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {

  id: number;
  user: User;
  public updateForm: FormGroup;
  loading = false;
  // courses$: Observable<Course[]>;

  userToBeUpdated: User;

  isUpdateActivated = false;
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private store: Store)
    { }

  ngOnInit() {

    this.updateForm = this.fb.group({
      userName: [{ value: '', disabled: true }, [Validators.required]],
      // userName: ['', [Validators.required]],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      contactNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      emailId: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]],
      address: ['', [Validators.required]]
    });
    // this.loading = true;
    this.id = this.route.snapshot.params['id'];
    this.userService.getUser(this.id)
      .subscribe(userData => {
        console.log('****** data ', userData);
        this.updateForm.patchValue(userData);
        this.userToBeUpdated = {...userData};
        this.loading = false;
        console.log('****** this.updateForm ', this.updateForm);
        console.log('****** this.userToBeUpdated ', this.userToBeUpdated);
      }, error => console.log(error));
    // this.userToBeUpdated = {...this.updateForm};
  }

  get updateFormFn(): any { return this.updateForm.controls; }

  updateUser(updateForm) {
    console.log('****** this.userToBeUpdated ', this.userToBeUpdated);
    const update: Update<User> = {
      id: this.id,
      changes: {
        ...this.userToBeUpdated,
        ...updateForm.value
      }
    };
    console.log('****** inside component user ', update);
    this.store.dispatch(userActionTypes.updateUser({update}));

    this.isUpdateActivated = false;
    this.userToBeUpdated = null;
  }

  onSubmit() {
    this.updateUser(this.updateForm);
  }

  gotoList() {
    this.router.navigate(['/users']);
  }
}
