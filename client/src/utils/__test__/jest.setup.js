// this helps: https://github.com/facebook/jest/issues/2081#issuecomment-332406033
import 'raf/polyfill';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {
  asyncFlush, fillInput, fillFormInput,
  mountWithRouterConnected, mountConnected, muiMounter, mountWithRouter,
  click, clickButton, clickLink, submit, submitButton
} from './test.helper';
import toJson, { mountToJson } from 'enzyme-to-json';


// Configure testing
configure({ adapter: new Adapter() });

// mock popper.js to calm jest-jasmine2 "document.createRange is not a function" error
jest.mock('popper.js', () => {
  const PopperJS = jest.requireActual('popper.js');

  return class {
    static placements = PopperJS.placements;

    constructor() {
      return {
        destroy: () => {},
        scheduleUpdate: () => {}
      };
    }
  };
});

var localStorageMock = (function() {
  var store = {};
  return {
    getItem: function(key) {
      return store[key] || null;
    },
    setItem: function(key, value) {
      store[key] = value.toString();
    },
    removeItem: function(key) {
      delete store[key];
    },
    clear: function() {
      store = {};
    }
  };
})();

// ENZYME support for REACT 16 not complete. (re: rerender on prop changes)
// https://github.com/airbnb/enzyme/issues/1229
// https://github.com/airbnb/enzyme/issues/1553

// Make Enzyme functions available in all test files without importing
global.localStorage = localStorageMock;
global.asyncFlush = asyncFlush;
global.fillInput = fillInput;
global.fillFormInput = fillFormInput;
// MOUNTING
global.mountWithRouterConnected = mountWithRouterConnected;
global.mountConnected = mountConnected;
global.muiMounter = muiMounter;
global.mountWithRouter = mountWithRouter;
// CLICKING
global.click = click;
global.submit = submit;
global.submitButton = submitButton;
global.clickButton = clickButton;
global.clickLink = clickLink;
// SNAPSHOOTING
global.toJson = toJson;
global.mountToJson = mountToJson;
