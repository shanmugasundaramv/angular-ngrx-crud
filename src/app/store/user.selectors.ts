import { UserState } from './user.reducers';
import { User } from '../user';
import { createSelector, createFeatureSelector } from '@ngrx/store';
import { selectAll, selectIds } from './user.reducers';

export const userFeatureSelector = createFeatureSelector<UserState>('users');
console.log('****** initial selector ');
export const getAllUsers = createSelector(
  userFeatureSelector,
  selectAll
);
export const areUsersLoaded = createSelector(
  userFeatureSelector,
  state => state.usersLoaded
);
