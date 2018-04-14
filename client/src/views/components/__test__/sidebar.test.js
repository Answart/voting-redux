import React from 'react';
// Import components
// import { userActions } from '../../../core/users';
import Sidebar from '../sidebar';

const mockFn = jest.fn();
let props = {
  sidebarOpen: true,
  closeSidebar: mockFn,
  openAuthPopup: mockFn,
  openNewPollPopup: mockFn,
  logoutUser: mockFn
};


describe('<Sidebar />', () => {
  let wrapper, cmpnt,
    historyPushSpy, closeSidebarSpy, openNewPollPopupSpy, logoutUserSpy, openAuthPopupSpy;

  beforeAll(async () => {
    closeSidebarSpy = jest.spyOn(props, 'closeSidebar');
    openNewPollPopupSpy = jest.spyOn(props, 'openNewPollPopup');
    logoutUserSpy = jest.spyOn(props, 'logoutUser');
    openAuthPopupSpy = jest.spyOn(props, 'openAuthPopup');
    wrapper = mountWithRouterConnected(<Sidebar {...props} />);
    wrapper.find('MemoryRouter').instance().history.push = mockFn;
    historyPushSpy = jest.spyOn(wrapper.find('MemoryRouter').instance().history, 'push');
    wrapper.update();
    await wrapper.find(Sidebar).instance().componentDidMount();
    cmpnt = wrapper.find('Sidebar');
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

  describe('UNauthed section', () => {
    it('renders properly', () => {
      expect(wrapper.find('ListItem#open-auth-user-popup')).toHaveLength(1);
      expect(wrapper.find('List#auth-drawer')).toHaveLength(0);
      expect(wrapper.find('ListItem#toggle-profile')).toHaveLength(0);
      expect(wrapper.find('ListItem#open-new-poll-popup')).toHaveLength(0);
      expect(wrapper.find('ListItem#account')).toHaveLength(0);
      expect(wrapper.find('ListItem#open-auth-user-popup')).toHaveLength(1);
      expect(closeSidebarSpy).not.toHaveBeenCalled();
      expect(openAuthPopupSpy).not.toHaveBeenCalled();
    });
    it('"Sign In" button closes sidebar & calls openAuthPopup() on click', () => {
      expect(closeSidebarSpy).not.toHaveBeenCalled();
      expect(openAuthPopupSpy).not.toHaveBeenCalled();
      click(wrapper.find('ListItem#open-auth-user-popup'));
      expect(closeSidebarSpy).toHaveBeenCalled();
      expect(openAuthPopupSpy).toHaveBeenCalled();
    });
  });


  describe('authed section', () => {
    let authedWrapper, closeSidebarSpy2, historyPushSpy2, openNewPollPopupSpy2, logoutUserSpy2, openAuthPopupSpy2;
    beforeAll(async () => {
      closeSidebarSpy2 = jest.spyOn(props, 'closeSidebar');
      openNewPollPopupSpy2 = jest.spyOn(props, 'openNewPollPopup');
      logoutUserSpy2 = jest.spyOn(props, 'logoutUser');
      openAuthPopupSpy2 = jest.spyOn(props, 'openAuthPopup');
      authedWrapper = mountWithRouterConnected(<Sidebar {...props} />, ['/'], false);
      authedWrapper.find('MemoryRouter').instance().history.push = mockFn;
      historyPushSpy2 = jest.spyOn(authedWrapper.find('MemoryRouter').instance().history, 'push');
      authedWrapper.update();
      await authedWrapper.find(Sidebar).instance().componentDidMount();
    });
    afterAll(() => authedWrapper.unmount());

    it('renders properly', () => {
      expect(authedWrapper.find('List#auth-drawer')).toHaveLength(1);
      expect(authedWrapper.find('ListItem#toggle-profile')).toHaveLength(1);
      expect(authedWrapper.find('Sidebar').instance().state.sidebarProfileOpen).toBe(false);
      expect(authedWrapper.find('ListItem#open-new-poll-popup')).toHaveLength(0);
      expect(authedWrapper.find('ListItem#account')).toHaveLength(0);
    });
    it('"USERNAME" button calls handleToggleSidebarProfile() opening the sidebar profile dropdown menu', () => {
      expect(authedWrapper.find('Sidebar').instance().state.sidebarProfileOpen).toBe(false);
      click(authedWrapper.find('ListItem#toggle-profile'));
      expect(authedWrapper.find('Sidebar').instance().state.sidebarProfileOpen).toBe(true);
      expect(authedWrapper.find('ListItem#open-new-poll-popup')).toHaveLength(1);
      expect(authedWrapper.find('ListItem#account')).toHaveLength(1);
    });
    it('"Create Poll" button calls closeSidebar() & openNewPollPopup() on click', () => {
      expect(closeSidebarSpy2).not.toHaveBeenCalled();
      expect(openNewPollPopupSpy2).not.toHaveBeenCalled();
      click(authedWrapper.find('ListItem#open-new-poll-popup'));
      expect(closeSidebarSpy2).toHaveBeenCalled();
      expect(openNewPollPopupSpy2).toHaveBeenCalled();
    });
    it('"Account" button calls closeSidebar() & routes to /account on click', () => {
      expect(closeSidebarSpy2).not.toHaveBeenCalled();
      expect(historyPushSpy2).not.toHaveBeenCalled();
      click(authedWrapper.find('ListItem#account'));
      expect(closeSidebarSpy2).toHaveBeenCalled();
      expect(historyPushSpy2).toHaveBeenCalled();
      expect(historyPushSpy2).toHaveBeenCalledWith('/account');
    });
    it('"Logout" button calls closeSidebar() on click', () => {
      expect(closeSidebarSpy2).not.toHaveBeenCalled();
      expect(historyPushSpy2).not.toHaveBeenCalled();
      expect(logoutUserSpy2).not.toHaveBeenCalled();
      click(authedWrapper.find('ListItem#logout'));
      expect(closeSidebarSpy2).toHaveBeenCalled();
      expect(logoutUserSpy2).toHaveBeenCalled();
    });
  });
});
