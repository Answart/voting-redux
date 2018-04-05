import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// Import material-ui
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
// Import components
import Btn from '../components/btn';


export class PollsListPage extends React.Component {
  render() {
    const {
      openVotePollPopup,
      fetchPolls,
    } = this.props;
    const polls = [];
    return (
      <Grid className='grid-container' container
        direction='row'
        justify='center'
        alignItems='flex-start'
      >
        {/* Page Title Area */}
        <Grid className='grid-item' item xs={12} sm={12}>
          <Typography className='page-title' variant='title'>
            Polls
          </Typography>
        </Grid>

        {!!polls && (
          <Grid className='grid-container' container
            direction='row'
            justify='center'
            alignItems='flex-start'
          >
            <Grid className='grid-item' item xs={12} sm={11} zeroMinWidth>
              {/* Pollsfilter Area */}
            </Grid>
            <Grid className='grid-item' item xs={12} sm={10} zeroMinWidth>
              {/* Pollslist Area */}
            </Grid>
          </Grid>
        )}

        {/* Reload polls button Area */}
        <Grid className='grid-item' item xs={12} sm={10}
          style={{ textAlign:'center' }}
        >
          <Btn
            id='fetch-polls'
            text='Fetch Polls'
            disabled={false}
            onClick={fetchPolls}
          />
        </Grid>
      </Grid>
    );
  }
}


PollsListPage.propTypes = {
  openVotePollPopup: PropTypes.func.isRequired,
  fetchPolls: PropTypes.func.isRequired,
  authed: PropTypes.bool.isRequired
}

export default connect(null, null)(PollsListPage);
