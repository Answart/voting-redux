import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { MemoryRouter, Router, Route } from 'react-router-dom';
import configureStore from 'redux-mock-store';
// Import testing modules
import { shallow, mount } from 'enzyme';
import { createMount, createShallow } from 'material-ui/test-utils'; // built on top of enzyme
import createRouterContext from 'react-router-test-context';


// ======================================================
// HELPER FUNCTIONS/CONSTANTS
// =========================

// ref: http://engineering.pivotal.io/post/react-integration-tests-with-enzyme/
export const asyncFlush = () => new Promise(resolve => setTimeout(resolve, 0));

const click = enzymeNode => {
  enzymeNode.simulate('click', { button: 0 }); // button: 0 means left mouse button
};

export const setValue = (enzymeNode, value) => {
  enzymeNode.simulate('focus');
  enzymeNode.simulate('change', { target: {value} });
};

export function fillInput(wrapper, fieldId, fieldInput) {
  const input = wrapper.find(`input#${fieldId}`);
  setValue(input, fieldInput);
};

export function getInput(wrapper, fieldId) {
  return wrapper.find(`input#${fieldId}`).text();
};

export function clickButton(wrapper, buttonId) {
  const button = wrapper.find(`Btn#${buttonId}`).find('button');
  click(button);
};

export function submitButton(wrapper, buttonId) {
  const button = wrapper.find(`Btn#${buttonId}`).find('button');
  button.simulate('submit', { button: 0 });
};

// ======================================================
// STORE AND CONTEXT
// =========================

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
    muiTheme: PropTypes.object
  }
};
const mockMiddlewares = [];
const configMockStore = configureStore(mockMiddlewares);
const mockInitialState = {};
const mockStore = configMockStore(mockInitialState);
// console.log('context', context);
const routerContext = createRouterContext();
// console.log('routerContext', routerContext);

// ======================================================
// MOUNTERS AND SHALLOWERS
// =========================

export const muiMounter = createMount();
export const muiShallower = createShallow();
export const muiMount = node => muiMounter(
  node,
  { ...routerContext }
);

export const mountConnected = (node) => muiMounter(
  <Provider store={mockStore}>{node}</Provider>
);

export const MuiMountWithContext = node => mount(node, context);
export const MuiShallowWithContext = node => shallow(node, context);


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
  const wrapper = muiMounter(
    <Provider store={mockStore}>
      <MemoryRouter keyLength={3} initialEntries={pathnames}>
        <Route render={() => node} />
      </MemoryRouter>
    </Provider>
  );
  wrapper.find('MemoryRouter').instance().history.push = mockFn;
  wrapper.update();
  return wrapper;
};
export const shallowWithRouterConnected = (node, pathnames = ['/'], key = 'testKey') => {
  const wrapper = muiMounter(
    <Provider store={mockStore}>
      <MemoryRouter keyLength={3} initialEntries={pathnames}>
        <Route render={() => node} />
      </MemoryRouter>
    </Provider>
  );
  wrapper.find('MemoryRouter').instance().history.push = mockFn;
  wrapper.update();
  return wrapper;
};