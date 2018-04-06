import React from 'react';
import * as d3 from 'd3';
import { createMount } from 'material-ui/test-utils'; // built on top of enzyme
// Import components
import Poll from '../poll';


describe('<Poll />', () => {
  let wrapper;
  beforeAll(async () => {
    const muiMounter = createMount();
    const props = {
      votes: 10,
      choices: [
        { id: 0, label: 'red', vote: 4 },
        { id: 1, label: 'blue', vote: 6 }
      ]
    };
    wrapper = muiMounter(<Poll {...props} />);
    await wrapper.find('Poll').instance().componentDidMount();
    await asyncFlush();
    wrapper.update();
    await asyncFlush();
  });

  it('renders properly', async() => {
    const page = wrapper.find('Poll');
    await page.instance().componentDidMount();
    expect(page).toHaveLength(1);
    expect(Object.keys(page.props()).length).toBe(2);
    expect(page.prop('votes')).toBe(10);
    expect(page.prop('choices')).toEqual([
      { id: 0, label: 'red', vote: 4 },
      { id: 1, label: 'blue', vote: 6 }
    ]);
    expect(page.find('div#chart')).toHaveLength(1);
    expect(typeof page.instance().renderChart).toBe('function');
    expect(mountToJson(page)).toMatchSnapshot();
  });

  it('renderChart() renders the d3 chart', async () => {
    let chart = d3.select('#chart');
    let choices = chart.selectAll('div.choice').nodes();
    let labels = chart.selectAll('div.poll-chart-label').nodes();
    let bars = chart.selectAll('.poll-chart-bar').nodes();
    let votes = chart.selectAll('.poll-chart-bar').nodes();

    expect(d3.select(choices[0]).style('height')).toBe('40px');
    expect(d3.select(choices[1]).style('height')).toBe('40px');

    expect(d3.select(labels[0]).text()).toBe('red');
    expect(d3.select(labels[1]).text()).toBe('blue');

    expect(d3.select(bars[0]).style('height')).toBe('20px');
    expect(d3.select(bars[0]).style('width')).toBe('0px');
    expect(d3.select(bars[1]).style('height')).toBe('20px');
    expect(d3.select(bars[1]).style('width')).toBe('0px');

    expect(d3.select(votes[0]).text()).toBe('4');
    expect(d3.select(votes[1]).text()).toBe('6');
  });
});
