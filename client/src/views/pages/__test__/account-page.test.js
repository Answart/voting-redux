import React from 'react';
// Import components
import AccountPage from '../account-page';

const mockFn = jest.fn;
const props = {
  openNewPollPopup: mockFn,
  deleteUser: mockFn,
  goToUserPolls: mockFn
};


describe('<AccountPage />', () => {
  let wrapper, openVotePollPopupSpy, fetchPollsSpy;
  beforeAll(() => {
    wrapper = mountWithRouterConnected(<AccountPage {...props} />)
    wrapper.update();
  });

  it('renders properly', () => {
    const page = wrapper.find('AccountPage');
    expect(mountToJson(page)).toMatchSnapshot();
    expect(page).toHaveLength(1);
    expect(typeof page.prop('authedUserState')).toBe('object');
    expect(typeof page.prop('openNewPollPopup')).toBe('function');
    expect(typeof page.prop('deleteUser')).toBe('function');
    expect(typeof page.prop('goToUserPolls')).toBe('function');
    expect(page.find('Section').length).toBe(2);
  });

  it('title renders properly', () => {
    const title = wrapper.find('Typography.page-title');
    expect(title).toBeDefined();
    expect(title.prop('variant')).toBe('title');
    expect(title.text()).toEqual('Account');
  });

  describe('authed', () => {
    it('renders properly', () => {
      expect(wrapper.find('Grid#account')).toHaveLength(1);
      expect(Object.keys(wrapper.find(AccountPage).props()).length).toBe(3);
      expect(wrapper.find('Section').length).toBe(2);
      expect(wrapper.find('ActivityList').length).toBe(1);
    });
  });

  // describe('UNauthed', () => {
  //   // need to overwrite authUser prop in 'connect' (null user in state.users.authUser)
  //   it('renders properly', () => {
  //     expect(wrapper.find('Grid#account')).toHaveLength(0);
  //   });
  // });
});
