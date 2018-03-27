import React from 'react';
import PropTypes from 'prop-types';
import { shallow, mount } from 'enzyme';
import { createMount, createShallow } from 'material-ui/test-utils'; // built on top of enzyme
import { MemoryRouter, Router, Route } from 'react-router-dom';
import createRouterContext from 'react-router-test-context';
// import PropTypes from 'prop-types';
// import test from 'ava';
// import sinon from 'sinon';
// const homePageImgUrl = 'www.google.com';

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
}
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
