import React from 'react';
import * as d3 from 'd3';
// Import components
import Poll from '../poll';

import { mockPoll } from '../../../utils/__test__';


describe('<Poll />', () => {
  let wrapper ;
  beforeAll(async () => {
    const props = {
      votes: mockPoll.votes,
      choices: mockPoll.choices
    };
    wrapper = muiMounter(<Poll {...props} />);
    await wrapper.find(Poll).instance().componentDidMount();
  });

  it('renders properly', async () => {
    const page = wrapper.find('Poll');
    expect(page).toHaveLength(1);
    expect(Object.keys(page.props()).length).toBe(2);
    expect(page.prop('votes')).toBe(10);
    expect(page.prop('choices')).toEqual([
      { id: 0, label: 'Springer Spaniel', vote: 4 },
      { id: 1, label: 'Cocker Spaniel', vote: 6 }
    ]);
    expect(page.find('div#chart')).toHaveLength(1);
    expect(typeof page.instance().renderChart).toBe('function');
    expect(mountToJson(page)).toMatchSnapshot();
  });

  it('renders d3 chart properly on mount (renderChart())', async () => {
    let chart = d3.select('#chart');
    let choices = chart.selectAll('div.choice').nodes();
    let labels = chart.selectAll('div.poll-chart-label').nodes();
    let bars = chart.selectAll('.poll-chart-bar').nodes();
    let votes = chart.selectAll('.poll-chart-bar').nodes();

    expect(d3.select(choices[0]).style('height')).toBe('40px');
    expect(d3.select(choices[1]).style('height')).toBe('40px');

    expect(d3.select(labels[0]).text()).toBe('Springer Spaniel');
    expect(d3.select(labels[1]).text()).toBe('Cocker Spaniel');

    expect(d3.select(bars[0]).style('height')).toBe('20px');
    expect(d3.select(bars[0]).style('width')).toBe('0px');
    expect(d3.select(bars[1]).style('height')).toBe('20px');
    expect(d3.select(bars[1]).style('width')).toBe('0px');

    expect(d3.select(votes[0]).text()).toBe('4');
    expect(d3.select(votes[1]).text()).toBe('6');
  });
});
