import React from 'react';
import { mountWithRouterConnected } from '../../../utils/__test__/test.helper';
import AccountPage from '../account-page';

const mockFn = jest.fn;
const props = {
  openNewPollPopup: mockFn,
  deleteUser: mockFn,
  goToUserPolls: mockFn
};


describe('<AccountPage />', () => {
  let wrapper, openNewPollPopupSpy, deleteUserSpy, goToUserPollsSpy;
  beforeAll(async () => {
    openNewPollPopupSpy = jest.spyOn(props, 'openNewPollPopup');
    deleteUserSpy = jest.spyOn(props, 'deleteUser');
    goToUserPollsSpy = jest.spyOn(props, 'goToUserPolls');
    wrapper = mountWithRouterConnected(<AccountPage {...props} />);
    await wrapper.find(AccountPage).instance().componentDidMount();
  });

  it('renders properly', () => {
    const page = wrapper.find('AccountPage');
    expect(page).toHaveLength(1);
    expect(typeof page.prop('authedUserState')).toBe('object');
    expect(typeof page.prop('openNewPollPopup')).toBe('function');
    expect(typeof page.prop('deleteUser')).toBe('function');
    expect(typeof page.prop('goToUserPolls')).toBe('function');
    expect(mountToJson(page)).toMatchSnapshot();
  });

  it('title renders properly', () => {
    const title = wrapper.find('Typography.page-title');
    expect(title).toBeDefined();
    expect(title.prop('variant')).toBe('title');
    expect(title.text()).toEqual('Account');
  });

  describe('UNauthed', () => {
    it('renders properly', () => {
      expect(wrapper.find('Grid#account')).toHaveLength(0);
      expect(wrapper.find('Section').length).toBe(0);
      expect(wrapper.find('ActivityList').length).toBe(0);
    });
  });

  describe('authed', () => {
    let authedWrapper, openNewPollPopupSpy2, deleteUserSpy2, goToUserPollsSpy2, historyPushSpy2;
    beforeAll(async () => {
      openNewPollPopupSpy2 = jest.spyOn(props, 'openNewPollPopup');
      deleteUserSpy2 = jest.spyOn(props, 'deleteUser');
      goToUserPollsSpy2 = jest.spyOn(props, 'goToUserPolls');
      authedWrapper = mountWithRouterConnected(<AccountPage {...props} />, ['/'], false);
      authedWrapper.find('MemoryRouter').instance().history.push = mockFn;
      historyPushSpy2 = jest.spyOn(authedWrapper.find('MemoryRouter').instance().history, 'push');
      authedWrapper.update();
      await authedWrapper.find(AccountPage).instance().componentDidMount();
    });
    afterAll(() => authedWrapper.unmount());

    it('renders properly', () => {
      expect(authedWrapper.find('Grid#account')).toHaveLength(1);
      expect(Object.keys(authedWrapper.find(AccountPage).props()).length).toBe(3);
      expect(authedWrapper.find('Section').length).toBe(2);
      expect(authedWrapper.find('ActivityList').length).toBe(1);
    });

  });
});
