import { areUsersLoaded } from './user.selectors';
import { loadUsers, usersLoaded } from './user.actions';
// import { AppState } from './../../store/reducers/index';
import { User } from '../user';
import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import { Observable } from 'rxjs';
import {select, Store} from '@ngrx/store';
import {filter, finalize, first, tap} from 'rxjs/operators';
console.log('****** Resolver ');
@Injectable()
export class UserResolver implements Resolve<Observable<any>> {

  constructor(private store: Store) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    console.log('****** Inside Rseolver');
    return this.store
    .pipe(
        select(areUsersLoaded),
        tap((usersLoaded) => {
          console.log('****** usersLoaded ', usersLoaded);
          if (!usersLoaded) {
            console.log('****** loadUsers()', usersLoaded);
            this.store.dispatch(loadUsers());
          }

        }),
        filter(usersLoaded => usersLoaded),
        first()
    );
  }
}
