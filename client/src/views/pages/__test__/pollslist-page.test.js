import React from 'react';
// Import components
import PollsListPage from '../pollslist-page';

const mockFn = jest.fn;
const props = {
  openVotePollPopup: mockFn,
  fetchPolls: mockFn,
  authed: true
};


describe('<PollsListPage />', () => {
  let wrapper, openVotePollPopupSpy, fetchPollsSpy;
  beforeAll(() => {
    openVotePollPopupSpy = jest.spyOn(props, 'openVotePollPopup');
    fetchPollsSpy = jest.spyOn(props, 'fetchPolls');
    wrapper = mountWithRouterConnected(<PollsListPage {...props} />)
    wrapper.update();
  });

  it('renders properly', () => {
    const page = wrapper.find(PollsListPage);
    expect(mountToJson(page)).toMatchSnapshot();
    expect(page).toBeDefined();
    expect(Object.keys(page.props()).length).toBe(3);
  });

  it('title renders properly', () => {
    const title = wrapper.find('Typography.page-title');
    expect(title).toBeDefined();
    expect(title.prop('variant')).toBe('title');
    expect(title.text()).toEqual('Polls');
  });

  it('"Fetch Polls" button calls fetchPolls() on click', () => {
    const fetchBtn = wrapper.find('Btn#fetch-polls');
    expect(fetchBtn).toHaveLength(1);
    expect(fetchBtn.prop('disabled')).toBe(false);
    expect(fetchBtn.prop('text')).toBe('Fetch Polls');
    expect(typeof fetchBtn.prop('onClick')).toBe('function');
    fetchBtn.prop('onClick')();
    expect(fetchBtn.prop('onClick')).toBeCalled();
    expect(fetchPollsSpy).toHaveBeenCalled();
    expect(fetchPollsSpy).toHaveBeenCalledTimes(1);
  });

});
