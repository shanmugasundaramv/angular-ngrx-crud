import { User } from '../user';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { userActionTypes, usersLoaded } from './user.actions';
console.log('****** Reducers ');
export interface UserState extends EntityState<User> {
  usersLoaded: boolean;
}

export const adapter: EntityAdapter<User> = createEntityAdapter<User>();

export const initialState = adapter.getInitialState({
  usersLoaded: false
});
console.log('****** user reducer initial ');
export const userReducer = createReducer(
  initialState,

  on(userActionTypes.usersLoaded, (state, action) => {
    return adapter.addAll(
      action.users,
      {...state, usersLoaded: true}
    );
  }),

  on(userActionTypes.createUser, (state, action) => {
    console.log('****** inside reducer action.user ', action);
    return adapter.addOne(action.user, state);
  }),

  on(userActionTypes.deleteUser, (state, action) => {
    console.log('****** inside delete reducer action.user ', action);
    return adapter.removeOne(action.userId, state);
  }),

  on(userActionTypes.updateUser, (state, action) => {
    console.log('****** inside update reducer action.user ', action);
    return adapter.updateOne(action.update, state);
  })
);

export const { selectAll, selectIds } = adapter.getSelectors();
