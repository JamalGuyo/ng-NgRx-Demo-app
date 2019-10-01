import { UserActions, UserActionTypes } from './user.action';
import { createFeatureSelector, createSelector } from '@ngrx/store';

// strong-typing
export interface UserState {
  maskUserName: boolean;
}

// initial state
const initialState: UserState = {
  maskUserName: true
};

// selector
const getUserFeatureState = createFeatureSelector<UserState>('users');

export const getMaskUserName = createSelector(
  getUserFeatureState,
  state => state.maskUserName
);

// reducer
export function reducer(state = initialState, action: UserActions): UserState {
  switch (action.type) {
    case UserActionTypes.MaskUserName:
      return {
        ...state,
        maskUserName: action.payload
      };
    default:
      return state;
  }
}
