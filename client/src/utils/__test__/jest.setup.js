// this helps: https://github.com/facebook/jest/issues/2081#issuecomment-332406033
import 'raf/polyfill';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { mountWithRouterConnected, mountConnected, asyncFlush } from './test.helper';
// import toJson, { mountToJson } from 'enzyme-to-json';

// ENZYME support for REACT 16 not complete. (re: rerender on prop changes)
// https://github.com/airbnb/enzyme/issues/1229
// https://github.com/airbnb/enzyme/issues/1553


// Make Enzyme functions available in all test files without importing
global.mountWithRouterConnected = mountWithRouterConnected;
global.mountConnected = mountConnected;
global.asyncFlush = asyncFlush;

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
