import React from 'react';
// Import components
import PollsListPage from '../pollslist-page';
import PollsList from '../../components/pollslist';
import PollsFilter from '../../components/pollsfilter';

const mockFn = jest.fn;
const props = {
  openVotePollPopup: mockFn,
  getPolls: mockFn,
  loadFilteredPolls: mockFn,
  loadActivePoll: mockFn,
  authed: true
};


describe('<PollsListPage />', () => {
  let wrapper, page,
    openVotePollPopupSpy, loadActivePollSpy, getPollsSpy;
  beforeAll(async () => {
    openVotePollPopupSpy = jest.spyOn(props, 'openVotePollPopup');
    loadActivePollSpy = jest.spyOn(props, 'loadActivePoll');
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
    expect(typeof page.prop('loadActivePoll')).toBe('function');
    expect(typeof page.prop('filteredPollsState')).toBe('object');
    expect(typeof page.prop('authed')).toBe('boolean');
    expect(wrapper.find('PollsFilter')).toHaveLength(1);
    expect(wrapper.find('PollsList')).toHaveLength(1);
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
      expect(typeof pollslist.prop('loadActivePoll')).toBe('function');
      expect(typeof pollslist.prop('authed')).toBe('boolean');
    });
    it('openVotePollPopup() calls correctly', () => {
      expect(openVotePollPopupSpy).not.toHaveBeenCalled();
      pollslist.prop('openVotePollPopup')();
      expect(pollslist.prop('openVotePollPopup')).toBeCalled();
      expect(openVotePollPopupSpy).toHaveBeenCalled();
      expect(openVotePollPopupSpy).toHaveBeenCalledTimes(1);
    });
    it('loadActivePoll() calls correctly', () => {
      expect(loadActivePollSpy).not.toHaveBeenCalled();
      pollslist.prop('loadActivePoll')();
      expect(pollslist.prop('loadActivePoll')).toBeCalled();
      expect(loadActivePollSpy).toHaveBeenCalled();
      expect(loadActivePollSpy).toHaveBeenCalledTimes(1);
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