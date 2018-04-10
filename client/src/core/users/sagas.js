import { call, put, fork, select, takeLatest } from 'redux-saga/effects';
import { SubmissionError, reset } from 'redux-form';
// Import compoenents
import history from '../history';
import {
  getAuthedUser
 } from '../users';
import {
  authUserApi
} from '../api';
import {
  AUTH_USER, AUTH_USER_SUCCESS, AUTH_USER_FAILURE,
  RESET_AUTHED_USER,
  DELETE_USER, DELETE_USER_SUCCESS, DELETE_USER_FAILURE
} from '../constants';


export function* authUser(action) {
  const { authType, name, email, password, resolve, reject } = action;
  try {
    const response = yield call(authUserApi, authType, name, email, password);
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
    yield history.push('/account');
  }
}

export function* logoutUser() {
  yield localStorage.removeItem('token');
  yield history.push('/');
};

export function* deleteUser() {
  try {
    const authedUser = yield select(getAuthedUser);
    // dummy response until api call built
    const response = { message: 'Deleted' };
    yield put({ type: DELETE_USER_SUCCESS, message: response.message });
    yield localStorage.removeItem('token');
    yield history.push('/');
  } catch (error) {
    yield put({ type: DELETE_USER_FAILURE, error });
  }
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
export function* watchDeleteUser() {
  yield takeLatest(DELETE_USER, deleteUser);
};


//=====================================
//  ROOT
//-------------------------------------

export const userSagas = [
  fork(watchAuthUser),
  fork(watchAuthUserSuccess),
  fork(watchLogoutUser),
  fork(watchDeleteUser)
];
