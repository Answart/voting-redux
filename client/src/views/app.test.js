import React from 'react';
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
    expect(Object.keys(appInstance.state)).toHaveLength(3);
    expect(appInstance.state.sidebarOpen).toBe(false);
    expect(appInstance.state.authPopupOpen).toBe(false);
    expect(appInstance.state.newPollPopupOpen).toBe(false);
    expect(appInstance.handleOpenAuthPopup).toBeDefined();
    expect(appInstance.handleOpenNewPollPopup).toBeDefined();
    expect(appInstance.handleOpenSidebar).toBeDefined();
  });

  it('contains all popups', () => {
    expect(wrapper.find('AuthUserPopup')).toHaveLength(0);
    expect(wrapper.find('NewPollPopup')).toHaveLength(1);
    expect(wrapper.find('VotePollPopup')).toHaveLength(0);
    // expect(wrapper.find(NotFoundPage)).toHaveLength(1);
  });

  describe('state', () => {
    let appInstance, state;
    beforeEach(() => {
      appInstance = wrapper.find('App').instance();
      state = appInstance.state;
    })

    describe('authPopupOpen', () => {
      it('made true by "handleOpenAuthPopup" func', () => {
        expect(appInstance.handleOpenAuthPopup).toBeDefined();
        appInstance.handleOpenAuthPopup();
        wrapper.update();
        expect(wrapper.find('App').instance().state.authPopupOpen).toBe(true);
      });
      it('made false by "handleCloseAuthPopup" func', () => {
        expect(appInstance.handleCloseAuthPopup).toBeDefined();
        appInstance.handleCloseAuthPopup();
        wrapper.update();
        expect(wrapper.find('App').instance().state.authPopupOpen).toBe(false);
      });
      it('renders "AuthUserPopup" when true', () => {
        expect(appInstance.handleOpenAuthPopup).toBeDefined();
        appInstance.handleOpenAuthPopup();
        wrapper.update();
        expect(wrapper.find('App').instance().state.authPopupOpen).toBe(true);
        expect(wrapper.find('AuthUserPopup')).toHaveLength(0); // need to make AuthUserPopup
      });
    });

    describe('newPollPopupOpen', () => {
      it('made true by "handleOpenNewPollPopup" func', () => {
        expect(appInstance.handleOpenNewPollPopup).toBeDefined();
        appInstance.handleOpenNewPollPopup();
        wrapper.update();
        expect(wrapper.find('App').instance().state.newPollPopupOpen).toBe(true);
      });
      it('made false by "handleCloseNewPollPopup" func', () => {
        expect(appInstance.handleCloseNewPollPopup).toBeDefined();
        appInstance.handleCloseNewPollPopup();
        wrapper.update();
        expect(wrapper.find('App').instance().state.newPollPopupOpen).toBe(false);
      });
      it('renders "NewPollPopup" when true', () => {
        expect(appInstance.handleCloseNewPollPopup).toBeDefined();
        appInstance.handleCloseNewPollPopup();
        wrapper.update();
        expect(wrapper.find('App').instance().state.authPopupOpen).toBe(true);
        expect(wrapper.find('NewPollPopup')).toHaveLength(1);
      });
    });

    describe('sidebarOpen', () => {
      it('made true by "handleOpenSidebar" func', () => {
        expect(appInstance.handleOpenSidebar).toBeDefined();
        appInstance.handleOpenSidebar();
        wrapper.update();
        expect(wrapper.find('App').instance().state.sidebarOpen).toBe(true);
      });
      it('made false by "handleCloseSidebar" func', () => {
        expect(appInstance.handleCloseSidebar).toBeDefined();
        appInstance.handleCloseSidebar();
        wrapper.update();
        expect(wrapper.find('App').instance().state.sidebarOpen).toBe(false);
      });
      it('toggled by "handleToggleSidebar" func', () => {
        const currentBoolean = wrapper.find('App').instance().state.sidebarOpen
        expect(appInstance.handleToggleSidebar).toBeDefined();
        appInstance.handleToggleSidebar();
        wrapper.update();
        expect(wrapper.find('App').instance().state.sidebarOpen).toBe(!currentBoolean);
      });
      it('renders "Sidebar" when true', () => {
        expect(appInstance.handleOpenSidebar).toBeDefined();
        appInstance.handleOpenSidebar();
        wrapper.update();
        expect(wrapper.find('App').instance().state.sidebarOpen).toBe(true);
        expect(wrapper.find('Sidebar')).toHaveLength(0); // need to make Sidebar
      });
    });
  });

  describe('pages', () => {
    it('renders static components', () => {
      expect(wrapper.find('Header')).toHaveLength(1);
      expect(wrapper.find('Sidebar')).toHaveLength(0); // need to make Sidebar
      expect(wrapper.find('Footer')).toHaveLength(1);
    });

    it('renders HomePage at route /', () => {
      expect(wrapper.find('HomePage')).toHaveLength(1);
      expect(wrapper.find('AboutPage')).toHaveLength(0);
      expect(wrapper.find('AccountPage')).toHaveLength(0);
      expect(wrapper.find('PollPage')).toHaveLength(0);
      expect(wrapper.find('PollsListPage')).toHaveLength(0);
    });
    it('renders AboutPage at route /about', () => {
      const aboutWrapper = mountWithRouterConnected(<App />, ['/about']);
      expect(aboutWrapper.find('HomePage')).toHaveLength(0);
      expect(aboutWrapper.find('AboutPage')).toHaveLength(1);
      expect(aboutWrapper.find('AccountPage')).toHaveLength(0);
      expect(aboutWrapper.find('PollPage')).toHaveLength(0);
      expect(aboutWrapper.find('PollsListPage')).toHaveLength(0);
    });
    // it('renders AccountPage at route /account', () => {
    //   const accountWrapper = mountWithRouterConnected(<App />, ['/account']);
    //   expect(accountWrapper.find('HomePage')).toHaveLength(0);
    //   expect(accountWrapper.find('AboutPage')).toHaveLength(0);
    //   expect(accountWrapper.find('AccountPage')).toHaveLength(0);
    //   expect(accountWrapper.find('PollPage')).toHaveLength(0);
    //   expect(accountWrapper.find('PollsListPage')).toHaveLength(0);
    // });
    // it('renders PollPage at route /poll', () => {
    //   const pollWrapper = mountWithRouterConnected(<App />, ['/poll']);
    //   expect(pollWrapper.find('HomePage')).toHaveLength(0);
    //   expect(pollWrapper.find('AboutPage')).toHaveLength(0);
    //   expect(pollWrapper.find('AccountPage')).toHaveLength(0);
    //   expect(pollWrapper.find('PollPage')).toHaveLength(0);
    //   expect(pollWrapper.find('PollsListPage')).toHaveLength(0);
    // });
    // it('renders PollsListPage at route /polls', () => {
    //   const pollslistWrapper = mountWithRouterConnected(<App />, ['/polls']);
    //   expect(pollslistWrapper.find('HomePage')).toHaveLength(0);
    //   expect(pollslistWrapper.find('AboutPage')).toHaveLength(0);
    //   expect(pollslistWrapper.find('AccountPage')).toHaveLength(0);
    //   expect(pollslistWrapper.find('PollPage')).toHaveLength(0);
    //   expect(pollslistWrapper.find('PollsListPage')).toHaveLength(0);
    // });
  });

});
