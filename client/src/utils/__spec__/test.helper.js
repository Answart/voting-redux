import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { MemoryRouter, Router, Route } from 'react-router-dom';
import configureStore from 'redux-mock-store';
// Import testing modules
import { shallow, mount } from 'enzyme';
import { createMount, createShallow } from 'material-ui/test-utils'; // built on top of enzyme
import createRouterContext from 'react-router-test-context';

const mockFn = jest.fn;
const context = {
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
    // muiTheme: PropTypes.object
  },
};
const initialState = [];
const configMockStore = configureStore()
const mockStore = configMockStore(initialState);
// console.log('context', context);
const routerContext = createRouterContext();
// console.log('routerContext', routerContext);

export const muiMounter = createMount();
export const muiShallower = createShallow();
export const muiMount = node => muiMounter(
  node,
  { ...routerContext }
);

/**
* MuiMountWithContext
*
* For `mount()` full DOM rendering in enzyme.
* Provides needed context for mui to be rendered properly
* during testing.
*
* @param {obj}    node - ReactElement with mui as root or child
* @return {obj}   ReactWrapper (http://airbnb.io/enzyme/docs/api/ReactWrapper/mount.html)
*/
export const MuiMountWithContext = node => mount(node, context);

/**
* MuiShallowWithContext
*
* For `shallow()` shallow rendering in enzyme (component only as a unit).
* Provides needed context for mui to be rendered properly
* during testing.
*
* @param {obj}     node - ReactElement with mui
* @return {obj}    ShallowWrapper (http://airbnb.io/enzyme/docs/api/ShallowWrapper/shallow.html)
*/
export const MuiShallowWithContext = node => shallow(node, context);
// export const MuiShallowWithContext = node => shallow(node, {
//   context: { muiTheme },
//   childContextTypes: { muiTheme: PropTypes.object },
// }).dive(); // shallow-render the actual component

/**
* mountWithRouter
*
* For `mount()` full DOM rendering in enzyme through material-ui.
* Provides needed context for mui to be rendered properly
* during testing.
*
* @param {obj}    node - ReactElement with mui as root or child
* @return {obj}   ReactWrapper (http://airbnb.io/enzyme/docs/api/ReactWrapper/mount.html)
*/
export const mountWithRouter = (node, pathnames = ['/'], key = 'testKey') => muiMounter(
  <MemoryRouter keyLength={3} initialEntries={pathnames}>
    <Route render={() => node} />
  </MemoryRouter>
);
export const shallowWithRouter = (node, pathnames = ['/'], key = 'testKey') => muiShallower(
  <MemoryRouter keyLength={3} initialEntries={pathnames}>
    <Route render={() => node} />
  </MemoryRouter>
);
export const mountWithRouterConnected = (node, pathnames = ['/'], key = 'testKey') => {
  return muiMounter(
  <Provider store={mockStore}>
    <MemoryRouter keyLength={3} initialEntries={pathnames}>
      <Route render={() => node} />
    </MemoryRouter>
  </Provider>
  );
};

export const shallowWithRouterConnected = (node, pathnames = ['/'], key = 'testKey') => muiShallower(
  <Provider store={mockedStore}>
    <MemoryRouter keyLength={3} initialEntries={pathnames}>
      <Route render={() => node} />
    </MemoryRouter>
  </Provider>
);
