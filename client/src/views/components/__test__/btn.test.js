import React from 'react';
import toJson, { mountToJson } from 'enzyme-to-json';
// Import components
import { mountWithRouter } from '../../../utils/__test__/test.helper';
import Btn from '../btn';

const mockFn = jest.fn;
const toBtnProps = {
  text: 'to button text',
  title: 'to button',
  to: '/somewhere'
};
const onClickBtnProps = {
  text: 'onClick button text',
  title: 'onClick button',
  onClick: mockFn
};
const formBtnProps = {
  text: 'form button text',
  title: 'form button',
  form: 'test form',
  type: 'submit'
};
const formProps = {
  action: '/',
  onSubmit: mockFn,
  id: 'test form'
}

describe('<Btn />', () => {

  describe('to Btn', () => {
    let wrapper, toBtn, historyPushSpy;
    beforeEach(() => {
      wrapper = mountWithRouter(<Btn {...toBtnProps} />);
      wrapper.instance().history.push = mockFn;
      // watching routing change
      historyPushSpy = jest.spyOn(wrapper.instance().history, 'push');
      wrapper.update();
      toBtn = wrapper.find('Btn');
    });

    it('renders properly', () => {
      expect(toBtn).toBeDefined();
      expect(toJson(toBtn)).toMatchSnapshot();
      expect(Object.keys(toBtn.props()).length).toBe(3);
      expect(toBtn.prop('text')).toBe('to button text');
      expect(toBtn.find('a').text()).toEqual('to button text');
      expect(toBtn.prop('title')).toBe('to button');
      expect(toBtn.find('Popper').text()).toEqual('to button');
      expect(toBtn.prop('to')).toBe('/somewhere');
    });

    it('send user to new route', () => {
      const aLink = toBtn.find('Link').find('a');
      expect(aLink).toBeDefined();
      expect(aLink.prop('href')).toBe('/somewhere');
      expect(aLink.prop('onClick')).toBeDefined();
      aLink.simulate('click', { preventDefault() {}, button: 0 });
      wrapper.update();
      expect(historyPushSpy).toHaveBeenCalled();
      expect(historyPushSpy).toHaveBeenCalledTimes(1);
      expect(historyPushSpy).toHaveBeenCalledWith('/somewhere');
    });
  });


  describe('onClick Btn', () => {
    let wrapper, onClickBtn, onClickSpy, historyPushSpy;
    beforeEach(() => {
      onClickSpy = jest.spyOn(onClickBtnProps, 'onClick');
      wrapper = mountWithRouter(<Btn {...onClickBtnProps} />);
      wrapper.instance().history.push = mockFn;
      // watching routing change
      historyPushSpy = jest.spyOn(wrapper.instance().history, 'push');
      wrapper.update();
      onClickBtn = wrapper.find('Btn');
    });

    it('renders properly', () => {
      expect(onClickBtn).toBeDefined();
      expect(toJson(onClickBtn)).toMatchSnapshot();
      expect(Object.keys(onClickBtn.props()).length).toBe(3);
      expect(onClickBtn.prop('text')).toBe('onClick button text');
      expect(onClickBtn.find('button').text()).toEqual('onClick button text');
      expect(onClickBtn.prop('title')).toBe('onClick button');
      expect(onClickBtn.find('Popper').text()).toEqual('onClick button');
      expect(onClickBtn.prop('onClick')).toBeDefined();
    });

    it('calls provided onClick func', () => {
      onClickBtn.prop('onClick')();
      expect(onClickBtn.prop('onClick')).toBeCalled();
      expect(onClickSpy).toHaveBeenCalled();
      expect(onClickSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('form Btn', () => {
    let wrapper, formSubmitSpy, historyPushSpy, form;
    beforeEach(() => {
      formSubmitSpy = jest.spyOn(formProps, 'onSubmit');
      wrapper = mountWithRouter(<form {...formProps}>
        <Btn {...formBtnProps} />
      </form>);
      wrapper.instance().history.push = mockFn;
      // watching routing change
      historyPushSpy = jest.spyOn(wrapper.instance().history, 'push');
      wrapper.update();
      form = wrapper.find('form');
    });

    it('renders properly', () => {
      const formBtn = form.find('Btn');
      expect(formBtn).toBeDefined();
      expect(toJson(formBtn)).toMatchSnapshot();
      expect(Object.keys(formBtn.props()).length).toBe(4);
      expect(formBtn.prop('title')).toBe('form button');
      expect(formBtn.find('button').text()).toEqual('form button text');
      expect(formBtn.prop('title')).toBe('form button');
      expect(formBtn.find('Popper').text()).toEqual('form button');
      expect(formBtn.prop('form')).toBe('test form');
      expect(formBtn.prop('type')).toBe('submit');
    });

    it('submits call forms onSubmit func', () => {
      const button = form.find('button');
      button.simulate('submit', { preventDefault() {}, button: 0 });
      wrapper.update();
      expect(formSubmitSpy).toHaveBeenCalled();
      expect(formSubmitSpy).toHaveBeenCalledTimes(1);
    });
  });

  afterAll(() => {
    mounter.cleanUp();
    spy.mockClear()
  });
});
