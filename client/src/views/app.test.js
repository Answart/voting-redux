import React from 'react';
import { mountWithRouterConnected } from '../utils/__spec__/test.helper';
// import toJson from 'enzyme-to-json';
// Import components
import App from './app';

const mockFn = jest.fn;


describe('<App />', () => {
  let wrapper, historyPushSpy;
  beforeAll(() => {
    wrapper = mountWithRouterConnected(<App />);
    wrapper.find('MemoryRouter').instance().history.push = mockFn;
    // watching routing change
    historyPushSpy = jest.spyOn(wrapper.find('MemoryRouter').instance().history, 'push');
    wrapper.update();
  });

  it('renders properly', () => {
    expect(wrapper).toBeDefined();
    expect(wrapper.contains(<App />)).toBe(true);
    const appInstance = wrapper.find('App').instance();
    expect(Object.keys(appInstance.state).length).toBe(2);
    expect(appInstance.state.authPopupOpen).toBe(false);
    expect(appInstance.state.newPollPopupOpen).toBe(false);
    expect(appInstance.handleOpenAuthPopup).toBeDefined();
    expect(appInstance.handleOpenNewPollPopup).toBeDefined();
  });

  it('contains all pages', () => {
    expect(wrapper.find('Header')).toHaveLength(0);
    expect(wrapper.find('HomePage')).toHaveLength(1);
    expect(wrapper.find('AboutPage')).toHaveLength(0);
    expect(wrapper.find('AccountPage')).toHaveLength(0);
    expect(wrapper.find('PollPage')).toHaveLength(0);
    expect(wrapper.find('PollsListPage')).toHaveLength(0);
    expect(wrapper.find('Footer')).toHaveLength(0);
    // expect(wrapper.find(NotFoundPage)).toHaveLength(1);
  });

  it('contains all popups', () => {
    expect(wrapper.find('AuthUserPopup')).toHaveLength(0);
    expect(wrapper.find('NewPollPopup')).toHaveLength(0);
    expect(wrapper.find('VotePollPopup')).toHaveLength(0);
    // expect(wrapper.find(NotFoundPage)).toHaveLength(1);
  });

  it('"handleOpenAuthPopup" changes state', () => {
    const appInstance = wrapper.find('App').instance();
    expect(appInstance.state.authPopupOpen).toBe(false);
    expect(appInstance.handleOpenAuthPopup).toBeDefined();
    appInstance.handleOpenAuthPopup();
    wrapper.update();
    expect(wrapper.find('App').instance().state.authPopupOpen).toBe(true);
  });

  it('"handleOpenNewPollPopup" changes state', () => {
    const appInstance = wrapper.find('App').instance();
    expect(appInstance.state.newPollPopupOpen).toBe(false);
    expect(appInstance.handleOpenNewPollPopup).toBeDefined();
    appInstance.handleOpenNewPollPopup();
    wrapper.update();
    expect(wrapper.find('App').instance().state.newPollPopupOpen).toBe(true);
  });

  afterAll(() => {
    mounter.cleanUp();
    spy.mockClear()
  });
});
