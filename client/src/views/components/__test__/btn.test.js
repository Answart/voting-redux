import React from 'react';
// Import components
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
  afterEach(() => jest.clearAllMocks());

  describe('"to" Btn', () => {
    let wrapper, historyPushSpy, toBtn;
    beforeEach(async () => {
      wrapper = mountWithRouter(<Btn {...toBtnProps} />);
      wrapper.instance().history.push = mockFn;
      historyPushSpy = jest.spyOn(wrapper.instance().history, 'push');
      wrapper.update();
      toBtn = wrapper.find('Btn');
      await asyncFlush();
    });

    it('renders properly', () => {
      expect(toBtn).toHaveLength(1);
      expect(Object.keys(toBtn.props()).length).toBe(3);
      expect(toBtn.prop('text')).toBe('to button text');
      expect(toBtn.find('a').text()).toEqual('to button text');
      expect(toBtn.prop('title')).toBe('to button');
      expect(toBtn.find('Popper').text()).toEqual('to button');
      expect(toBtn.prop('to')).toBe('/somewhere');
      // expect(mountToJson(toBtn)).toMatchSnapshot();
    });

    it('sends user to new route', () => {
      expect(historyPushSpy).not.toHaveBeenCalled();
      clickLink(toBtn);
      expect(historyPushSpy).toHaveBeenCalled();
      expect(historyPushSpy).toHaveBeenCalledTimes(1);
      expect(historyPushSpy).toHaveBeenCalledWith('/somewhere');
    });
  });


  describe('"onClick" Btn', () => {
    let wrapper, historyPushSpy, onClickSpy, onClickBtn;
    beforeEach(async () => {
      onClickSpy = jest.spyOn(onClickBtnProps, 'onClick');
      wrapper = mountWithRouter(<Btn {...onClickBtnProps} />);
      wrapper.instance().history.push = mockFn;
      historyPushSpy = jest.spyOn(wrapper.instance().history, 'push');
      wrapper.update();
      onClickBtn = wrapper.find('Btn');
      await asyncFlush();
    });

    it('renders properly', () => {
      expect(onClickBtn).toHaveLength(1);
      expect(Object.keys(onClickBtn.props()).length).toBe(3);
      expect(onClickBtn.prop('text')).toBe('onClick button text');
      expect(onClickBtn.find('button').text()).toEqual('onClick button text');
      expect(onClickBtn.prop('title')).toBe('onClick button');
      expect(onClickBtn.find('Popper').text()).toEqual('onClick button');
      expect(typeof onClickBtn.prop('onClick')).toBe('function');
      expect(mountToJson(onClickBtn)).toMatchSnapshot();
    });

    it('calls onClick() on click', () => {
      expect(onClickSpy).not.toHaveBeenCalled();
      clickButton(onClickBtn);
      expect(onClickBtn.prop('onClick')).toBeCalled();
      expect(onClickSpy).toHaveBeenCalled();
      expect(onClickSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('"form" Btn', () => {
    let wrapper, historyPushSpy, formSubmitSpy, form;
    beforeEach(async () => {
      formSubmitSpy = jest.spyOn(formProps, 'onSubmit');
      wrapper = mountWithRouter(
        <form {...formProps}>
          <Btn {...formBtnProps} />
        </form>
      );
      wrapper.instance().history.push = mockFn;
      historyPushSpy = jest.spyOn(wrapper.instance().history, 'push');
      wrapper.update();
      form = wrapper.find('form');
      await asyncFlush();
    });

    it('renders properly', () => {
      const formBtn = form.find('Btn');
      expect(formBtn).toBeDefined();
      expect(Object.keys(formBtn.props()).length).toBe(4);
      expect(formBtn.prop('title')).toBe('form button');
      expect(formBtn.find('button').text()).toEqual('form button text');
      expect(formBtn.prop('title')).toBe('form button');
      expect(formBtn.find('Popper').text()).toEqual('form button');
      expect(formBtn.prop('form')).toBe('test form');
      expect(formBtn.prop('type')).toBe('submit');
      expect(mountToJson(formBtn)).toMatchSnapshot();
    });

    it('submits call forms onSubmit func', () => {
      expect(formSubmitSpy).not.toHaveBeenCalled();
      submitButton(form);
      expect(formSubmitSpy).toHaveBeenCalled();
      expect(formSubmitSpy).toHaveBeenCalledTimes(1);
    });
  });

  afterAll(() => {
    mounter.cleanUp();
    spy.mockClear()
  });
});
