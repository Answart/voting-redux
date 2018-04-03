import React from 'react';
import { mountToJson } from 'enzyme-to-json';
// Import components
import AboutPage from '../about-page';

const mockFn = jest.fn;
const props = {
  appName: 'Voting Redux',
  creatorName: 'Alexandra Swart',
  logoImgUrl: 'www.google.com',
  creatorImgUrl: 'www.google2.com'
};


describe('<AboutPage />', () => {
  let wrapper;
  beforeAll(() => wrapper = mountWithRouterConnected(<AboutPage {...props} />));

  it('renders properly', () => {
    const page = wrapper.find(AboutPage);
    // expect(toJson(page, { mode:'shallow' })).toMatchSnapshot();
    expect(mountToJson(page)).toMatchSnapshot();
    expect(page).toBeDefined();
    expect(Object.keys(page.props()).length).toBe(4);
  });

  it('title renders properly', () => {
    const title = wrapper.find('Typography.page-title');
    expect(title).toBeDefined();
    expect(title.prop('variant')).toBe('title');
    expect(title.text()).toEqual('About');
  });

  it('left side renders properly', () => {
    const leftSide = wrapper.find('Grid#left');
    expect(leftSide).toBeDefined();
    expect(leftSide.find('h3').text()).toBe('Project');
    expect(leftSide.find('Avatar').prop('alt')).toBe('Voting Redux');
    expect(leftSide.find('Avatar').prop('src')).toBe('www.google.com');
    const li = leftSide.find('li');
    expect(li.get(0).props.children).toBe('Voting Redux');
    expect(li.get(1).props.children).toBe('Using a tech stack of React + Node.js + Express + MongoDB.');
    expect(li.get(2).props.children).toBe('Other key framework/packages used including Material-ui, React Router(v4), Mongoose.');
  });

  it('right side renders properly', () => {
    const rightSide = wrapper.find('Grid#right');
    expect(rightSide).toBeDefined();
    expect(rightSide.find('h3').text()).toBe('Creator');
    expect(rightSide.find('Avatar').prop('alt')).toBe('Alexandra Swart');
    expect(rightSide.find('Avatar').prop('src')).toBe('www.google2.com');
    const iconButtons = rightSide.find('IconButton');
    expect(iconButtons.get(0).props.href).toBe('https://github.com/answart');
    expect(iconButtons.get(1).props.href).toBe('https://www.linkedin.com/in/alexandra-swart-582a1235/');
    expect(iconButtons.get(2).props.href).toBe('mailto:answart@sbcglobal.net.com');
    expect(rightSide.find('i')).toBeDefined();
  });
});
