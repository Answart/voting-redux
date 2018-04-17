import { call, put, fork, select, takeLatest } from 'redux-saga/effects';
import { SubmissionError, reset } from 'redux-form';
import { cloneableGenerator } from 'redux-saga/utils';
// Import compoenents
import history from '../../history';
import { mockUser } from '../../../utils/__test__';
import {
  userActions, userReducer, userSagas,
  getAuthedUser,
  authUserApi, deleteUserApi
} from '../../users';
import {
  AUTH_USER, AUTH_USER_FAILURE, AUTH_USER_SUCCESS,
  RESET_AUTHED_USER,
  DELETE_USER, DELETE_USER_SUCCESS, DELETE_USER_FAILURE
} from '../../constants';


describe('userSagas', () => {

  describe('watchers', () => {

    it('watchAuthUserSaga() calls takeLatest on AUTH_USER action', () => {
      const gen = cloneableGenerator(userSagas.watchAuthUserSaga)();
      expect(gen.next().value).toEqual(
        takeLatest(AUTH_USER, userSagas.authUserSaga));
      expect(gen.next().done).toEqual(true);
    });
    it('watchAuthUserSuccessSaga() calls takeLatest on AUTH_USER_SUCCESS action', () => {
      const gen = cloneableGenerator(userSagas.watchAuthUserSuccessSaga)();
      expect(gen.next().value).toEqual(
        takeLatest(AUTH_USER_SUCCESS, userSagas.authUserSuccessSaga));
      expect(gen.next().done).toEqual(true);
    });
    it('watchLogoutUserSaga() calls takeLatest on RESET_AUTHED_USER action', () => {
      const gen = cloneableGenerator(userSagas.watchLogoutUserSaga)();
      expect(gen.next().value).toEqual(
        takeLatest(RESET_AUTHED_USER, userSagas.logoutUserSaga));
      expect(gen.next().done).toEqual(true);
    });
    it('watchDeleteUserSaga() calls takeLatest on DELETE_USER action', () => {
      const gen = cloneableGenerator(userSagas.watchDeleteUserSaga)();
      expect(gen.next().value).toEqual(
        takeLatest(DELETE_USER, userSagas.deleteUserSaga));
      expect(gen.next().done).toEqual(true);
    });
  });

  describe('watched sagas', () => {
    let authValues, promises;
    beforeAll(() => {
      promises = {};
      var grabPromises = new Promise(function(resolve, reject) {
        promises.resolve = resolve;
        promises.reject = reject;
      });
      authValues = {
        name: mockUser.name,
        password: mockUser.password
      };
    });

    describe('register flow', () => {
      let registerAction, clone;
      beforeAll(() => registerAction = userActions.authUser({ authType: 'register', ...authValues, email: mockUser.email }, { ...promises }));
      beforeEach(() => clone = (cloneableGenerator(userSagas.authUserSaga)(registerAction)).clone());

      it('completes successfully on success', () => {
        const response = {
          user: mockUser,
          message: 'success'
        };
        expect(clone.next().value).toEqual(
          call(authUserApi, 'register', { ...authValues }, mockUser.email));
        expect(clone.next(response).value).toEqual(
          put({
            type: AUTH_USER_SUCCESS,
            user: response.user,
            message: response.message}));
        expect(clone.next().value).toEqual(
          put(reset('authUser')));
        expect(clone.next().value).toEqual(
          call(promises.resolve));
        expect(clone.next().done).toEqual(true);
      });
      it('throws successfully on failure', () => {
        clone.next();
        const error = 'Error registering user.';
        expect(clone.throw(error).value).toEqual(
          put({ type: AUTH_USER_FAILURE, error }));
        expect(clone.next().value).toEqual(
          call(promises.reject, (new SubmissionError(error))));
        expect(clone.next().done).toEqual(true);
      });
    });

    describe('login flow', () => {
      let loginAction, clone;
      beforeAll(() => loginAction = userActions.authUser({ authType: 'login', ...authValues, email: null }, { ...promises }));
      beforeEach(() => clone = (cloneableGenerator(userSagas.authUserSaga)(loginAction)).clone());

      it('completes successfully on success', () => {
        const response = {
          user: mockUser,
          message: 'success'
        };
        expect(clone.next().value).toEqual(
          call(authUserApi, 'login', { ...authValues }, null));
        expect(clone.next(response).value).toEqual(
          put({
            type: AUTH_USER_SUCCESS,
            user: response.user,
            message: response.message
          }));
        expect(clone.next().value).toEqual(
          put(reset('authUser')));
        expect(clone.next().value).toEqual(
          call(promises.resolve));
        expect(clone.next().done).toEqual(true);
      });
      it('throws successfully on failure', () => {
        clone.next();
        const error = 'Error logging in user.';
        expect(clone.throw(error).value).toEqual(
          put({ type: AUTH_USER_FAILURE, error }));
        expect(clone.next().value).toEqual(
          call(promises.reject, (new SubmissionError(error))));
        expect(clone.next().done).toEqual(true);
      });
    });

    describe('logout flow', () => {
      let logoutAction;
      beforeAll(() => logoutAction = userActions.logoutUser());

      it('removes token and routes to /', () => {
        const gen = cloneableGenerator(userSagas.logoutUserSaga)(logoutAction);
        expect(gen.next().value).toEqual(
          localStorage.removeItem('token'));
        expect(gen.next().value).toEqual(
          history.push('/'));
        expect(gen.next().done).toEqual(true);
      });
    });

    describe('delete flow', () => {
      let deleteAction, clone;
      beforeAll(() => deleteAction = userActions.deleteUser());
      beforeEach(() => clone = (cloneableGenerator(userSagas.deleteUserSaga)(deleteAction)).clone());

      it('completes successfully on success', () => {
        expect(clone.next().value).toEqual(
          select(getAuthedUser));
        const response = { message: 'Deleted' };
        expect(clone.next(mockUser).value).toEqual(
          call(deleteUserApi, mockUser.cuid));
        expect(clone.next(response).value).toEqual(
          put({
            type: DELETE_USER_SUCCESS,
            message: response.message
          }));
        expect(clone.next().value).toEqual(
          localStorage.removeItem('token'));
        expect(clone.next().value).toEqual(
          history.push('/'));
        expect(clone.next().done).toEqual(true);
      });
      it('throws successfully on failure', () => {
        clone.next();
        const error = 'Error deleting user.';
        expect(clone.throw(error).value).toEqual(
          put({ type: DELETE_USER_FAILURE, error }));
        expect(clone.next().done).toEqual(true);
      });
    });
  });
});
