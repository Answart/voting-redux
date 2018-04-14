import React from 'react';
// Import components
import PollPage from '../poll-page';

const mockFn = jest.fn;
const props = {
  deletePoll: mockFn,
  goToUserPolls: mockFn,
  resetViewedPoll: mockFn,
  updatePollStatus: mockFn,
  openVotePollPopup: mockFn,
  loadViewedPoll: mockFn,
  locationPath: '/poll/12345'
};

describe('<PollPage />', () => {
  let wrapper, page, openVotePollPopupSpy, loadViewedPollSpy, historyPushSpy;
  beforeAll(async () => {
    openVotePollPopupSpy = jest.spyOn(props, 'openVotePollPopup');
    loadViewedPollSpy = jest.spyOn(props, 'loadViewedPoll');
    wrapper = mountWithRouterConnected(<PollPage {...props} />, ['/'], false);
    wrapper.find('MemoryRouter').instance().history.push = mockFn;
    historyPushSpy = jest.spyOn(wrapper.find('MemoryRouter').instance().history, 'push');
    wrapper.update();
    await wrapper.find(PollPage).instance().componentDidMount();
    page = wrapper.find('PollPage');
  });
  afterEach(() => jest.clearAllMocks());
  afterAll(() => wrapper.unmount());

  it('renders properly', () => {
    expect(page).toHaveLength(1);
    expect(typeof page.prop('deletePoll')).toBe('function');
    expect(typeof page.prop('goToUserPolls')).toBe('function');
    expect(typeof page.prop('resetViewedPoll')).toBe('function');
    expect(typeof page.prop('updatePollStatus')).toBe('function');
    expect(typeof page.prop('openVotePollPopup')).toBe('function');
    expect(typeof page.prop('loadViewedPoll')).toBe('function');
    expect(page.prop('locationPath')).toBe('/poll/12345');
    expect(loadViewedPollSpy).toHaveBeenCalled();
    expect(loadViewedPollSpy).toHaveBeenCalledTimes(1);
    expect(loadViewedPollSpy).toHaveBeenCalledWith('12345');
    expect(wrapper.find('Poll')).toHaveLength(1);
    expect(mountToJson(page)).toMatchSnapshot();
  });

  it('title renders properly', () => {
    const title = page.find('Typography.page-title');
    expect(title).toBeDefined();
    expect(title.prop('variant')).toBe('title');
    expect(title.text()).toEqual("Poll 'random title2'");
  });

  describe('authed', () => {
    it('renders properly', () => {
      expect(page.find('Grid#poll')).toHaveLength(1);
      expect(page.find('Poll')).toHaveLength(1);
      expect(page.find('Section')).toHaveLength(2);
    });
  });

  describe('Unauthed', () => {
    let emptyPollWrapper;
    beforeAll(async () => {
      emptyPollWrapper = mountWithRouterConnected(<PollPage {...props} />);
      await emptyPollWrapper.find(PollPage).instance().componentDidMount();
    });
    afterAll(() => emptyPollWrapper.unmount());
    it('renders properly', () => {
      expect(emptyPollWrapper.find('Grid#poll')).toHaveLength(0);
      expect(emptyPollWrapper.find('Poll')).toHaveLength(0);
      expect(emptyPollWrapper.find('Section')).toHaveLength(0);
    });
  });
});
