import { Action } from '@ngrx/store';

// action type
export enum UserActionTypes {
  MaskUserName = '[Users] Mask User Name'
}

// action creators
export class MaskUserName implements Action {
  readonly type = UserActionTypes.MaskUserName;
  constructor(public payload: boolean) {}
}

// union type
export type UserActions = MaskUserName;
