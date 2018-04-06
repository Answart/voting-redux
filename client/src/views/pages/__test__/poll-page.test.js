import React from 'react';
// Import components
import PollPage from '../poll-page';

const mockFn = jest.fn;


describe('<PollPage />', () => {
  let wrapper, page, openVotePollPopupSpy, loadViewedPollSpy;
  beforeAll(() => {
    const props = {
      openVotePollPopup: mockFn,
      loadViewedPoll: mockFn,
      locationPath: '/poll/1234',
      authedUser: null
    };
    openVotePollPopupSpy = jest.spyOn(props, 'openVotePollPopup');
    loadViewedPollSpy = jest.spyOn(props, 'loadViewedPoll');
    wrapper = mountWithRouterConnected(<PollPage {...props} />)
    page = wrapper.find(PollPage);
    wrapper.update();
  });

  it('renders properly', () => {
    expect(page).toHaveLength(1);
    expect(Object.keys(page.props()).length).toBe(4);
    expect(typeof page.prop('openVotePollPopup')).toBe('function');
    expect(typeof page.prop('loadViewedPoll')).toBe('function');
    expect(page.prop('locationPath')).toBe('/poll/1234');
    expect(typeof page.prop('authedUser')).toBe('object');
    expect(loadViewedPollSpy).toHaveBeenCalled();
    expect(loadViewedPollSpy).toHaveBeenCalledTimes(1);
    expect(loadViewedPollSpy).toHaveBeenCalledWith('1234');
    expect(wrapper.find('Poll')).toHaveLength(1);
    jest.clearAllMocks();
    expect(mountToJson(page)).toMatchSnapshot();
  });

  it('title renders properly', () => {
    const title = page.find('Typography.page-title');
    expect(title).toBeDefined();
    expect(title.prop('variant')).toBe('title');
    expect(title.text()).toEqual("Poll 'random title'");
  });

  describe('UNauthed', () => {
    it('renders properly', () => {
      expect(page.find('Grid#poll')).toHaveLength(1);
    });
  });

  describe('authed', () => {
    let authedWrapper, openVotePollPopupSpy2, loadViewedPollSpy2;
    beforeAll(() => {
      let authedProps = {
        openVotePollPopup: mockFn,
        loadViewedPoll: mockFn,
        locationPath: '/poll/4321',
        authedUser: {
          id: '6666',
          token: 'secret'
        }
      };
      openVotePollPopupSpy2 = jest.spyOn(authedProps, 'openVotePollPopup');
      loadViewedPollSpy2 = jest.spyOn(authedProps, 'loadViewedPoll');
      authedWrapper = mountWithRouterConnected(<PollPage {...authedProps} />);
      authedWrapper.update();
    });
    it('renders properly', () => {
      const authedPage = authedWrapper.find(PollPage);
      expect(authedPage.find('Grid#poll')).toHaveLength(1);
      expect(Object.keys(authedPage.props()).length).toBe(4);
      expect(typeof authedPage.prop('openVotePollPopup')).toBe('function');
      expect(typeof authedPage.prop('loadViewedPoll')).toBe('function');
      expect(authedPage.prop('locationPath')).toBe('/poll/4321');
      expect(typeof authedPage.prop('authedUser')).toBe('object');
      expect(loadViewedPollSpy2).toHaveBeenCalled();
      expect(loadViewedPollSpy2).toHaveBeenCalledTimes(1);
      expect(loadViewedPollSpy2).toHaveBeenCalledWith('4321');
      jest.clearAllMocks();
    });
  });
});
