import React from 'react';
import { Link } from 'react-router-dom';
import {
  mountWithRouterConnected, asyncFlush, clickLink
} from '../../../utils/__test__';
import ActivityList from '../activitylist';

const mockFn = jest.fn();
const props = {
  title: 'Activity',
  list: [{
    cuid: 0,
    type: 'user',
    actionColor: 'green',
    poll_id: '12345',
    message: 'First activity',
    date_created: '2018-04-06T04:34:25.183Z'
  }, {
    cuid: 5,
    type: 'user',
    actionColor: 'red',
    poll_id: null,
    message: 'Last activity',
    date_created: '2018-04-06T04:34:25.183Z'
  }]
};


describe('<ActivityList />', () => {
  let wrapper, cmpnt, state,
    historyPushSpy;

  beforeAll(async () => {
    wrapper = mountWithRouterConnected(<ActivityList {...props} />);
    wrapper.find('MemoryRouter').instance().history.push = mockFn;
    historyPushSpy = jest.spyOn(wrapper.find('MemoryRouter').instance().history, 'push');
    wrapper.update();
    await wrapper.find(ActivityList).instance().componentDidMount();
    cmpnt = wrapper.find('ActivityList');
    await asyncFlush();
  });
  beforeEach(() => state = wrapper.find('ActivityList').instance().state);
  afterEach(() => jest.clearAllMocks());

  it('renders properly', () => {
    expect(cmpnt).toHaveLength(1);
    expect(cmpnt.prop('title')).toEqual('Activity');
    expect(cmpnt.prop('list')).toHaveLength(2);
    expect(typeof cmpnt.instance().parseTime).toBe('function');
    expect(mountToJson(cmpnt)).toMatchSnapshot();
  });

  describe('activity with link', () => {
    let exampleActivity;
    beforeEach(() => exampleActivity = cmpnt.find('ListItem#activity-0'));

    it('renders properly', () => {
      expect(exampleActivity).toBeDefined();
      const icon = exampleActivity.find('ListItemAvatar').find('Icon');
      expect(icon).toHaveLength(1);
      const itemText = exampleActivity.find('ListItemText');
      expect(itemText).toHaveLength(1);
      expect(itemText.find('span').text()).toBe('First activity');
      expect(itemText.find('p').text()).toBe('4/5/2018');
      expect(exampleActivity.find('IconButton').find('KeyboardArrowRightIcon')).toHaveLength(1);
    });
    it('routes to specified route on click', () => {
      expect(historyPushSpy).not.toHaveBeenCalled();
      clickLink(exampleActivity.find('IconButton'));
      expect(historyPushSpy).toHaveBeenCalled();
      expect(historyPushSpy).toHaveBeenCalledWith('/poll/12345');
    });
  });

  describe('activity without link', () => {
    let exampleActivity;
    beforeEach(() => exampleActivity = cmpnt.find('ListItem#activity-1'));

    it('renders properly', () => {
      expect(exampleActivity).toBeDefined();
      expect(exampleActivity.find('ListItemAvatar').find('Icon')).toHaveLength(1);
      expect(exampleActivity.find('ListItemText')).toHaveLength(1);
      expect(exampleActivity.find('IconButton')).toHaveLength(0);
    });
  });
});
