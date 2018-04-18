import { userActions, userReducer, getAuthedUser } from '../../users';
import { mockUser } from '../../../utils/__test__';
import {
  AUTH_USER, AUTH_USER_FAILURE, AUTH_USER_SUCCESS,
  RESET_AUTHED_USER,
  DELETE_USER, DELETE_USER_SUCCESS, DELETE_USER_FAILURE
} from '../../constants';


describe('userReducer', () => {
  let initialState;
  beforeEach(() => initialState = {
    authedUser: {
      loading: false,
      error: null,
      message: null,
      token: null,
      user: null
    }
  });

  describe('default', () => {
    it('returns initial state', () => {
      expect(userReducer()).toEqual(initialState);
    });
  });

  describe('AUTH_USER', () => {
    let pendingState;
    beforeAll(() => pendingState = userReducer(initialState, { type: AUTH_USER }));

    it('returns the state with authedUser having the loading flag', () => {
      expect(pendingState).toEqual({
        authedUser: {
          ...initialState.authedUser,
          loading: true, error: null, message: null
        }
      });
    });
    it('_FAILURE returns state with authedUser having an error', () => {
      var error = { message: 'Auth user failure' };
      expect(userReducer(pendingState, { type: AUTH_USER_FAILURE, payload: { error }})).toEqual({
        authedUser: {
          loading: false,
          error: error.message,
          ...pendingState.authedUser
        }
      });
    });
    it('_SUCCESS returns state with authedUser having a new user, token, and message', () => {
      const message = 'Delete user a success.';
      const user = { ...mockUser };
      expect(userReducer(pendingState, { type: AUTH_USER_SUCCESS, payload: { user, message }})).toEqual({
        authedUser: {
          error: null,
          loading: false,
          message,
          token: user.token,
          user
        }
      });
    });
  });

  describe('RESET_AUTHED_USER', () => {
    it('returns the state with authedUser reset', () => {
      expect(userReducer(initialState, { type: RESET_AUTHED_USER })).toEqual({
        authedUser: {
          loading: false, error: null, message: null, token: null, user: null,
          ...initialState.authedUser
        }
      });
    });
  });

  describe('DELETE_USER', () => {
    let pendingState;
    beforeAll(() => pendingState = userReducer(initialState, { type: DELETE_USER }));

    it('returns the state with authedUser having the loading flag', () => {
      expect(pendingState).toEqual({
        authedUser: {
          loading: true, error: null, message: null,
          ...initialState.authedUser
        }
      });
    });
    it('_FAILURE returns state with authedUser having an error', () => {
      const error = { message: 'Delete user failure' };
      expect(userReducer(pendingState, { type: DELETE_USER_FAILURE, payload: { error }})).toEqual({
        authedUser: {
          loading: false,
          error: error.message,
          ...pendingState.authedUser
        }
      });
    });
    it('_SUCCESS returns state with authedUser having a no user, token, but a message', () => {
      const message = 'Delete user a success.';
      const user = { ...mockUser };
      expect(userReducer(pendingState, { type: DELETE_USER_SUCCESS, payload: { message }})).toEqual({
        authedUser: {
          ...pendingState.authedUser,
          loading: false, token: null, user: null,
          message
        }
      });
    });
  });
});
