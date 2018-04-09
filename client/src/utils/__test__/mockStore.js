import { applyMiddleware, compose } from 'redux';
import PropTypes from 'prop-types';
import createSagaMiddleware from 'redux-saga';
import configureStore from 'redux-mock-store';
import createRouterContext from 'react-router-test-context';

import { userReducer, initialState } from '../../core/users';
import { reducer as form } from 'redux-form';

const sagaMiddleware = createSagaMiddleware();
const configMockStore = configureStore([sagaMiddleware]);
const mockInitialState = {
  form,
  // users: userReducer,
  users: {
    authedUser: {
      loading: false, error: null, message: null, token: null,
      user: {
        name: 'alexandra',
        cuid: '12345',
        activity: []
      }
    }
  }
};


export const mockStore = configMockStore(mockInitialState);



// ======================================================
// STORE AND CONTEXT
// =========================

const mockFn = jest.fn;
export const context = {
  context: {
    // muiTheme,
    router: {
      isActive: mockFn,
      push: mockFn,
      replace: mockFn,
      go: mockFn,
      goBack: mockFn,
      goForward: mockFn,
      setRouteLeaveHook: mockFn,
      createHref: mockFn,
    }
  },
  childContextTypes: {
    router: PropTypes.object.isRequired,
    muiTheme: PropTypes.object
  }
};
// console.log('context', context);
export const routerContext = createRouterContext();
// console.log('routerContext', routerContext);
