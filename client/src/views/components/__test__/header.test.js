import React from 'react';
import { Link } from 'react-router-dom';
import { mountToJson } from 'enzyme-to-json';
import { mountWithRouterConnected, asyncFlush, click, clickButton } from '../../../utils/__test__/test.helper';
// Import components
import Header from '../header';

const mockFn = jest.fn();
const props = {
  logoImgUrl: 'www.google.com',
  appName: 'Voting Redux',
  toggleSidebar: mockFn,
  openAuthPopup: mockFn,
  openNewPollPopup: mockFn,
  logoutUser: mockFn,
  authedUser: { name: 'somebody' }
};


describe('<Header />', () => {
  let wrapper, cmpnt,
    historyPushSpy, toggleSidebarSpy, openNewPollPopupSpy, logoutUserSpy;

  beforeAll(async () => {
    toggleSidebarSpy = jest.spyOn(props, 'toggleSidebar');
    openNewPollPopupSpy = jest.spyOn(props, 'openNewPollPopup');
    logoutUserSpy = jest.spyOn(props, 'logoutUser');
    wrapper = mountWithRouterConnected(<Header {...props} />);
    wrapper.find('MemoryRouter').instance().history.push = mockFn;
    historyPushSpy = jest.spyOn(wrapper.find('MemoryRouter').instance().history, 'push');
    jest.restoreAllMocks();
    wrapper.update();
    cmpnt = wrapper.find('Header');
    await asyncFlush();
  });

  it('renders properly', () => {
    expect(cmpnt).toBeDefined();
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
    expect(wrapper.find('Header').instance().state.menuPopupAnchorEl).toBe(null);
  });

  it('left side renders properly', () => {
    const link = wrapper.find('Link.header-logo');
    expect(link.prop('to')).toBe('/');
    expect(link.find('img').prop('src')).toBe('www.google.com');
    expect(link.find('img').prop('alt')).toBe('Voting Redux');
    expect(link.find('h1').text()).toBe('Voting Redux');
  });

  describe('right side (small)', () => {
    let rightSideSmll, rMenu;
    beforeEach(() => {
      rightSideSmll = wrapper.find('.header-nav-sm');
      rMenu = rightSideSmll.find('Menu');
    });

    it('renders properly', () => {
      expect(rightSideSmll.find('IconButton')).toBeDefined();
      expect(rMenu).toBeDefined();
      expect(typeof rMenu.prop('onClick')).toBe('function');
    });
    it('clicking calls toggleSidebar()', async () => {
      rMenu.simulate('click', { button: 0 });
      wrapper.update();
      await asyncFlush();
      expect(toggleSidebarSpy).toHaveBeenCalled();
      expect(toggleSidebarSpy).toHaveBeenCalledTimes(1);
      jest.clearAllMocks();
    });
  });

  describe('right side (large)', () => {
    let rightSideLrg, aboutBtn, pollsBtn;
    beforeEach(() => {
      rightSideLrg = wrapper.find('nav.header-nav');
      aboutBtn = rightSideLrg.find('Btn#header-nav-about');
      pollsBtn = rightSideLrg.find('Btn#header-nav-polls');
    });

    it('renders properly', () => {
      expect(rightSideLrg).toBeDefined();
      expect(aboutBtn).toBeDefined();
      expect(aboutBtn.prop('variant')).toBe('flat');
      expect(aboutBtn.prop('size')).toBe('medium');
      expect(aboutBtn.prop('text')).toBe('About');
      expect(aboutBtn.prop('to')).toBe('/about');
      expect(pollsBtn).toBeDefined();
      expect(pollsBtn.prop('variant')).toBe('flat');
      expect(pollsBtn.prop('size')).toBe('medium');
      expect(pollsBtn.prop('text')).toBe('List');
      expect(pollsBtn.prop('to')).toBe('/polls');
    });
    it('"About" Btn routes to /about', async () => {
      aboutBtn.find('a').simulate('click', { button: 0 }); // button: 0 means left mouse button
      wrapper.update();
      await asyncFlush();
      expect(historyPushSpy).toHaveBeenCalled();
      expect(historyPushSpy).toHaveBeenCalledTimes(1);
      expect(historyPushSpy).toHaveBeenCalledWith('/about');
      jest.clearAllMocks();
    });

    it('"List" Btn routes to /polls', async () => {
      pollsBtn.find('a').simulate('click', { button: 0 }); // button: 0 means left mouse button
      wrapper.update();
      await asyncFlush();
      expect(historyPushSpy).toHaveBeenCalled();
      expect(historyPushSpy).toHaveBeenCalledTimes(1);
      expect(historyPushSpy).toHaveBeenCalledWith('/polls');
      jest.clearAllMocks();
    });

    describe('navi button', () => {

      describe('authed state', () => {
        describe('navi button (header-nav-user)', () => {
          let btn;
          beforeEach(() => btn = rightSideLrg.find('Button#header-nav-user'));

          it('renders properly', () => {
            expect(btn).toBeDefined();
            expect(btn.prop('aria-owns')).toBe(null);
            expect(btn.prop('aria-haspopup')).toBe(true);
            expect(typeof btn.prop('onClick')).toBe('function');
            expect(btn.text()).toBe('somebody');
          });
          it('calls handleMenuPopoverOpen() on click', async () => {
            expect(wrapper.find('Header').instance().state.menuPopupAnchorEl).toBe(null);
            btn.simulate('click', { button: 0 });
            wrapper.update();
            await asyncFlush();
            expect(wrapper.find('Header').instance().state.menuPopupAnchorEl).toBeDefined();
          });
        });
        describe('popover', () => {
          let popover, mItemCreatePollPopup, mItemAccount, mItemLogout;
          beforeEach(async () => {
            rightSideLrg.find('Button#header-nav-user').simulate('click', { button: 0 });
            wrapper.update();
            await asyncFlush();
            popover = wrapper.find('Popover#auth-menu');
            mItemCreatePollPopup = popover.find('MenuItem#create-poll-popup');
            mItemAccount = popover.find('MenuItem#account');
            mItemLogout = popover.find('MenuItem#logout');
            jest.clearAllMocks();
          });

          it('renders properly', () => {
            expect(popover).toBeDefined();
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
            expect(mItemAccount).toBeDefined();
            expect(mItemAccount.prop('component')).toBe(Link);
            expect(typeof mItemAccount.prop('component')).toBe('function');
            expect(mItemAccount.prop('to')).toBe('/account');
            expect(mItemAccount.text()).toBe('Profile');
            expect(mItemLogout).toBeDefined();
            expect(typeof mItemLogout.prop('onClick')).toBe('function'); //logoutUser
            expect(mItemLogout.text()).toBe('Logout');
          });
          it('"Create Poll" calls openNewPollPopup() on click', async () => {
            mItemCreatePollPopup.simulate('click', { button: 0 });
            wrapper.update();
            await asyncFlush();
            expect(openNewPollPopupSpy).toHaveBeenCalled();
            expect(openNewPollPopupSpy).toHaveBeenCalledTimes(1);
            jest.clearAllMocks();
          });
          it('"Profile" routes to /account on click', async () => {
            mItemAccount.simulate('click', { button: 0 });
            wrapper.update();
            await asyncFlush();
            expect(historyPushSpy).toHaveBeenCalled();
            expect(historyPushSpy).toHaveBeenCalledTimes(1);
            expect(historyPushSpy).toHaveBeenCalledWith('/account');
            jest.clearAllMocks();
          });
          it('"Logout" calls logoutUser() on click', async () => {
            // clickButton(wrapper, 'header-nav-signin');
            mItemLogout.simulate('click', { button: 0 });
            // click(mItemLogout);
            wrapper.update();
            await asyncFlush();
            expect(logoutUserSpy).toHaveBeenCalled();
            expect(logoutUserSpy).toHaveBeenCalledTimes(1);
            jest.clearAllMocks();
          });
        });
      });

      describe('NON-authed state', () => {
        let unAuthedWrapper, rightSideLrg,
          historyPushSpy2, toggleSidebarSpy2, openAuthPopupSpy;
        beforeEach(() => {
          toggleSidebarSpy2 = jest.spyOn(props, 'toggleSidebar');
          openAuthPopupSpy = jest.spyOn(props, 'openAuthPopup');
          const unAuthedProps = {...props};
          unAuthedProps.authedUser = null;
          unAuthedWrapper = mountWithRouterConnected(<Header {...unAuthedProps} />);
          unAuthedWrapper.find('MemoryRouter').instance().history.push = mockFn;
          historyPushSpy2 = jest.spyOn(unAuthedWrapper.find('MemoryRouter').instance().history, 'push');
          rightSideLrg = unAuthedWrapper.find('nav.header-nav');
          jest.restoreAllMocks();
          unAuthedWrapper.update();
        });
        describe('navi button (header-nav-signin)', () => {
          let btn;
          beforeEach(() => btn = rightSideLrg.find('Btn#header-nav-signin'));

          it('renders properly', () => {
            expect(btn).toBeDefined();
            expect(btn.prop('variant')).toBe('flat');
            expect(btn.prop('size')).toBe('medium');
            expect(btn.prop('text')).toBe('Sign in');
            expect(typeof btn.prop('onClick')).toBe('function');;
          });
          it('calls openAuthPopup() on click', async () => {
            clickButton(unAuthedWrapper, 'header-nav-signin');
            unAuthedWrapper.update();
            await asyncFlush();
            expect(openAuthPopupSpy).toHaveBeenCalled();
            expect(openAuthPopupSpy).toHaveBeenCalledTimes(1);
            jest.clearAllMocks();
          });
        });

      });
    });
  });
});
