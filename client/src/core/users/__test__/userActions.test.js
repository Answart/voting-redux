import { userActions } from '../../users';
import { mockUser } from '../../../utils/__test__';
import {
  AUTH_USER, AUTH_USER_SUCCESS, AUTH_USER_FAILURE,
  RESET_AUTHED_USER,
  DELETE_USER, DELETE_USER_SUCCESS, DELETE_USER_FAILURE
} from '../../constants';

let promises = {};
let promise1 = new Promise(function(resolve, reject) {
  promises.resolve = resolve;
  promises.reject = reject;
});
let values = {
  name: mockUser.name,
  email: mockUser.email,
  password: mockUser.password
}


describe('userActions', () => {
  describe('authUser()', () => {
    it('"register" returns an object with the type of AUTH_USER', () => {
      values.authType = 'register';
      expect(userActions.authUser({ ...values }, { ...promises })).toEqual({
        type: AUTH_USER,
        payload: {
          authType: 'register',
          ...values,
          ...promises
        }
      });
    });
    it('"login" returns an object with the type of AUTH_USER', () => {
      values.authType = 'login';
      expect(userActions.authUser({ ...values }, { ...promises })).toEqual({
        type: AUTH_USER,
        payload: {
          authType: 'login',
          ...values,
          ...promises
        }
      });
    });
  });

  describe('authUserSuccess()', () => {
    it('returns an object with the type AUTH_USER_SUCCESS', () => {
      const user = mockUser;
      const message = 'Successfully authed user.';
      expect(userActions.authUserSuccess({ user, message })).toEqual({
        type: AUTH_USER_SUCCESS,
        payload: {
          user,
          message
        }
      });
    });
  });

  describe('authUserFailure()', () => {
    it('returns an object with the type AUTH_USER_FAILURE', () => {
      const error = 'Failed to auth user.';
      expect(userActions.authUserFailure(error)).toEqual({
        type: AUTH_USER_FAILURE,
        payload: {
          error
        }
      });
    });
  });

  describe('logoutUser()', () => {
    it('returns an object with the type of RESET_AUTHED_USER', () => {
      expect(userActions.logoutUser()).toEqual({
        type: RESET_AUTHED_USER
      });
    });
  });

  describe('deleteUser()', () => {
    it('returns an object with the type of DELETE_USER', () => {
      expect(userActions.deleteUser()).toEqual({
        type: DELETE_USER
      });
    });
  });
});
