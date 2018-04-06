import React from 'react';
// Import components
import Sidebar from '../sidebar';

const mockFn = jest.fn();
const props = {
  sidebarOpen: true,
  closeSidebar: mockFn,
  openAuthPopup: mockFn,
  openNewPollPopup: mockFn,
  logoutUser: mockFn,
  authedUser: { name: 'somebody' }
};


describe('<Sidebar />', () => {
  let wrapper, cmpnt,
    historyPushSpy, closeSidebarSpy, openNewPollPopupSpy, logoutUserSpy;

  beforeAll(async () => {
    closeSidebarSpy = jest.spyOn(props, 'closeSidebar');
    openNewPollPopupSpy = jest.spyOn(props, 'openNewPollPopup');
    logoutUserSpy = jest.spyOn(props, 'logoutUser');
    wrapper = mountWithRouterConnected(<Sidebar {...props} />, ['/']);
    wrapper.find('MemoryRouter').instance().history.push = mockFn;
    historyPushSpy = jest.spyOn(wrapper.find('MemoryRouter').instance().history, 'push');
    wrapper.update();
    cmpnt = wrapper.find(Sidebar);
    await asyncFlush();
  });
  afterEach(() => jest.clearAllMocks());
  afterAll(() => wrapper.unmount());

  it('renders properly', () => {
    expect(cmpnt).toBeDefined();
    expect(cmpnt.prop('sidebarOpen')).toBe(true);
    expect(cmpnt.prop('authedUser')).toBeDefined();
    expect(typeof cmpnt.prop('closeSidebar')).toBe('function');
    expect(typeof cmpnt.prop('openAuthPopup')).toBe('function');
    expect(typeof cmpnt.prop('openNewPollPopup')).toBe('function');
    expect(typeof cmpnt.prop('logoutUser')).toBe('function');
    expect(typeof cmpnt.instance().handleToggleSidebarProfile).toBe('function');
    const drawer = cmpnt.find('Drawer');
    expect(drawer.prop('open')).toBe(true);
    expect(typeof drawer.prop('onClose')).toBe('function');
    expect(closeSidebarSpy).toHaveBeenCalledTimes(0);
    expect(openNewPollPopupSpy).toHaveBeenCalledTimes(0);
    expect(logoutUserSpy).toHaveBeenCalledTimes(0);
    expect(historyPushSpy).toHaveBeenCalledTimes(0);
  });
  it('state "sidebarProfileOpen" toggled by "handleToggleSidebarProfile" func', () => {
    const currentBoolean = wrapper.find('Sidebar').instance().state.sidebarProfileOpen;
    expect(cmpnt.instance().handleToggleSidebarProfile).toBeDefined();
    cmpnt.instance().handleToggleSidebarProfile();
    expect(wrapper.find('Sidebar').instance().state.sidebarProfileOpen).toBe(!currentBoolean);
    if (wrapper.find('Sidebar').instance().state.sidebarProfileOpen === true) {
      cmpnt.instance().handleToggleSidebarProfile();
    };
  });
  it('calls closeSidebar() on < click', () => {
    expect(closeSidebarSpy).not.toHaveBeenCalled();
    click(wrapper.find('ListItem#close'));
    expect(closeSidebarSpy).toHaveBeenCalled();
    expect(closeSidebarSpy).toHaveBeenCalledTimes(1);
  });

  describe('"Polls" button', () => {
    let pollsBtn;
    beforeEach(() => pollsBtn = wrapper.find('ListItem#polls'));

    it('calls closeSidebar() on click', () => {
      expect(closeSidebarSpy).not.toHaveBeenCalled();
      click(pollsBtn);
      expect(closeSidebarSpy).toHaveBeenCalled();
    });
    it('routes to /polls on click', () => {
      expect(historyPushSpy).not.toHaveBeenCalled();
      clickLink(pollsBtn);
      expect(historyPushSpy).toHaveBeenCalled();
      expect(historyPushSpy).toHaveBeenCalledWith('/polls');
    });
  });

  describe('"About" button', () => {
    let aboutBtn;
    beforeEach(() => aboutBtn = wrapper.find('ListItem#about'));

    it('calls closeSidebar() on click', () => {
      expect(closeSidebarSpy).not.toHaveBeenCalled();
      aboutBtn.prop('onClick')();
      expect(closeSidebarSpy).toHaveBeenCalled();
      expect(closeSidebarSpy).toHaveBeenCalledTimes(1);
    });
    it('routes to /about on click', () => {
      expect(historyPushSpy).not.toHaveBeenCalled();
      clickLink(aboutBtn);
      expect(historyPushSpy).toHaveBeenCalled();
      expect(historyPushSpy).toHaveBeenCalledWith('/about');
    });
  });

  describe('authed section', () => {
    it('renders properly', () => {
      expect(wrapper.find('List#auth-drawer')).toHaveLength(1);
      expect(wrapper.find('ListItem#toggle-profile')).toHaveLength(1);
      expect(wrapper.find('Sidebar').instance().state.sidebarProfileOpen).toBe(false);
      expect(wrapper.find('ListItem#open-new-poll-popup')).toHaveLength(1);
      expect(wrapper.find('ListItem#account')).toHaveLength(1);
    });
    it('"USERNAME" button calls handleToggleSidebarProfile() opening the sidebar profile dropdown menu', () => {
      expect(wrapper.find('Sidebar').instance().state.sidebarProfileOpen).toBe(false);
      click(wrapper.find('ListItem#toggle-profile'));
      expect(wrapper.find('Sidebar').instance().state.sidebarProfileOpen).toBe(true);
    });
    it('"Create Poll" button calls closeSidebar() & openNewPollPopup() on click', () => {
      expect(closeSidebarSpy).not.toHaveBeenCalled();
      expect(openNewPollPopupSpy).not.toHaveBeenCalled();
      click(wrapper.find('ListItem#open-new-poll-popup'));
      expect(closeSidebarSpy).toHaveBeenCalled();
      expect(openNewPollPopupSpy).toHaveBeenCalled();
    });
    it('"Account" button calls closeSidebar() & routes to /account on click', () => {
      expect(closeSidebarSpy).not.toHaveBeenCalled();
      expect(historyPushSpy).not.toHaveBeenCalled();
      click(wrapper.find('ListItem#account'));
      expect(closeSidebarSpy).toHaveBeenCalled();
      expect(historyPushSpy).toHaveBeenCalled();
      expect(historyPushSpy).toHaveBeenCalledWith('/account');
    });
    it('"Logout" button calls closeSidebar() & routes to / on click', () => {
      expect(closeSidebarSpy).not.toHaveBeenCalled();
      expect(historyPushSpy).not.toHaveBeenCalled();
      click(wrapper.find('ListItem#logout'));
      expect(closeSidebarSpy).toHaveBeenCalled();
      expect(historyPushSpy).toHaveBeenCalled();
      // expect(historyPushSpy).toHaveBeenCalledWith('/'); // wait for logoutUser() to be built which should route to / in redux-saga
    });
  });

  describe('UNauthed section', () => {
    let publicWrapper, closeSidebarSpy2, openAuthPopupSpy, publilcCmpnt;
    beforeEach(() => {
      let publicProps = {...props};
      publicProps.authedUser = null;
      closeSidebarSpy2 = jest.spyOn(publicProps, 'closeSidebar');
      openAuthPopupSpy = jest.spyOn(publicProps, 'openAuthPopup');
      publicWrapper = mountWithRouterConnected(<Sidebar {...publicProps} />, ['/']);
      publilcCmpnt = wrapper.find(Sidebar);
    });
    afterAll(() => publicWrapper.unmount());

    it('renders properly', () => {
      expect(publicWrapper.find('ListItem#open-auth-user-popup')).toHaveLength(1);
      expect(publicWrapper.find('List#auth-drawer')).toHaveLength(0);
      expect(publicWrapper.find('ListItem#toggle-profile')).toHaveLength(0);
      expect(publicWrapper.find('ListItem#open-new-poll-popup')).toHaveLength(0);
      expect(publicWrapper.find('ListItem#account')).toHaveLength(0);
      expect(publicWrapper.find('ListItem#open-auth-user-popup')).toHaveLength(1);
      expect(closeSidebarSpy2).toHaveBeenCalledTimes(0);
      expect(openAuthPopupSpy).toHaveBeenCalledTimes(0);
    });
    it('"Sign In" button closes sidebar & calls openAuthPopup() on click', () => {
      expect(closeSidebarSpy2).not.toHaveBeenCalled();
      expect(openAuthPopupSpy).not.toHaveBeenCalled();
      click(publicWrapper.find('ListItem#open-auth-user-popup'));
      expect(closeSidebarSpy2).toHaveBeenCalled();
      expect(openAuthPopupSpy).toHaveBeenCalled();
    });
  });
});
