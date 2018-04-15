import React from 'react';
// Import components
import App from './app';
import Header from './components/header';
import Footer from './components/footer';
import Sidebar from './components/sidebar';

const mockFn = jest.fn();


describe('<App />', () => {
  let wrapper, historyPushSpy;
  beforeAll(() => {
    wrapper = mountWithRouterConnected(<App />);
    wrapper.find('MemoryRouter').instance().history.push = mockFn;
    historyPushSpy = jest.spyOn(wrapper.find('MemoryRouter').instance().history, 'push');
    wrapper.update();
  });

  it('renders properly', () => {
    expect(wrapper).toBeDefined();
    expect(wrapper.contains(<App />)).toBe(true);
    const appInstance = wrapper.find('App').instance();
    expect(Object.keys(appInstance.state)).toHaveLength(4);
    expect(appInstance.state.sidebarOpen).toBe(false);
    expect(appInstance.state.authUserPopupOpen).toBe(false);
    expect(appInstance.state.newPollPopupOpen).toBe(false);
    expect(appInstance.state.votePollPopupOpen).toBe(false);
    expect(typeof appInstance.handleSidebar).toBe('function');
    expect(typeof appInstance.handleOpenPopup).toBe('function');
    expect(typeof appInstance.handleClosePopup).toBe('function');
    expect(wrapper.find(Header)).toHaveLength(1);
    expect(wrapper.find(Sidebar)).toHaveLength(1);
    expect(wrapper.find(Footer)).toHaveLength(1);
    expect(wrapper.find('AuthUserPopup')).toHaveLength(1);
    expect(wrapper.find('NewPollPopup')).toHaveLength(1);
    expect(wrapper.find('VotePollPopup')).toHaveLength(1);
  });

  describe('state', () => {
    let appInstance, state;
    beforeEach(() => {
      appInstance = wrapper.find('App').instance();
      state = appInstance.state;
    })

    describe('sidebarOpen', () => {
      it('made true by handleOpenSidebar(true) rendering "Sidebar"', () => {
        appInstance.handleSidebar(true);
        wrapper.update();
        expect(wrapper.find('App').instance().state.sidebarOpen).toBe(true);
      });
      it('made false by handleSidebar(false)', () => {
        appInstance.handleSidebar(false);
        wrapper.update();
        expect(wrapper.find('App').instance().state.sidebarOpen).toBe(false);
      });
      it('toggled by handleSidebar()', () => {
        const currentBoolean = wrapper.find('App').instance().state.sidebarOpen
        appInstance.handleSidebar();
        wrapper.update();
        expect(wrapper.find('App').instance().state.sidebarOpen).toBe(!currentBoolean);
      });
    });

    describe('authUserPopupOpen', () => {
      it('made true by handleOpenPopup("authUserPopupOpen") rendering "AuthUserPopup"', () => {
        appInstance.handleOpenPopup('authUserPopupOpen');
        wrapper.update();
        expect(wrapper.find('App').instance().state.authUserPopupOpen).toBe(true);
      });
      it('made false by handleClosePopup("authUserPopupOpen")', () => {
        appInstance.handleClosePopup('authUserPopupOpen');
        wrapper.update();
        expect(wrapper.find('App').instance().state.authUserPopupOpen).toBe(false);
      });
    });

    describe('newPollPopupOpen', () => {
      it('made true by handleOpenPopup("newPollPopupOpen") rendering "NewPollPopup"', () => {
        appInstance.handleOpenPopup('newPollPopupOpen');
        wrapper.update();
        expect(wrapper.find('App').instance().state.newPollPopupOpen).toBe(true);
      });
      it('made false by handleClosePopup("newPollPopupOpen")', () => {
        appInstance.handleClosePopup('newPollPopupOpen');
        wrapper.update();
        expect(wrapper.find('App').instance().state.newPollPopupOpen).toBe(false);
      });
    });

    describe('votePollPopupOpen', () => {
      it('made true by handleOpenVotePollPopup(ID) rendering "VotePollPopup"', () => {
        appInstance.handleOpenVotePollPopup('1234');
        wrapper.update();
        expect(wrapper.find('App').instance().state.votePollPopupOpen).toBe(true);
      });
      it('made false by handleClosePopup("votePollPopupOpen")', () => {
        appInstance.handleClosePopup('votePollPopupOpen');
        wrapper.update();
        expect(wrapper.find('App').instance().state.votePollPopupOpen).toBe(false);
      });
    });
  });


  describe('pages', () => {
    it('renders static components', () => {
      expect(wrapper.find(Header)).toHaveLength(1);
      expect(wrapper.find(Sidebar)).toHaveLength(1);
      expect(wrapper.find(Footer)).toHaveLength(1);
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
    it('renders AccountPage at route /account', () => {
      const accountWrapper = mountWithRouterConnected(<App />, ['/account']);
      expect(accountWrapper.find('HomePage')).toHaveLength(0);
      expect(accountWrapper.find('AboutPage')).toHaveLength(0);
      expect(accountWrapper.find('AccountPage')).toHaveLength(1);
      expect(accountWrapper.find('PollPage')).toHaveLength(0);
      expect(accountWrapper.find('PollsListPage')).toHaveLength(0);
    });
    it('renders PollPage at route /poll', () => {
      const props = { location: { pathname: '/poll/1234' }};
      const pollWrapper = mountWithRouterConnected(<App {...props} />, ['/poll/1234']);
      expect(pollWrapper.find('HomePage')).toHaveLength(0);
      expect(pollWrapper.find('AboutPage')).toHaveLength(0);
      expect(pollWrapper.find('AccountPage')).toHaveLength(0);
      expect(pollWrapper.find('PollPage')).toHaveLength(1);
      expect(pollWrapper.find('PollsListPage')).toHaveLength(0);
    });
    it('renders PollsListPage at route /polls', () => {
      const pollslistWrapper = mountWithRouterConnected(<App />, ['/polls']);
      expect(pollslistWrapper.find('HomePage')).toHaveLength(0);
      expect(pollslistWrapper.find('AboutPage')).toHaveLength(0);
      expect(pollslistWrapper.find('AccountPage')).toHaveLength(0);
      expect(pollslistWrapper.find('PollPage')).toHaveLength(0);
      expect(pollslistWrapper.find('PollsListPage')).toHaveLength(1);
    });
  });
});
