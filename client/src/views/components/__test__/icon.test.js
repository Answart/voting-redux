import React from 'react';
import {
  muiMounter, mountWithRouter,
  click
} from '../../../utils/__test__';
import Icon from '../icon';

const mockFn = jest.fn;
const circleCheckProps = {
  type: 'status',
  color: 'green' ,
  action: mockFn,
  label: 'circle check icon'
};
const circleXProps = {
  type: 'status',
  color: 'orange',
  action: mockFn,
  label: 'circle x icon',
  disabled: true,
  disabledLabel: 'Poll is closed'
};
const closePollProps = {
  type: 'close',
  color: 'orange',
  action: mockFn,
  label: 'close poll icon'
};
const openPollProps = {
  type: 'open',
  color: 'green',
  action: mockFn,
  label: 'open poll icon'
};
const accountCircleProps = {
  type: 'user',
  color: 'green',
  to: '/account',
  label: 'account circle icon'
};
const touchProps = {
  type: 'voted',
  color: 'purple',
  action: mockFn,
  label: 'touch icon'
};
const equalizerProps = {
  type: 'vote',
  color: 'purple',
  action: mockFn,
  label: 'equalizer icon'
};
const addProps = {
  type: 'add',
  color: 'green',
  action: mockFn,
  label: 'add icon'
};
const addOutlineProps = {
  type: 'added',
  color: 'green',
  action: mockFn,
  label: 'add outline icon'
};
const wrenchProps = {
  type: 'poll',
  color: 'orange',
  action: mockFn,
  label: 'wrench icon'
};
const listProps = {
  type: 'list',
  color: 'purple',
  action: mockFn,
  label: 'list icon'
};
const trashProps = {
  type: 'trash',
  color: 'red',
  action: mockFn,
  label: 'trash icon'
};


