import { USER_ACTION_TYPES } from "./user.type";

import { AnyAction } from "@reduxjs/toolkit";
// import { CurrentUser } from "./user.selector";
import { UserData } from "../../utils/firebase/firebase.util";

import {
  signInFailed,
  signInSuccess,
  signOutFailed,
  signOutSuccess,
  signUpFailed,
} from "./user.action";

export type UserState = {
  readonly currentUser: UserData | null;
  readonly isLoading: boolean;
  readonly error: Error | null;
};

const INITIAL_STATE: UserState = {
  currentUser: null,
  isLoading: false,
  error: null,
};

export const userReducer = (state = INITIAL_STATE, action: AnyAction) => {
  if (signInSuccess.match(action)) {
    return { ...state, currentUser: action.payload, isLoading: false, error: null };
  }
  if (signOutSuccess.match(action)) {
    return { ...state, currentUser: null };
  }
  if (signInFailed.match(action) || signUpFailed.match(action) || signOutFailed.match(action)) {
    return { ...state, error: action.payload, isLoading: false };
  }
  return state;
};
