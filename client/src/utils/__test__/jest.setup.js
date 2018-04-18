import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson, { mountToJson } from 'enzyme-to-json';


// ENZYME support for REACT 16 not complete. (re: rerender on prop changes)
// https://github.com/airbnb/enzyme/issues/1229
// https://github.com/airbnb/enzyme/issues/1553

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


// ==========================================================
// GLOBAL MOCKS

// Make Enzyme functions available in all test files without importing
global.localStorage = localStorageMock;
// SNAPSHOOTING
global.toJson = toJson;
global.mountToJson = mountToJson;
