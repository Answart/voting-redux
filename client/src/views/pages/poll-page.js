import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// Import material-ui
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
// Import components
import Poll from '../components/poll';


class PollPage extends Component {
  componentDidMount = () => this.handleLoadViewedPoll();

  handleLoadViewedPoll = () => {
    const { locationPath, loadViewedPoll } = this.props;
    if (!!locationPath) {
      const pollIdRegexp = /\/poll\/(\w+)/g.exec(locationPath);
      if (!!pollIdRegexp && !!pollIdRegexp[1]) {
        loadViewedPoll(pollIdRegexp[1]);
      }
    }
  }

  render() {
    const {
      authedUser, openVotePollPopup
    } = this.props;
    const poll = {
      title: 'random title',
      votes: 10,
      choices: [
        { id: 0, label: 'red', vote: 4 },
        { id: 1, label: 'blue', vote: 6 }
      ]
    };
    return (
      <Grid className='grid-container' container
        direction='row'
        justify='center'
        alignItems='flex-start'
      >
        {/* Page Title Area */}
        <Grid className='grid-item' item xs={12} sm={12}>
          <Typography className='page-title' variant='title'>
            {`Poll ${(!!poll && !!poll.title) ? `'${poll.title}'` : 'not found'}`}
          </Typography>
        </Grid>

        {/* Poll Area */}
        {!!poll && (
          <Grid id='poll' className='grid-container' container
            direction='row'
            justify='center'
            alignItems='flex-start'
          >
            {/* Chart */}
            <Grid className='grid-item' item xs={12} sm={9}>
              {/* Poll Area */}
              <Poll
                votes={poll.votes}
                choices={poll.choices}
              />
            </Grid>
            {/* Details */}
            <Grid item xs={12} sm={10}>
              <Grid className='grid-container' container
                direction='row'
                justify='center'
                alignItems='flex-start'
              >
                <Grid className='grid-item' item xs={6} sm={7}>
                  {/* Info Section Area */}
                </Grid>

                <Grid className='grid-item' item xs={6} sm={5}>
                  {/* Actions Section Area */}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        )}
      </Grid>
    );
  }
}

PollPage.contextTypes = {
  router: PropTypes.object
};

PollPage.propTypes = {
  openVotePollPopup: PropTypes.func.isRequired,
  loadViewedPoll: PropTypes.func.isRequired,
  locationPath: PropTypes.string.isRequired,
  authedUser: PropTypes.shape({
    id: PropTypes.string,
    token: PropTypes.string
  })
}

export default connect(null, null)(PollPage);
