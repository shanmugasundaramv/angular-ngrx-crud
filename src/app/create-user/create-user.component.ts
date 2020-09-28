import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Store } from '@ngrx/store';

import { UserService } from '../user.service';
import { User } from '../user';
import { Subscription } from 'rxjs';
import { createUser } from './../store/user.actions';
import * as uuid from 'uuid';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {

  public signupForm: FormGroup;
  userNameExists = false;
  existingUsers: any;
  userSubscription: Subscription;

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router, private store: Store) {
  }
  ngOnInit() {
      this.signupForm = this.fb.group({
        userName: ['', [Validators.required]],
        firstName: ['', [Validators.required]],
        lastName: ['', [Validators.required]],
        contactNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
        emailId: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]],
        address: ['', [Validators.required]]
    });
  }

  get signupFormFn(): any { return this.signupForm.controls; }

  onSubmit() {
      this.userNameExists = this.userService.checkUser(this.signupForm.value);
      if (!this.userNameExists) {
        this.signupForm.value.uId = uuid.v4();
        const user: User = this.signupForm.value;
        console.log('****** inside component user ', user);
        this.store.dispatch(createUser({user}));
      }
    // }
  }

  gotoList() {
    this.router.navigate(['/users']);
  }

  // ngOnDestroy() {
  //   this.userSubscription.unsubscribe();
  // }
}
