import { takeLatest, put, all, call, take } from "redux-saga/effects";

import { USER_ACTION_TYPES } from "./user.type";

import {
  signInSuccess,
  signInFailed,
  signUpSuccess,
  signUpFailed,
  signOutFailed,
  signOutSuccess,
} from "./user.action";

import {
  getCurrentUser,
  createUserDocumentFromAuth,
  signInUserWithEmailAndPassword,
  signOutUser,
  signInWithGooglePopup,
  createAuthUserWithEmailAndPassword,
} from "../../utils/firebase/firebase.util";

// GET CURRENT USER
export function* getSnapshotFromUserAuth(userAuth, additionalData) {
  try {
    const userSnapshot = yield call(createUserDocumentFromAuth, userAuth, additionalData);
    yield put(signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() }));
  } catch (error) {
    yield put(signInFailed(error));
  }
}
export function* isUserAuthenticated() {
  try {
    const userAuth = yield call(getCurrentUser);
    if (!userAuth) return;
    yield call(getSnapshotFromUserAuth, userAuth);
  } catch (error) {
    yield put(signInFailed(error));
  }
}
export function* onCheckUserSession() {
  yield takeLatest(USER_ACTION_TYPES.CHECK_USER_SESSION, isUserAuthenticated);
}

// EMAIL SIGN IN
export function* signInWithEmail({ payload: { email, password } }) {
  try {
    const { user } = yield call(signInUserWithEmailAndPassword, email, password);
    yield call(getSnapshotFromUserAuth, user);
  } catch (error) {
    yield put(signInFailed(error));
  }
}
export function* onEmailSignInStart() {
  yield takeLatest(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, signInWithEmail);
}

// GOOGLE SIGN IN
export function* signInWithGoogle() {
  try {
    const { user } = yield call(signInWithGooglePopup);
    yield call(getSnapshotFromUserAuth, user);
  } catch (error) {
    yield put(signInFailed(error));
  }
}
export function* onGoogleSignInStart() {
  yield takeLatest(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START, signInWithGoogle);
}

// SIGN UP
export function* signUp({ payload: { email, password, displayName } }) {
  console.log("passou aqui 2");
  try {
    const { user } = yield call(createAuthUserWithEmailAndPassword, email, password);
    console.log("passou aqui 3");
    yield put(signUpSuccess(user, { displayName }));
  } catch (error) {
    yield put(signUpFailed(error));
  }
}
export function* onSignUpStart() {
  yield takeLatest(USER_ACTION_TYPES.SIGN_UP_START, signUp);
}

export function* signInAfterSignUp({ payload: { user, additionalDetails } }) {
  console.log("passou aqui 4");
  yield call(getSnapshotFromUserAuth, user, additionalDetails);
}
export function* onSignUpSuccess() {
  yield takeLatest(USER_ACTION_TYPES.SIGN_UP_SUCCESS, signInAfterSignUp);
}

// LOGOUT
export function* signOut() {
  try {
    yield call(signOutUser);
    yield put(signOutSuccess());
  } catch (error) {
    yield put(signOutFailed(error));
  }
}
export function* onSignOutStart() {
  yield takeLatest(USER_ACTION_TYPES.SIGN_OUT_START, signOut);
}

export function* userSaga() {
  yield all([
    call(onCheckUserSession),
    call(onEmailSignInStart),
    call(onGoogleSignInStart),
    call(onSignUpStart),
    call(onSignUpSuccess),
    call(onSignOutStart),
  ]);
}
