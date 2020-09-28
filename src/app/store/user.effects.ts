import { userActionTypes, usersLoaded, updateUser } from './user.actions';
import { UserService } from './../user.service';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { concatMap, map, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

console.log('****** Effects ', userActionTypes);
@Injectable()
export class UserEffects {
  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userActionTypes.loadUsers),
      concatMap(() => this.userService.getUsers()),
      map(users => userActionTypes.usersLoaded({users}))
    )
  );

  createUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userActionTypes.createUser),
      concatMap((action) => this.userService.createUser(action.user)),
      tap(() => this.router.navigateByUrl('/users'))
    ),
    {dispatch: false}
  );

  deleteUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userActionTypes.deleteUser),
      concatMap((action) => this.userService.deleteUser(action.userId))
    ),
    {dispatch: false}
  );

  updateUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userActionTypes.updateUser),
      concatMap((action) => this.userService.updateUser(action.update.id, action.update.changes)),
      tap(() => this.router.navigateByUrl('/users'))
    ),
    {dispatch: false}
  );

  constructor(private userService: UserService, private actions$: Actions, private router: Router) {}
}
