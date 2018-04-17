import React from 'react';
import { Link } from 'react-router-dom';
// Import components
import Header from '../header';

const mockFn = jest.fn();
let props = {
  logoImgUrl: 'www.google.com',
  appName: 'Voting Redux',
  toggleSidebar: mockFn,
  openAuthPopup: mockFn,
  openNewPollPopup: mockFn,
  logoutUser: mockFn,
};


describe('<Header />', () => {
  let wrapper, cmpnt,
    historyPushSpy, toggleSidebarSpy, openNewPollPopupSpy, logoutUserSpy,
    handleMenuPopoverOpenSpy, handleMenuPopoverCloseSpy, openAuthPopupSpy;

  beforeAll(async () => {
    toggleSidebarSpy = jest.spyOn(props, 'toggleSidebar');
    openNewPollPopupSpy = jest.spyOn(props, 'openNewPollPopup');
    logoutUserSpy = jest.spyOn(props, 'logoutUser');
    openAuthPopupSpy = jest.spyOn(props, 'openAuthPopup');
    wrapper = mountWithRouterConnected(<Header {...props} />);
    wrapper.find('MemoryRouter').instance().history.push = mockFn;
    historyPushSpy = jest.spyOn(wrapper.find('MemoryRouter').instance().history, 'push');
    wrapper.update();
    await wrapper.find(Header).instance().componentDidMount();
    cmpnt = wrapper.find('Header');
    await asyncFlush();
  });
  afterEach(() => jest.clearAllMocks());

  it('renders properly', () => {
    expect(cmpnt).toHaveLength(1);
    expect(cmpnt.prop('logoImgUrl')).toBe('www.google.com');
    expect(cmpnt.prop('appName')).toBe('Voting Redux');
    expect(cmpnt.prop('authedUser')).toBeDefined();
    expect(typeof cmpnt.prop('toggleSidebar')).toBe('function');
    expect(typeof cmpnt.prop('openAuthPopup')).toBe('function');
    expect(typeof cmpnt.prop('openNewPollPopup')).toBe('function');
    expect(typeof cmpnt.prop('logoutUser')).toBe('function');
    expect(typeof cmpnt.instance().handleMenuPopoverOpen).toBe('function');
    expect(typeof cmpnt.instance().handleMenuPopoverClose).toBe('function');
  });
  it('state "menuPopupAnchorEl" made null by "handleMenuPopoverClose" func', () => {
    expect(cmpnt.instance().handleMenuPopoverClose).toBeDefined();
    cmpnt.instance().handleMenuPopoverClose();
    wrapper.update();
    expect(cmpnt.instance().state.menuPopupAnchorEl).toBe(null);
  });
  it('left side renders properly', () => {
    const link = cmpnt.find('Link.header-logo');
    expect(link.prop('to')).toBe('/');
    expect(link.find('img').prop('src')).toBe('www.google.com');
    expect(link.find('img').prop('alt')).toBe('Voting Redux');
    expect(link.find('h1').text()).toBe('Voting Redux');
  });

  describe('right side (small)', () => {
    let rightSideSmll, rMenu;
    beforeEach(() => {
      rightSideSmll = cmpnt.find('.header-nav-sm');
      rMenu = rightSideSmll.find('Menu');
    });

    it('renders properly', () => {
      expect(rightSideSmll.find('IconButton')).toHaveLength(1);
      expect(rMenu).toHaveLength(1);
      expect(typeof rMenu.prop('onClick')).toBe('function');
    });
    it('clicking calls toggleSidebar()', () => {
      expect(toggleSidebarSpy).not.toHaveBeenCalled();
      click(rMenu);
      expect(toggleSidebarSpy).toHaveBeenCalled();
      expect(toggleSidebarSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('right side (large)', () => {
    let rightSideLrg;
    beforeEach(() => rightSideLrg = cmpnt.find('nav.header-nav'));

    it('renders properly', () => {
      expect(rightSideLrg).toHaveLength(1);
      const aboutBtn = rightSideLrg.find('Btn#header-nav-about');
      expect(aboutBtn).toHaveLength(1);
      expect(aboutBtn.prop('variant')).toBe('flat');
      expect(aboutBtn.prop('size')).toBe('medium');
      expect(aboutBtn.prop('text')).toBe('About');
      expect(aboutBtn.prop('to')).toBe('/about');
      const pollsBtn = rightSideLrg.find('Btn#header-nav-polls');
      expect(pollsBtn).toHaveLength(1);
      expect(pollsBtn.prop('variant')).toBe('flat');
      expect(pollsBtn.prop('size')).toBe('medium');
      expect(pollsBtn.prop('text')).toBe('List');
      expect(pollsBtn.prop('to')).toBe('/polls');
    });
    it('"About" Btn routes to /about', () => {
      expect(historyPushSpy).not.toHaveBeenCalled();
      clickLink(rightSideLrg, 'header-nav-about');
      expect(historyPushSpy).toHaveBeenCalled();
      expect(historyPushSpy).toHaveBeenCalledTimes(1);
      expect(historyPushSpy).toHaveBeenCalledWith('/about');
    });
    it('"List" Btn routes to /polls', () => {
      expect(historyPushSpy).not.toHaveBeenCalled();
      clickLink(rightSideLrg, 'header-nav-polls');
      expect(historyPushSpy).toHaveBeenCalled();
      expect(historyPushSpy).toHaveBeenCalledTimes(1);
      expect(historyPushSpy).toHaveBeenCalledWith('/polls');
    });


    describe('UNauthed state', () => {
      it('renders properly', () => {
        const btn = wrapper.find('nav.header-nav').find('Btn#header-nav-signin');
        expect(btn).toHaveLength(1);
        expect(btn.prop('variant')).toBe('flat');
        expect(btn.prop('size')).toBe('medium');
        expect(btn.prop('text')).toBe('Sign in');
        expect(typeof btn.prop('onClick')).toBe('function');
      });
      it('calls openAuthPopup() on click', () => {
        expect(openAuthPopupSpy).not.toHaveBeenCalled();
        clickButton(wrapper, 'header-nav-signin');
        expect(openAuthPopupSpy).toHaveBeenCalled();
        expect(openAuthPopupSpy).toHaveBeenCalledTimes(1);
      });
    });

    describe('authed state', () => {
      let authedWrapper, authcmpnt, openNewPollPopupSpy2, logoutUserSpy2, historyPushSpy2;
      beforeAll(async () => {
        openNewPollPopupSpy2 = jest.spyOn(props, 'openNewPollPopup');
        logoutUserSpy2 = jest.spyOn(props, 'logoutUser');
        authedWrapper = mountWithRouterConnected(<Header {...props} />, ['/'], false);
        authedWrapper.find('MemoryRouter').instance().history.push = mockFn;
        historyPushSpy2 = jest.spyOn(authedWrapper.find('MemoryRouter').instance().history, 'push');
        authedWrapper.update();
        await authedWrapper.find(Header).instance().componentDidMount();
        authcmpnt = authedWrapper.find('Header');
      });
      afterAll(() => authedWrapper.unmount());

      describe('navi button (header-nav-user)', () => {
        let btn;
        beforeEach(() => btn = authedWrapper.find('Button#header-nav-user'));

        it('renders properly', () => {
          expect(btn).toHaveLength(1);
          expect(btn.prop('aria-owns')).toBe(null);
          expect(btn.prop('aria-haspopup')).toBe(true);
          expect(typeof btn.prop('onClick')).toBe('function');
          expect(btn.text()).toBe('Alexandra');
        });
        it('calls handleMenuPopoverOpen() on click', () => {
          expect(authcmpnt.instance().state.menuPopupAnchorEl).toBe(null);
          click(btn);
          expect(authcmpnt.instance().state.menuPopupAnchorEl).toBeDefined();
          expect(authcmpnt.instance().state.menuPopupAnchorEl).not.toBe(null);
        });
      });

      describe('popover', () => {
        let popover, mItemCreatePollPopup, mItemAccount, mItemLogout;
        beforeEach(async () => {
          authedWrapper.find('Button#header-nav-user').simulate('click', { button: 0 });
          popover = authedWrapper.find('Popover#auth-menu');
          mItemCreatePollPopup = popover.find('MenuItem#create-poll-popup');
          mItemAccount = popover.find('MenuItem#account');
          mItemLogout = popover.find('MenuItem#logout');
        });

        it('renders properly', () => {
          expect(popover).toHaveLength(1);
          expect(popover.prop('id')).toBe('auth-menu');
          expect(popover.prop('anchorEl')).toBeDefined();
          expect(popover.prop('open')).toBe(true);
          expect(typeof popover.prop('open')).toBe('boolean');
          expect(typeof popover.prop('anchorEl')).toBe('object');
          expect(typeof popover.prop('onClose')).toBe('function');
          expect(popover.prop('id')).toBe('auth-menu');
          expect(mItemCreatePollPopup).toBeDefined();
          expect(typeof mItemCreatePollPopup.prop('onClick')).toBe('function');
          expect(mItemCreatePollPopup.text()).toBe('Create Poll');
          expect(mItemAccount).toHaveLength(1);
          expect(mItemAccount.prop('component')).toBe(Link);
          expect(typeof mItemAccount.prop('component')).toBe('function');
          expect(mItemAccount.prop('to')).toBe('/account');
          expect(mItemAccount.text()).toBe('Profile');
          expect(mItemLogout).toHaveLength(1);
          expect(typeof mItemLogout.prop('onClick')).toBe('function'); //logoutUser
          expect(mItemLogout.text()).toBe('Logout');
        });
        it('"Create Poll" calls openNewPollPopup() on click', () => {
          expect(openNewPollPopupSpy2).not.toHaveBeenCalled();
          click(mItemCreatePollPopup);
          expect(openNewPollPopupSpy2).toHaveBeenCalled();
          expect(openNewPollPopupSpy2).toHaveBeenCalledTimes(1);
        });
        it('"Profile" routes to /account on click', () => {
          expect(historyPushSpy2).not.toHaveBeenCalled();
          click(mItemAccount);
          expect(historyPushSpy2).toHaveBeenCalled();
          expect(historyPushSpy2).toHaveBeenCalledTimes(1);
          expect(historyPushSpy2).toHaveBeenCalledWith('/account');
        });
        it('"Logout" calls logoutUser() on click', () => {
          expect(logoutUserSpy2).not.toHaveBeenCalled();
          click(mItemLogout);
          expect(logoutUserSpy2).toHaveBeenCalled();
          expect(logoutUserSpy2).toHaveBeenCalledTimes(1);
        });
      });
    });
  });
});
