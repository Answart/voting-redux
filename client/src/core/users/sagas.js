import { call, put, fork, select, takeLatest } from 'redux-saga/effects';
import { SubmissionError, reset } from 'redux-form';
import history from '../history';
import {
  userRequestActions,
  getAuthedUser,
  authUserApi, deleteUserApi
 } from '../users';
import {
  AUTH_USER, AUTH_USER_SUCCESS,
  RESET_AUTHED_USER,
  DELETE_USER,
} from '../constants';


//=====================================================
//  SAGAS

export function* authUserSaga(action) {
  const { authType, name, email, password, resolve, reject } = action.payload;
  try {
    const response = yield call(authUserApi, authType, { name, password }, email);
    yield put(userRequestActions.authFulfilled({
      user: response.user,
      message: response.message
    }));
    yield put(reset('authUser'));
    yield call(resolve);
  } catch (error) {
    yield put(userRequestActions.authFailed(error));
    yield call(reject, (new SubmissionError(error)));
  }
};

export function* authUserSuccessSaga() {
  const authedUser = select(getAuthedUser);
  if (!!authedUser) {
    yield localStorage.setItem('token', authedUser.token);
    yield history.push('/account');
  }
};

export function* logoutUserSaga() {
  yield localStorage.removeItem('token');
  yield history.push('/');
};

export function* deleteUserSaga() {
  try {
    const authedUser = yield select(getAuthedUser);
    const response = yield call(deleteUserApi, authedUser.cuid);
    yield put(userRequestActions.deleteFulfilled({
      message: response.message
    }));
    yield localStorage.removeItem('token');
    yield history.push('/');
  } catch (error) {
    yield put(userRequestActions.deleteFailed(error));
  }
};


//=====================================================
//  WATCHERS

export function* watchAuthUserSaga() {
  yield takeLatest(AUTH_USER, authUserSaga);
};

export function* watchAuthUserSuccessSaga() {
  yield takeLatest(AUTH_USER_SUCCESS, authUserSuccessSaga);
};

export function* watchLogoutUserSaga() {
  yield takeLatest(RESET_AUTHED_USER, logoutUserSaga);
};

export function* watchDeleteUserSaga() {
  yield takeLatest(DELETE_USER, deleteUserSaga);
};


//=====================================================
//  WATCHERS AND SAGAS

export const userSagas = {
  watchAuthUserSaga,
  watchAuthUserSuccessSaga,
  watchLogoutUserSaga,
  watchDeleteUserSaga,
  authUserSaga,
  authUserSuccessSaga,
  logoutUserSaga,
  deleteUserSaga
};


//=====================================================
//  FORKED SAGA WATCHERS

export const userSagaWatchers = [
  fork(watchAuthUserSaga),
  fork(watchAuthUserSuccessSaga),
  fork(watchLogoutUserSaga),
  fork(watchDeleteUserSaga)
];