describe('<Icon />', () => {
  let wrapper, actionSpy, icon, muiIcon;
  afterEach(() => jest.clearAllMocks());

  describe('Circle Check Icon', () => {
    beforeAll(() => {
      actionSpy = jest.spyOn(circleCheckProps, 'action');
      wrapper = muiMounter(<Icon {...circleCheckProps} />);
      icon = wrapper.find('Icon');
      muiIcon = wrapper.find('CheckCircleIcon');
    });
    afterAll(() => wrapper.unmount());

    it('renders properly', () => {
      expect(Object.keys(icon.props()).length).toBe(4);
      expect(icon.prop('type')).toBe('status');
      expect(icon.prop('color')).toBe('green');
      expect(icon.prop('label')).toBe('circle check icon');
      expect(typeof icon.prop('action')).toBe('function');
      expect(wrapper.find('Tooltip').prop('title')).toBe('circle check icon');
      expect(muiIcon).toHaveLength(1);
      expect(typeof muiIcon.prop('onClick')).toBe('function');
      expect(muiIcon.prop('className')).toBe('account-icon green-color pointer');
      expect(actionSpy).not.toHaveBeenCalled();
      expect(actionSpy).toHaveBeenCalledTimes(0);
      expect(mountToJson(icon)).toMatchSnapshot();
    });
    it('calls action on click', () => {
      expect(actionSpy).not.toHaveBeenCalled();
      click(muiIcon);
      expect(actionSpy).toHaveBeenCalled();
      expect(actionSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('Circle X Icon', () => {
    beforeAll(() => {
      actionSpy = jest.spyOn(circleXProps, 'action');
      wrapper = muiMounter(<Icon {...circleXProps} />);
      icon = wrapper.find('Icon');
      muiIcon = wrapper.find('HighlightOffIcon');
    });
    afterAll(() => wrapper.unmount());

    it('renders properly', () => {
      expect(Object.keys(icon.props()).length).toBe(6);
      expect(icon.prop('type')).toBe('status');
      expect(icon.prop('color')).toBe('orange');
      expect(icon.prop('label')).toBe('circle x icon');
      expect(icon.prop('disabled')).toBe(true);
      expect(typeof icon.prop('action')).toBe('function');
      expect(wrapper.find('Tooltip').prop('title')).toBe('Poll is closed');
      expect(muiIcon).toHaveLength(1);
      expect(typeof muiIcon.prop('onClick')).toBe('function');
      expect(muiIcon.prop('className')).toBe('account-icon grey-color pointer');
      expect(actionSpy).not.toHaveBeenCalled();
      expect(actionSpy).toHaveBeenCalledTimes(0);
      expect(mountToJson(icon)).toMatchSnapshot();
    });
    it('calls action on click', () => {
      expect(actionSpy).not.toHaveBeenCalled();
      click(muiIcon);
      expect(actionSpy).toHaveBeenCalled();
      expect(actionSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('Close Poll Icon', () => {
    beforeAll(() => {
      actionSpy = jest.spyOn(closePollProps, 'action');
      wrapper = muiMounter(<Icon {...closePollProps} />);
      icon = wrapper.find('Icon');
      muiIcon = wrapper.find('LockIcon');
    });
    afterAll(() => wrapper.unmount());

    it('renders properly', () => {
      expect(Object.keys(icon.props()).length).toBe(4);
      expect(icon.prop('type')).toBe('close');
      expect(icon.prop('color')).toBe('orange');
      expect(icon.prop('label')).toBe('close poll icon');
      expect(typeof icon.prop('action')).toBe('function');
      expect(wrapper.find('Tooltip').prop('title')).toBe('close poll icon');
      expect(muiIcon).toHaveLength(1);
      expect(typeof muiIcon.prop('onClick')).toBe('function');
      expect(muiIcon.prop('className')).toBe('account-icon orange-color pointer');
      expect(actionSpy).not.toHaveBeenCalled();
      expect(actionSpy).toHaveBeenCalledTimes(0);
      expect(mountToJson(icon)).toMatchSnapshot();
    });
    it('calls action on click', () => {
      expect(actionSpy).not.toHaveBeenCalled();
      click(muiIcon);
      expect(actionSpy).toHaveBeenCalled();
      expect(actionSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('Open Poll Icon', () => {
    beforeAll(() => {
      actionSpy = jest.spyOn(openPollProps, 'action');
      wrapper = muiMounter(<Icon {...openPollProps} />);
      icon = wrapper.find('Icon');
      muiIcon = wrapper.find('LockOpenIcon');
    });
    afterAll(() => wrapper.unmount());

    it('renders properly', () => {
      expect(Object.keys(icon.props()).length).toBe(4);
      expect(icon.prop('type')).toBe('open');
      expect(icon.prop('color')).toBe('green');
      expect(icon.prop('label')).toBe('open poll icon');
      expect(typeof icon.prop('action')).toBe('function');
      expect(wrapper.find('Tooltip').prop('title')).toBe('open poll icon');
      expect(muiIcon).toHaveLength(1);
      expect(typeof muiIcon.prop('onClick')).toBe('function');
      expect(muiIcon.prop('className')).toBe('account-icon green-color pointer');
      expect(actionSpy).not.toHaveBeenCalled();
      expect(actionSpy).toHaveBeenCalledTimes(0);
      expect(mountToJson(icon)).toMatchSnapshot();
    });
    it('calls action on click', () => {
      expect(actionSpy).not.toHaveBeenCalled();
      click(muiIcon);
      expect(actionSpy).toHaveBeenCalled();
      expect(actionSpy).toHaveBeenCalledTimes(1);
    });
  });

  //// SVG ISSUE DURING MOUNTING
  describe('Account Circle Icon', () => {
    let historyPushSpy;
    beforeAll(() => {
      wrapper = mountWithRouter(<Icon {...accountCircleProps} />);
      wrapper.instance().history.push = mockFn;
      historyPushSpy = jest.spyOn(wrapper.instance().history, 'push');
      icon = wrapper.find('Icon');
      muiIcon = wrapper.find('AccountCircleIcon');
    });
    afterAll(() => wrapper.unmount());

    it('renders properly', () => {
      expect(Object.keys(icon.props()).length).toBe(4);
      expect(icon.prop('type')).toBe('user');
      expect(icon.prop('color')).toBe('green');
      expect(icon.prop('label')).toBe('account circle icon');
      expect(icon.prop('to')).toBe('/account');
      expect(wrapper.find('Tooltip').prop('title')).toBe('account circle icon');
      expect(muiIcon).toHaveLength(1);
      expect(muiIcon.prop('className')).toBe('account-icon green-color pointer');
      expect(muiIcon.prop('to')).toBe('/account');
      expect(muiIcon.prop('component')).toBeDefined();
      expect(historyPushSpy).not.toHaveBeenCalled();
      expect(historyPushSpy).toHaveBeenCalledTimes(0);
      expect(mountToJson(icon)).toMatchSnapshot();
    });
    // it('routes to /account on click', () => {
    //   console.log('mui.component', muiIcon.prop('component'));
    //   console.log('mui.props.component.Link', muiIcon.prop('component').Link);
    //   const button = muiIcon.prop('component').Link;
    //   button.simulate('click', { preventDefault() {}, button: 0 });
    //   expect(historyPushSpy).toHaveBeenCalled();
    //   expect(historyPushSpy).toHaveBeenCalledTimes(1);
    //   expect(historyPushSpy).toHaveBeenCalledTimes('/account');
    // });
  });

  describe('Touch Icon', () => {
    beforeAll(() => {
      actionSpy = jest.spyOn(touchProps, 'action');
      wrapper = muiMounter(<Icon {...touchProps} />);
      icon = wrapper.find('Icon');
      muiIcon = wrapper.find('TouchAppIcon');
    });
    afterAll(() => wrapper.unmount());

    it('renders properly', () => {
      expect(Object.keys(icon.props()).length).toBe(4);
      expect(icon.prop('type')).toBe('voted');
      expect(icon.prop('color')).toBe('purple');
      expect(icon.prop('label')).toBe('touch icon');
      expect(typeof icon.prop('action')).toBe('function');
      expect(wrapper.find('Tooltip').prop('title')).toBe('touch icon');
      expect(muiIcon).toHaveLength(1);
      expect(typeof muiIcon.prop('onClick')).toBe('function');
      expect(muiIcon.prop('className')).toBe('account-icon purple-color pointer');
      expect(actionSpy).not.toHaveBeenCalled();
      expect(actionSpy).toHaveBeenCalledTimes(0);
      expect(mountToJson(icon)).toMatchSnapshot();
    });
    it('calls action on click', () => {
      expect(actionSpy).not.toHaveBeenCalled();
      click(muiIcon);
      expect(actionSpy).toHaveBeenCalled();
      expect(actionSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('Equalizer Icon', () => {
    beforeAll(() => {
      actionSpy = jest.spyOn(equalizerProps, 'action');
      wrapper = muiMounter(<Icon {...equalizerProps} />);
      icon = wrapper.find('Icon');
      muiIcon = wrapper.find('EqualizerIcon');
    });
    afterAll(() => wrapper.unmount());

    it('renders properly', () => {
      expect(Object.keys(icon.props()).length).toBe(4);
      expect(icon.prop('type')).toBe('vote');
      expect(icon.prop('color')).toBe('purple');
      expect(icon.prop('label')).toBe('equalizer icon');
      expect(typeof icon.prop('action')).toBe('function');
      expect(wrapper.find('Tooltip').prop('title')).toBe('equalizer icon');
      expect(muiIcon).toHaveLength(1);
      expect(typeof muiIcon.prop('onClick')).toBe('function');
      expect(muiIcon.prop('className')).toBe('rotate-90 account-icon purple-color');
      expect(actionSpy).not.toHaveBeenCalled();
      expect(actionSpy).toHaveBeenCalledTimes(0);
      expect(mountToJson(icon)).toMatchSnapshot();
    });
    it('calls action on click', () => {
      expect(actionSpy).not.toHaveBeenCalled();
      click(muiIcon);
      expect(actionSpy).toHaveBeenCalled();
      expect(actionSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('Add Icon', () => {
    beforeAll(() => {
      actionSpy = jest.spyOn(addProps, 'action');
      wrapper = muiMounter(<Icon {...addProps} />);
      icon = wrapper.find('Icon');
      muiIcon = wrapper.find('AddCircleIcon');
    });
    afterAll(() => wrapper.unmount());

    it('renders properly', () => {
      expect(Object.keys(icon.props()).length).toBe(4);
      expect(icon.prop('type')).toBe('add');
      expect(icon.prop('color')).toBe('green');
      expect(icon.prop('label')).toBe('add icon');
      expect(typeof icon.prop('action')).toBe('function');
      expect(wrapper.find('Tooltip').prop('title')).toBe('add icon');
      expect(muiIcon).toHaveLength(1);
      expect(typeof muiIcon.prop('onClick')).toBe('function');
      expect(muiIcon.prop('className')).toBe('account-icon green-color pointer');
      expect(actionSpy).not.toHaveBeenCalled();
      expect(actionSpy).toHaveBeenCalledTimes(0);
      expect(mountToJson(icon)).toMatchSnapshot();
    });
    it('calls action on click', () => {
      expect(actionSpy).not.toHaveBeenCalled();
      click(muiIcon);
      expect(actionSpy).toHaveBeenCalled();
      expect(actionSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('Add Outline Icon', () => {
    beforeAll(() => {
      actionSpy = jest.spyOn(addOutlineProps, 'action');
      wrapper = muiMounter(<Icon {...addOutlineProps} />);
      icon = wrapper.find('Icon');
      muiIcon = wrapper.find('AddCircleOutlineIcon');
    });
    afterAll(() => wrapper.unmount());

    it('renders properly', () => {
      expect(Object.keys(icon.props()).length).toBe(4);
      expect(icon.prop('type')).toBe('added');
      expect(icon.prop('color')).toBe('green');
      expect(icon.prop('label')).toBe('add outline icon');
      expect(typeof icon.prop('action')).toBe('function');
      expect(wrapper.find('Tooltip').prop('title')).toBe('add outline icon');
      expect(muiIcon).toHaveLength(1);
      expect(typeof muiIcon.prop('onClick')).toBe('function');
      expect(muiIcon.prop('className')).toBe('account-icon green-color pointer');
      expect(actionSpy).not.toHaveBeenCalled();
      expect(actionSpy).toHaveBeenCalledTimes(0);
      expect(mountToJson(icon)).toMatchSnapshot();
    });
    it('calls action on click', () => {
      expect(actionSpy).not.toHaveBeenCalled();
      click(muiIcon);
      expect(actionSpy).toHaveBeenCalled();
      expect(actionSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('Wrench Icon', () => {
    beforeAll(() => {
      actionSpy = jest.spyOn(wrenchProps, 'action');
      wrapper = muiMounter(<Icon {...wrenchProps} />);
      icon = wrapper.find('Icon');
      muiIcon = wrapper.find('BuildIcon');
    });
    afterAll(() => wrapper.unmount());

    it('renders properly', () => {
      expect(Object.keys(icon.props()).length).toBe(4);
      expect(icon.prop('type')).toBe('poll');
      expect(icon.prop('color')).toBe('orange');
      expect(icon.prop('label')).toBe('wrench icon');
      expect(typeof icon.prop('action')).toBe('function');
      expect(wrapper.find('Tooltip').prop('title')).toBe('wrench icon');
      expect(muiIcon).toHaveLength(1);
      expect(typeof muiIcon.prop('onClick')).toBe('function');
      expect(muiIcon.prop('className')).toBe('account-icon orange-color pointer');
      expect(actionSpy).not.toHaveBeenCalled();
      expect(actionSpy).toHaveBeenCalledTimes(0);
      expect(mountToJson(icon)).toMatchSnapshot();
    });
    it('calls action on click', () => {
      expect(actionSpy).not.toHaveBeenCalled();
      click(muiIcon);
      expect(actionSpy).toHaveBeenCalled();
      expect(actionSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('List Icon', () => {
    beforeAll(() => {
      actionSpy = jest.spyOn(listProps, 'action');
      wrapper = muiMounter(<Icon {...listProps} />);
      icon = wrapper.find('Icon');
      muiIcon = wrapper.find('ListIcon');
    });
    afterAll(() => wrapper.unmount());

    it('renders properly', () => {
      expect(Object.keys(icon.props()).length).toBe(4);
      expect(icon.prop('type')).toBe('list');
      expect(icon.prop('color')).toBe('purple');
      expect(icon.prop('label')).toBe('list icon');
      expect(typeof icon.prop('action')).toBe('function');
      expect(wrapper.find('Tooltip').prop('title')).toBe('list icon');
      expect(muiIcon).toHaveLength(1);
      expect(typeof muiIcon.prop('onClick')).toBe('function');
      expect(muiIcon.prop('className')).toBe('account-icon purple-color pointer');
      expect(actionSpy).not.toHaveBeenCalled();
      expect(actionSpy).toHaveBeenCalledTimes(0);
      expect(mountToJson(icon)).toMatchSnapshot();
    });
    it('calls action on click', () => {
      expect(actionSpy).not.toHaveBeenCalled();
      click(muiIcon);
      expect(actionSpy).toHaveBeenCalled();
      expect(actionSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('Trash Icon', () => {
    beforeAll(() => {
      actionSpy = jest.spyOn(trashProps, 'action');
      wrapper = muiMounter(<Icon {...trashProps} />);
      icon = wrapper.find('Icon');
      muiIcon = wrapper.find('DeleteIcon');
    });
    afterAll(() => wrapper.unmount());

    it('renders properly', () => {
      expect(Object.keys(icon.props()).length).toBe(4);
      expect(icon.prop('type')).toBe('trash');
      expect(icon.prop('color')).toBe('red');
      expect(icon.prop('label')).toBe('trash icon');
      expect(typeof icon.prop('action')).toBe('function');
      expect(wrapper.find('Tooltip').prop('title')).toBe('trash icon');
      expect(muiIcon).toHaveLength(1);
      expect(typeof muiIcon.prop('onClick')).toBe('function');
      expect(muiIcon.prop('className')).toBe('account-icon red-color pointer');
      expect(actionSpy).not.toHaveBeenCalled();
      expect(actionSpy).toHaveBeenCalledTimes(0);
      expect(mountToJson(icon)).toMatchSnapshot();
    });
    it('calls action on click', () => {
      expect(actionSpy).not.toHaveBeenCalled();
      click(muiIcon);
      expect(actionSpy).toHaveBeenCalled();
      expect(actionSpy).toHaveBeenCalledTimes(1);
    });
  });
});
