import React from 'react';
import { mountWithRouterConnected } from '../../../utils/__test__/test.helper';
import HomePage from '../home-page';

const mockFn = jest.fn;
const pageProps = {
  appName: 'Voting Redux',
  homePageImgUrl: 'www.google.com',
  openAuthPopup: mockFn,
  openNewPollPopup: mockFn
};


describe('<HomePage />', () => {
  let wrapper, openAuthPopupSpy, openNewPollPopupSpy, historyPushSpy;
  beforeAll(() => {
    openAuthPopupSpy = jest.spyOn(pageProps, 'openAuthPopup');
    openNewPollPopupSpy = jest.spyOn(pageProps, 'openNewPollPopup');
    wrapper = mountWithRouterConnected(<HomePage {...pageProps} />);
    wrapper.find('MemoryRouter').instance().history.push = mockFn;
    historyPushSpy = jest.spyOn(wrapper.find('MemoryRouter').instance().history, 'push');
    wrapper.update();
  });

  it('renders properly', () => {
    expect(wrapper.find('MemoryRouter').instance().history.location.pathname).toBe('/');
    const page = wrapper.find(HomePage);
    expect(page).toBeDefined();
    expect(Object.keys(page.props()).length).toBe(4);
  });

  describe('title', () => {
    it('renders properly', () => {
      const title = wrapper.find('Grid.home-page-title').find('Typography').find('h1');
      expect(title).toBeDefined();
      expect(title.text()).toEqual('Welcome to Voting Redux!');
      expect(toJson(title)).toMatchSnapshot();
    });
  });

  describe('"Make a Poll" Btn', () => {
    let makeBtn;
    beforeEach(() => makeBtn = wrapper.find('Grid.home-page-btn').find('Btn'));

    it('renders properly', () => {
      expect(makeBtn).toBeDefined();
      expect(Object.keys(makeBtn.props()).length).toBe(3);
      expect(makeBtn.prop('size')).toBe('large');
      expect(makeBtn.prop('text')).toBe('Make a Poll');
      expect(makeBtn.text()).toEqual('Make a Poll');
      expect(makeBtn.prop('onClick')).toBeDefined();
      expect(toJson(makeBtn)).toMatchSnapshot();
    });

    it('calls prop openNewPollPopup()', () => {
      makeBtn.prop('onClick')();
      expect(makeBtn.prop('onClick')).toBeCalled();
      expect(openNewPollPopupSpy).toHaveBeenCalled();
      expect(openNewPollPopupSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('subtitle', () => {
    let subtitle;
    beforeEach(() => subtitle = wrapper.find('Grid.home-page-subtitle').find('Typography').find('h3'));

    it('renders properly', () => {
      expect(subtitle).toBeDefined();
      expect(subtitle.text()).toEqual('or you can own your polls or view polls');
    });
    describe('"own your polls" Btn', () => {
      let ownBtn;
      beforeEach(() => ownBtn = subtitle.find('Btn.own-polls'));
      it('renders properly', () => {
        expect(ownBtn).toBeDefined();
        expect(ownBtn.prop('onClick')).toBeDefined();
        expect(ownBtn.prop('size')).toBe('small');
        expect(ownBtn.prop('text')).toBe(' own your polls ');
        expect(ownBtn.text()).toEqual(' own your polls ');
        expect(toJson(ownBtn)).toMatchSnapshot();
      });
      it('calls prop openAuthPopup()', () => {
        const button = ownBtn.find('button');
        expect(button).toBeDefined();
        button.prop('onClick')();
        expect(button.prop('onClick')).toBeCalled();
        expect(openAuthPopupSpy).toHaveBeenCalled();
        expect(openAuthPopupSpy).toHaveBeenCalledTimes(1);
      });
    });

    describe('"view polls" Btn', () => {
      let viewBtn;
      beforeEach(() => viewBtn = subtitle.find('Btn.view-polls'));

      it('renders properly', () => {
        expect(viewBtn).toBeDefined();
        expect(viewBtn.prop('to')).toBe('/polls');
        expect(viewBtn.prop('size')).toBe('small');
        expect(viewBtn.prop('text')).toBe(' view polls');
        expect(viewBtn.text()).toEqual(' view polls');
        expect(toJson(viewBtn)).toMatchSnapshot();
      });
      it('pushes location to `/polls`', () => {
        const aLink = viewBtn.find('Link').find('a');
        expect(aLink).toBeDefined();
        expect(aLink.prop('href')).toBe('/polls');
        expect(aLink.prop('onClick')).toBeDefined();
        aLink.simulate('click', { preventDefault() {}, button: 0 });
        wrapper.update();
        expect(historyPushSpy).toHaveBeenCalled();
        expect(historyPushSpy).toHaveBeenCalledTimes(1);
        expect(historyPushSpy).toHaveBeenCalledWith('/polls');
        // pathname would change if .push was not mocked
        // expect(wrapper.instance().history.location.pathname).toBe('/polls');
      });
    });
  });
});
