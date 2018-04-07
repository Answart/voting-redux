import React from 'react';
// Import components
import Section from '../section';

const mockFn = jest.fn();
const props = {
  title: 'Test title',
  list: [{
      primary: 'Total Votes',
      secondary: 20
    }, {
      primary: 'Created by',
      secondary: 'Alexandra',
      secondaryAction: mockFn,
      secondaryActionLink: '/polls'
    }, {
      primary: 'Account E-mail',
      secondary: 'Not Verfied',
      iconType: 'status',
      iconColor: 'orange',
      iconDisabled: false,
      iconAction: mockFn
    }
  ]
};


describe('<Section />', () => {
  let wrapper, cmpnt, list, items, secondaryActionSpy, iconActionSpy, historyPushSpy;

  beforeAll(async () => {
    secondaryActionSpy = jest.spyOn(props.list[1], 'secondaryAction');
    iconActionSpy = jest.spyOn(props.list[2], 'iconAction');
    wrapper = mountWithRouterConnected(<Section {...props} />, ['/']);
    wrapper.find('MemoryRouter').instance().history.push = mockFn;
    historyPushSpy = jest.spyOn(wrapper.find('MemoryRouter').instance().history, 'push');
    wrapper.update();
    await wrapper.find(Section).instance().componentDidMount();
    cmpnt = wrapper.find('Section');
    await asyncFlush();
    list = wrapper.find('List.scrollable-list');
    items = list.find('ListItem');
  });
  afterEach(() => jest.clearAllMocks());
  afterAll(() => wrapper.unmount());

  it('renders properly', () => {
    expect(cmpnt).toHaveLength(1);
    expect(cmpnt.prop('title')).toBe('Test title');
    expect(cmpnt.prop('list').length).toBe(3);
    expect(cmpnt.prop('list')).toEqual([{
        primary: 'Total Votes',
        secondary: 20
      }, {
        primary: 'Created by',
        secondary: 'Alexandra',
        secondaryAction: mockFn,
        secondaryActionLink: '/polls'
      }, {
        primary: 'Account E-mail',
        secondary: 'Not Verfied',
        iconType: 'status',
        iconColor: 'orange',
        iconDisabled: false,
        iconAction: mockFn
      }
    ]);
    expect(list).toHaveLength(1);
    expect(list.find('ListItem')).toHaveLength(3);
    const firstItem = list.find('ListItem#list-0');
    const secondItem = list.find('ListItem#list-1');
    const thirdItem = list.find('ListItem#list-2');
    expect(firstItem.find('ListItemIcon').length).toBe(0);
    expect(firstItem.find('ListItemText').length).toBe(1);
    expect(firstItem.find('IconButton').length).toBe(0);
    expect(secondItem.find('ListItemIcon').length).toBe(0);
    expect(secondItem.find('ListItemText').length).toBe(1);
    expect(secondItem.find('IconButton').length).toBe(1);
    expect(thirdItem.find('ListItemIcon').length).toBe(1);
    expect(thirdItem.find('ListItemText').length).toBe(1);
    expect(thirdItem.find('IconButton').length).toBe(0);
    expect(mountToJson(cmpnt)).toMatchSnapshot();
  });

  it('Header renders properly', () => {
    const title = cmpnt.find('Typography.section-header');
    expect(title).toHaveLength(1);
    expect(title.prop('variant')).toBe('subheading');
    expect(title.text()).toEqual('Test title');
  });
  it('ListItemText renders properly', () => {
    const item = list.find('ListItem#list-0').find('ListItemText');
    expect(item.length).toBe(1);
    expect(item.prop('primary')).toBe('Total Votes');
    expect(item.prop('secondary')).toBe(20);
  });

  describe('IconButton', () => {
    let item;
    beforeEach(() => item = list.find('ListItem#list-1').find('IconButton'));

    it('renders properly', () => {
      expect(item.length).toBe(1);
      expect(typeof item.prop('onClick')).toBe('function');
      expect(typeof item.prop('component')).toBe('function');
      expect(item.prop('to')).toBe('/polls');
      expect(item.find('KeyboardArrowRight').length).toBe(1);
    });
    it('routes to specified route on click', () => {
      expect(secondaryActionSpy).not.toHaveBeenCalled();
      expect(historyPushSpy).not.toHaveBeenCalled();
      click(item);
      expect(secondaryActionSpy).toHaveBeenCalled();
      expect(historyPushSpy).toHaveBeenCalled();
      expect(historyPushSpy).toHaveBeenCalledWith('/polls');
    });
  });

  describe('ListItemIcon', () => {
    let item, button;
    beforeEach(() => {
      item = list.find('ListItem#list-2').find('Icon');
      button = item.find('HighlightOff');
    });

    it('renders properly', () => {
      expect(item.length).toBe(1);
      expect(item.prop('label')).toBe('Account E-mail');
      expect(item.prop('type')).toBe('status');
      expect(item.prop('color')).toBe('orange');
      expect(typeof item.prop('action')).toBe('function');
      expect(item.prop('disabled')).toBe(false);
      expect(button.length).toBe(1);
    });
    it('calls iconAction on click', () => {
      expect(iconActionSpy).not.toHaveBeenCalled();
      click(button);
      expect(iconActionSpy).toHaveBeenCalled();
      expect(iconActionSpy).toHaveBeenCalledTimes(1);
    });
  });
});
