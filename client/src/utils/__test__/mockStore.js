import PropTypes from 'prop-types';
import createSagaMiddleware from 'redux-saga';
import configureStore from 'redux-mock-store';
import createRouterContext from 'react-router-test-context';
import { mockInitialState, mockState } from './mockState';

const sagaMiddleware = createSagaMiddleware();
const configMockStore = configureStore([sagaMiddleware]);


// ==========================================================
// MOCK CONTEXTS

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
export const routerContext = createRouterContext();


// ==========================================================
// MOCK STORES

export const mockInitialStore = configMockStore(mockInitialState);
export const mockStore = configMockStore(mockState);
