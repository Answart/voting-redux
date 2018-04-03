import React from 'react';
import { mountToJson } from 'enzyme-to-json';
import { createMount } from 'material-ui/test-utils'; // built on top of enzyme
// Import components
import Footer from '../footer';


describe('<Footer />', () => {
  it('renders properly', () => {
    const mounter = createMount();
    let wrapper = mounter(<Footer />);
    expect(wrapper).toBeDefined();
    const icons = wrapper.find('IconButton');
    expect(icons.length).toBe(3);
    expect(icons.get(0).props.href).toBe('https://github.com/answart');
    expect(icons.get(1).props.href).toBe('https://www.linkedin.com/in/alexandra-swart-582a1235/');
    expect(icons.get(2).props.href).toBe('mailto:answart@sbcglobal.net.com');
    expect(wrapper.find('p').text()).toBe('© Alexandra Swart 2018')
    expect(mountToJson(wrapper)).toMatchSnapshot();
  });
});
