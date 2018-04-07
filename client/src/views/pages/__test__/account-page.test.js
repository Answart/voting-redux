import React from 'react';
// Import components
import AccountPage from '../account-page';

const mockFn = jest.fn;
const props = {
  openNewPollPopup: mockFn,
  deleteUser: mockFn,
  goToUserPolls: mockFn,
  authedUserState: { user: null }
};


describe('<AccountPage />', () => {
  let wrapper, openVotePollPopupSpy, fetchPollsSpy;
  beforeAll(() => {
    wrapper = mountWithRouterConnected(<AccountPage {...props} />)
    wrapper.update();
  });

  it('renders properly', () => {
    const page = wrapper.find(AccountPage);
    expect(mountToJson(page)).toMatchSnapshot();
    expect(page).toHaveLength(1);
    expect(Object.keys(page.props()).length).toBe(4);
    expect(typeof page.prop('authedUserState')).toBe('object');
    expect(page.find('Section').length).toBe(0);
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
    });
  });

  describe('authed', () => {
    let authedWrapper;
    beforeAll(() => {
      let authedProps = {
        openNewPollPopup: mockFn,
        deleteUser: mockFn,
        goToUserPolls: mockFn,
        authedUserState: {
          user: {
            name: 'somebody',
            cuid: '12345',
            activity: []
          }
        }
      };
      authedWrapper = mountWithRouterConnected(<AccountPage {...authedProps} />);
      authedWrapper.update();
    });
    it('renders properly', () => {
      expect(authedWrapper.find('Grid#account')).toHaveLength(1);
      expect(Object.keys(wrapper.find(AccountPage).props()).length).toBe(4);
      expect(authedWrapper.find('Section').length).toBe(2);
    });
  });
});
