import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';
// Import material-ui
import Paper from 'material-ui/Paper';


class Poll extends Component {
  componentWillReceiveProps = (nextProps) => {
    if (!!this.props.votes && !!nextProps.votes && (this.props.votes !== nextProps.votes)) {
      this.renderChart(nextProps.choices);
    }
  }

  renderChart = (incData = null) => {
    const data = (!!incData && incData.length)
      ? incData
      : ((!!this.props.choices && !!this.props.choices.length
        ? this.props.choices
        : null));
    if (!data || (!!data && !data.length)) { return };
    let chart = d3.select('#chart');
    let width = chart.node().clientWidth;
    let xScale = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.vote)])
      .range([0, width]);
    // Remove previous choices for clean start.
    chart.selectAll('.choice').remove();
    // Create div for each choice
    let choices = chart
      .selectAll('.choice')
      .data(data)
      .enter()
      .append('div')
      .attr('class', 'choice');
    choices.style('height', '40px');
    // Attach the label div to choice
    choices.append('div').attr('class', 'poll-chart-label').text(d => d.label);
    // Attach bar div to choice
    choices
      .append('div')
      .attr('class', 'poll-chart-bar')
      .style('top', (d, i) => i * 5 + 3 + 'px')
      .style('height', '20px')
      .style('width', '0px')
      .style('border-radius', '4px')
      .transition()
      .delay(500)
      .duration(1000)
      .style('width', d => xScale(d.vote) + 'px');
    // Attaching vote number to bar
    choices
      .select('.poll-chart-bar')
      .append('span')
      .attr('class', 'poll-chart-vote')
      .text(d => d.vote);
  }
  componentDidMount(e) {
    this.renderChart(this.props.choices);
    window.addEventListener('resize', this.renderChart);
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.renderChart);
  }
  render() {
    return (
      <Paper className='poll-chart-paper'>
        <div
          className='poll-chart'
          id='chart'
          ref='chart'
        ></div>
      </Paper>
    )
  }
};

Poll.propTypes = {
  votes: PropTypes.number.isRequired,
  choices: PropTypes.array.isRequired
};

export default Poll;
