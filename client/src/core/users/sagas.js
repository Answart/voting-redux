import { call, put, fork, select, takeLatest } from 'redux-saga/effects';
import { SubmissionError, reset } from 'redux-form';
// Import compoenents
import history from '../history';
import { getAuthedUser } from '../users';
import {
  AUTH_USER, AUTH_USER_SUCCESS, AUTH_USER_FAILURE,
  RESET_AUTHED_USER
} from '../constants';


export function* authUser(action) {
  const { authType, name, email, password, resolve, reject } = action;
  try {
    // dummy response until api call built
    const response = { user: { cuid: '123', activity: [], name, email, token: 'secret' }, message: 'success' };
    yield put({ type: AUTH_USER_SUCCESS, user: response.user, message: response.message });
    yield put(reset('authUser'))
    yield call(resolve);
  } catch (error) {
    yield put({ type: AUTH_USER_FAILURE, error });
    yield call(reject, (new SubmissionError(error)));
  }
};
export function* authUserSuccess() {
  const authedUser = select(getAuthedUser);
  if (!!authedUser) {
    yield localStorage.setItem('token', authedUser.token);
    history.push('/account');
  }
}

export function* logoutUser() {
  localStorage.removeItem('token');
  history.push('/');
};


//=====================================
//  WATCHERS
//-------------------------------------

export function* watchAuthUser() {
  yield takeLatest(AUTH_USER, authUser);
};
export function* watchAuthUserSuccess() {
  yield takeLatest(AUTH_USER_SUCCESS, authUserSuccess);
};
export function* watchLogoutUser() {
  yield takeLatest(RESET_AUTHED_USER, logoutUser);
};


//=====================================
//  ROOT
//-------------------------------------

export const userSagas = [
  fork(watchAuthUser),
  fork(watchAuthUserSuccess),
  fork(watchLogoutUser)
];
