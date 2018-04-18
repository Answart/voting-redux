import React from 'react';
import { mountWithRouterConnected } from '../../../utils/__test__/test.helper';
import PollsListPage from '../pollslist-page';
import PollsList from '../../components/pollslist';
import PollsFilter from '../../components/pollsfilter';

const mockFn = jest.fn;
const props = {
  openVotePollPopup: mockFn,
  getPolls: mockFn,
  loadFilteredPolls: mockFn,
  authed: true
};


describe('<PollsListPage />', () => {
  let wrapper, page,
    openVotePollPopupSpy, getPollsSpy;
  beforeAll(async () => {
    openVotePollPopupSpy = jest.spyOn(props, 'openVotePollPopup');
    getPollsSpy = jest.spyOn(props, 'getPolls');
    wrapper = mountWithRouterConnected(<PollsListPage {...props} />, ['/'], false);
    await wrapper.find(PollsListPage).instance().componentDidMount();
    page = wrapper.find('PollsListPage');
  });

  it('renders properly', () => {
    expect(page).toBeDefined();
    expect(typeof page.prop('openVotePollPopup')).toBe('function');
    expect(typeof page.prop('getPolls')).toBe('function');
    expect(typeof page.prop('loadFilteredPolls')).toBe('function');
    expect(typeof page.prop('filteredPollsState')).toBe('object');
    expect(typeof page.prop('authed')).toBe('boolean');
    expect(page.find('PollsFilter')).toHaveLength(1);
    expect(page.find('PollsList')).toHaveLength(1);
    expect(mountToJson(page)).toMatchSnapshot();
  });

  it('title renders properly', () => {
    const title = page.find('Typography.page-title');
    expect(title).toBeDefined();
    expect(title.prop('variant')).toBe('title');
    expect(title.text()).toEqual('Polls');
  });

  describe('Pollslist', () => {
    let pollslist;
    beforeEach(() => pollslist = wrapper.find('PollsList'));

    it('renders properly', () => {
      expect(pollslist).toHaveLength(1);
      expect(pollslist.prop('polls')).toBeDefined();
      expect(pollslist.prop('pollColumnData')).toHaveLength(5);
      expect(typeof pollslist.prop('openVotePollPopup')).toBe('function');
      expect(typeof pollslist.prop('authed')).toBe('boolean');
    });
    it('openVotePollPopup() calls correctly', () => {
      expect(openVotePollPopupSpy).not.toHaveBeenCalled();
      pollslist.prop('openVotePollPopup')('12345');
      expect(pollslist.prop('openVotePollPopup')).toBeCalled();
      expect(openVotePollPopupSpy).toHaveBeenCalled();
      expect(openVotePollPopupSpy).toHaveBeenCalledTimes(1);
      expect(openVotePollPopupSpy).toHaveBeenCalledWith('12345');
    });
  });

  it('"Fetch Polls" button calls getPolls() on click', () => {
    const fetchBtn = page.find('Btn#fetch-polls');
    expect(fetchBtn).toHaveLength(1);
    expect(fetchBtn.prop('disabled')).toBe(false);
    expect(fetchBtn.prop('text')).toBe('Fetch Polls');
    expect(typeof fetchBtn.prop('onClick')).toBe('function');
    fetchBtn.prop('onClick')();
    expect(fetchBtn.prop('onClick')).toBeCalled();
    expect(getPollsSpy).toHaveBeenCalled();
    expect(getPollsSpy).toHaveBeenCalledTimes(1);
  });
});
