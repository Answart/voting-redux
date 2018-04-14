import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// Import material-ui
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
// Import components
import Btn from '../components/btn';
import Pollslist from '../components/pollslist';
import Pollsfilter from '../components/pollsfilter';


export class PollsListPage extends React.Component {
  render() {
    const {
      openVotePollPopup, loadActivePoll, getPolls, filteredPollsState
    } = this.props;
    const polls = filteredPollsState.polls;
    const pollColumnData = [
      {id:0, key:'open', label:'Status', numeric:false, colSpan:10 },
      {id:1, key:'votes', label:'Votes', numeric:false, colSpan:10 },
      {id:2, key:'title', label:'Title', numeric:false, colSpan:40 },
      {id:3, key:'user_name', label:'User', numeric:false, colSpan:20 },
      {id:4, key:'date_created', label:'Date', numeric:false, colSpan:20 }
    ]
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
              <Pollsfilter
                filters={filteredPollsState.filters}
                pollColumnData={pollColumnData}
                pollsLoading={filteredPollsState.loading}
                loadFilteredPolls={this.props.loadFilteredPolls}
              />
            </Grid>
            <Grid className='grid-item' item xs={12} sm={10} zeroMinWidth>
              {/* Pollslist Area */}
              <Pollslist
                polls={polls}
                pollColumnData={pollColumnData}
                openVotePollPopup={openVotePollPopup}
                loadActivePoll={loadActivePoll}
                authed={this.props.authed}
              />
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
            disabled={filteredPollsState.loading}
            onClick={getPolls}
          />
        </Grid>
      </Grid>
    );
  }
}


PollsListPage.propTypes = {
  openVotePollPopup: PropTypes.func.isRequired,
  getPolls: PropTypes.func.isRequired,
  loadActivePoll: PropTypes.func.isRequired,
  loadFilteredPolls: PropTypes.func.isRequired,
  authed: PropTypes.bool.isRequired,
  filteredPollsState: PropTypes.shape({
    loading: PropTypes.bool.isRequired,
    error: PropTypes.string,
    message: PropTypes.string,
    filters: PropTypes.array,
    polls: PropTypes.array
  }).isRequired
}

export default connect(
  state => ({
    filteredPollsState: state.polls.filtered
  }), null)(PollsListPage);
