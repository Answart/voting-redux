import { userActions } from '../../users';
import {
  AUTH_USER,
  RESET_AUTHED_USER,
  DELETE_USER
} from '../../constants';

let resolveIt, rejectIt;
var promise1 = new Promise(function(resolve, reject) {
  resolveIt = resolve;
  rejectIt = reject;
});
const promises = { resolve: resolveIt, reject: rejectIt };
const values = {
  name: 'alexandra',
  email: 'alex@gmail.com',
  password: '12345'
}


describe('authUser()', () => {
  it('"register" returns an object with the type of AUTH_USER', () => {
    expect(userActions.authUser('register', { ...values }, { ...promises })).toEqual({
      type: AUTH_USER,
      authType: 'register',
      ...values,
      ...promises
    });
  });
  it('"login" returns an object with the type of AUTH_USER', () => {
    expect(userActions.authUser('login', { ...values }, { ...promises })).toEqual({
      type: AUTH_USER,
      authType: 'login',
      ...values,
      ...promises
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
