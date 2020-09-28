import { User } from '../user';
import { createAction, props } from '@ngrx/store';
import {Update} from '@ngrx/entity';
console.log('****** Actions ');

export const loadUsers = createAction(
  '[Users List] Load Users via Service',
);

export const usersLoaded = createAction(
  '[Users Effect] Users Loaded Successfully',
  props<{users: User[]}>()
);

export const createUser = createAction(
  '[Create User Component] Create User',
  props<{user: User}>()
);

export const deleteUser = createAction(
  '[Users List Operations] Delete User',
  props<{userId: string}>()
);

export const updateUser = createAction(
  '[Users List Operations] Update User',
  props<{update: Update<User>}>()
);

export const getUser = createAction(
  '[User Details Operations] User Details',
  props<{userId: string}>()
);

export const userActionTypes = {
  loadUsers,
  usersLoaded,
  createUser,
  deleteUser,
  updateUser,
  getUser
};
