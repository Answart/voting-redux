import React from 'react';
// Import components
import PollsListPage from '../pollslist-page';
import PollsList from '../../components/pollslist';

const mockFn = jest.fn;
const props = {
  openVotePollPopup: mockFn,
  loadActivePoll: mockFn,
  fetchPolls: mockFn,
  authed: true
};
const polls = [{
    title: 'random title',
    votes: 10,
    choices: [
      { id: 0, label: 'red', vote: 4 },
      { id: 1, label: 'blue', vote: 6 }
    ]
  }, {
    title: 'random title2',
    votes: 30,
    choices: [
      { id: 0, label: 'red2', vote: 14 },
      { id: 1, label: 'blue2', vote: 16 }
    ]
  }
];
const pollColumnData = [
  {id:0, key:'open', label:'Status', numeric:false, colSpan:10 },
  {id:1, key:'votes', label:'Votes', numeric:false, colSpan:10 },
  {id:2, key:'title', label:'Title', numeric:false, colSpan:40 },
  {id:3, key:'user_name', label:'User', numeric:false, colSpan:20 },
  {id:4, key:'date_created', label:'Date', numeric:false, colSpan:20 }
];


describe('<PollsListPage />', () => {
  let wrapper, openVotePollPopupSpy, loadActivePollSpy, fetchPollsSpy;
  beforeAll(async () => {
    openVotePollPopupSpy = jest.spyOn(props, 'openVotePollPopup');
    loadActivePollSpy = jest.spyOn(props, 'loadActivePoll');
    fetchPollsSpy = jest.spyOn(props, 'fetchPolls');
    wrapper = mountWithRouterConnected(<PollsListPage {...props} />)
    await wrapper.find(PollsListPage).instance().componentDidMount();
    await wrapper.find(PollsList).instance().componentDidMount();
    await asyncFlush();
  });
  afterEach(() => jest.clearAllMocks());
  afterAll(() => wrapper.unmount());

  it('renders properly', () => {
    const page = wrapper.find(PollsListPage);
    expect(page).toHaveLength(1);
    expect(Object.keys(page.props()).length).toBe(4);
    expect(wrapper.find('PollsList')).toHaveLength(1);
    expect(mountToJson(page)).toMatchSnapshot();
  });

  it('title renders properly', () => {
    const title = wrapper.find('Typography.page-title');
    expect(title).toHaveLength(1);
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
