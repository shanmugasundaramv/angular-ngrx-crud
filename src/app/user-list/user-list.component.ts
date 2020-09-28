import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {map, startWith} from 'rxjs/operators';
import {combineLatest, Observable, of} from 'rxjs';
import {FormControl} from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { UserService } from '../user.service';
import { User } from '../user';
import { createUser } from './../store/user.actions';
import { getAllUsers } from './../store/user.selectors';
import { userActionTypes, usersLoaded } from './../store/user.actions';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  loading = false;
  p = 1;
  users$: Observable<User[]>;
  subscription = Subscription;
  filteredUsers$: Observable<User[]>;
  filter: FormControl;
  filter$: Observable<string>;

  constructor(private userService: UserService, private router: Router, private store: Store) {
    this.filter = new FormControl('');
    this.filter$ = this.filter.valueChanges.pipe(startWith(''));
  }

  ngOnInit(): void {
    this.reloadData();
  }

  reloadData(): void {
    this.users$ = this.store.select(getAllUsers);
  }

  deleteUser(userId: string): void {
    console.log('****** delete User ', userId);
    this.store.dispatch(userActionTypes.deleteUser({userId}));
    // this.users$.subscribe(response => console.log('****** response delete ', response));
  }

  userDetails(id: number): void{
    this.router.navigate(['details', id]);
  }

  updateUser(userId: string): void {
    console.log('****** update user ID ', userId);
    this.router.navigate(['update', userId]);
  }

  // ngOnDestroy() {
  //   this.subscription.unsubscribe();
  // }

}
