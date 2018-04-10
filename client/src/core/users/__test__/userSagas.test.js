import { call, put, fork, select, takeLatest } from 'redux-saga/effects';
import { SubmissionError, reset } from 'redux-form';
import { cloneableGenerator } from 'redux-saga/utils';
// Import compoenents
import history from '../../history';
import { userActions, userReducer, getAuthedUser, userSagas } from '../../users';
import {
  watchAuthUser, watchAuthUserSuccess, watchLogoutUser, watchDeleteUser,
  authUser, authUserSuccess, logoutUser, deleteUser
} from '../../users/sagas';
import {
  authUserApi
} from '../../api';
import {
  AUTH_USER, AUTH_USER_FAILURE, AUTH_USER_SUCCESS,
  RESET_AUTHED_USER,
  DELETE_USER, DELETE_USER_SUCCESS, DELETE_USER_FAILURE
} from '../../constants';


describe('userSagas', () => {

  // =========================================================
  describe('watchers', () => {
    it('watchAuthUser() calls takeLatest on AUTH_USER action', () => {
      const gen = watchAuthUser();
      let next = gen.next();
      expect(next.value).toEqual(takeLatest(AUTH_USER, authUser));
      next = gen.next();
      expect(next).toEqual({ done: true, value: undefined });
    });
    it('watchAuthUserSuccess() calls takeLatest on AUTH_USER_SUCCESS action', () => {
      const gen = watchAuthUserSuccess();
      let next = gen.next();
      expect(next.value).toEqual(takeLatest(AUTH_USER_SUCCESS, authUserSuccess));
      next = gen.next();
      expect(next).toEqual({ done: true, value: undefined });
    });
    it('watchLogoutUser() calls takeLatest on RESET_AUTHED_USER action', () => {
      const gen = watchLogoutUser();
      let next = gen.next();
      expect(next.value).toEqual(takeLatest(RESET_AUTHED_USER, logoutUser));
      next = gen.next();
      expect(next).toEqual({ done: true, value: undefined });
    });
    it('watchDeleteUser() calls takeLatest on DELETE_USER action', () => {
      const gen = watchDeleteUser();
      let next = gen.next();
      expect(next.value).toEqual(takeLatest(DELETE_USER, deleteUser));
      next = gen.next();
      expect(next).toEqual({ done: true, value: undefined });
    });
  });

  // =========================================================
  describe('watched sagas', () => {
    let name, email, password, authValues, promises;
    beforeAll(() => {
      let resolveIt, rejectIt;
      var grabPromises = new Promise(function(resolve, reject) {
        resolveIt = resolve;
        rejectIt = reject;
      });
      promises = { resolve: resolveIt, reject: rejectIt };
      name = 'alexandra';
      email = 'alex@gmail.com';
      password = '12345';
      authValues = { name, email, password };
    });

    describe('register flow', () => {
      let registerAction, clone;
      beforeAll(() => {
        authValues.authType = 'register';
        registerAction = userActions.authUser({ ...authValues }, { ...promises })
      });
      beforeEach(() => {
        const gen = cloneableGenerator(authUser)(registerAction);
        clone = gen.clone();
      });

      it('completes successfully on success', () => {
        const response = {
          user: { cuid: '123', name, email, activity: [], token: 'secret' },
          message: 'success'
        };
        expect(clone.next().value).toEqual(call(authUserApi, 'register', name, email, password));
        expect(clone.next().value).toEqual(put({
          type: AUTH_USER_SUCCESS,
          user: response.user,
          message: response.message
        }));
        expect(clone.next().value).toEqual(put(reset('authUser')));
        expect(clone.next().value).toEqual(call(promises.resolve));
        expect(clone.next().done).toEqual(true);
      });
      it('throws successfully on failure', () => {
        clone.next();
        expect(clone.throw('Error registering user.').value)
          .toEqual(put({ type: AUTH_USER_FAILURE, error: 'Error registering user.' }));
        expect(clone.next().value)
          .toEqual(call(promises.reject, (new SubmissionError('Error registering user.'))));
        expect(clone.next().done).toEqual(true);
      });
    });

    describe('login flow', () => {
      let loginAction, clone;
      beforeAll(() => {
        authValues.authType = 'login';
        loginAction = userActions.authUser({ ...authValues }, { ...promises })
      });
      beforeEach(() => {
        const gen = cloneableGenerator(authUser)(loginAction);
        clone = gen.clone();
      });

      it('completes successfully on success', () => {
        const response = {
          user: { cuid: '123', name, email, activity: [], token: 'secret' },
          message: 'success'
        };
        expect(clone.next().value).toEqual(call(authUserApi, 'login', name, email, password));
        expect(clone.next().value).toEqual(put({
          type: AUTH_USER_SUCCESS,
          user: response.user,
          message: response.message
        }));
        expect(clone.next().value).toEqual(put(reset('authUser')));
        expect(clone.next().value).toEqual(call(promises.resolve));
        expect(clone.next().done).toEqual(true);
      });
      it('throws successfully on failure', () => {
        clone.next();
        expect(clone.throw('Error logging in user.').value)
          .toEqual(put({ type: AUTH_USER_FAILURE, error: 'Error logging in user.' }));
        expect(clone.next().value)
          .toEqual(call(promises.reject, (new SubmissionError('Error logging in user.'))));
        expect(clone.next().done).toEqual(true);
      });
    });

    describe('logout flow', () => {
      let logoutAction;
      beforeAll(() => logoutAction = userActions.logoutUser());

      it('removes token and routes to /', () => {
        const gen = cloneableGenerator(logoutUser)(logoutAction);
        expect(gen.next().value).toEqual(localStorage.removeItem('token'));
        expect(gen.next().value).toEqual(history.push('/'));
        expect(gen.next().done).toEqual(true);
      });
    });

    describe('delete flow', () => {
      let deleteAction, clone;
      beforeAll(() => deleteAction = userActions.deleteUser());
      beforeEach(() => {
        const gen = cloneableGenerator(deleteUser)(deleteAction);
        clone = gen.clone();
      });

      it('completes successfully on success', () => {
        expect(clone.next().value).toEqual(select(getAuthedUser));
        const response = { message: 'Deleted' };
        expect(clone.next().value).toEqual(put({
          type: DELETE_USER_SUCCESS,
          message: response.message
        }));
        expect(clone.next().value).toEqual(localStorage.removeItem('token'));
        expect(clone.next().value).toEqual(history.push('/'));
        expect(clone.next().done).toEqual(true);
      });
      it('throws successfully on failure', () => {
        clone.next();
        expect(clone.throw('Error deleting user.').value)
          .toEqual(put({ type: DELETE_USER_FAILURE, error: 'Error deleting user.' }));
        expect(clone.next().done).toEqual(true);
      });
    });
  });
});
