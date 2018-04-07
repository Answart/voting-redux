import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// Import material-ui
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
// Import components
import Btn from '../components/btn';
import Pollslist from '../components/pollslist';


export class PollsListPage extends React.Component {
  render() {
    const {
      openVotePollPopup, loadActivePoll, fetchPolls,
    } = this.props;
    const polls = [{
        cuid: 1,
        title: 'random title',
        user_name: 'name1',
        votes: 10,
        open: true,
        date_created: '2018-04-06T04:34:25.183Z',
        choices: [
          { id: 0, label: 'red', vote: 4 },
          { id: 1, label: 'blue', vote: 6 }
        ]
      }, {
        cuid: 2,
        title: 'random title2',
        user_name: 'name2',
        votes: 30,
        open: false,
        date_created: '2018-04-06T04:34:01.247Z',
        choices: [
          { id: 0, label: 'red2', vote: 14 },
          { id: 1, label: 'blue2', vote: 16 }
        ]
      }, {
        cuid: 3,
        title: 'random title3',
        user_name: 'name3',
        votes: 30,
        open: false,
        date_created: '2018-04-06T04:34:01.247Z',
        choices: [
          { id: 0, label: 'red3', vote: 14 },
          { id: 1, label: 'blue3', vote: 16 }
        ]
      }, {
        cuid: 4,
        title: 'random title4',
        user_name: 'name4',
        votes: 30,
        open: false,
        date_created: '2018-04-06T04:34:01.247Z',
        choices: [
          { id: 0, label: 'red2', vote: 14 },
          { id: 1, label: 'blue2', vote: 16 }
        ]
      }, {
        cuid: 5,
        title: 'random title5',
        user_name: 'name5',
        votes: 30,
        open: false,
        date_created: '2018-04-06T04:34:01.247Z',
        choices: [
          { id: 0, label: 'red2', vote: 14 },
          { id: 1, label: 'blue2', vote: 16 }
        ]
      }, {
        cuid: 6,
        title: 'random title6',
        user_name: 'name6',
        votes: 30,
        open: false,
        date_created: '2018-04-06T04:34:01.247Z',
        choices: [
          { id: 0, label: 'red2', vote: 14 },
          { id: 1, label: 'blue2', vote: 16 }
        ]
      }, {
        cuid: 7,
        title: 'random title7',
        user_name: 'name7',
        votes: 30,
        open: false,
        date_created: '2018-04-06T04:34:01.247Z',
        choices: [
          { id: 0, label: 'red2', vote: 14 },
          { id: 1, label: 'blue2', vote: 16 }
        ]
      }, {
        cuid: 8,
        title: 'random title8',
        user_name: 'name8',
        votes: 30,
        open: false,
        date_created: '2018-04-06T04:34:01.247Z',
        choices: [
          { id: 0, label: 'red2', vote: 14 },
          { id: 1, label: 'blue2', vote: 16 }
        ]
      }, {
        cuid: 9,
        title: 'random title9',
        user_name: 'name9',
        votes: 30,
        open: false,
        date_created: '2018-04-06T04:34:01.247Z',
        choices: [
          { id: 0, label: 'red2', vote: 14 },
          { id: 1, label: 'blue2', vote: 16 }
        ]
      }, {
        cuid: 10,
        title: 'random title10',
        user_name: 'name10',
        votes: 30,
        open: false,
        date_created: '2018-04-06T04:34:01.247Z',
        choices: [
          { id: 0, label: 'red2', vote: 14 },
          { id: 1, label: 'blue2', vote: 16 }
        ]
      }
    ];
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
  loadActivePoll: PropTypes.func.isRequired,
  authed: PropTypes.bool.isRequired
}

export default connect(null, null)(PollsListPage);
