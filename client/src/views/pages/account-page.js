import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// Import material-ui
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
// Import Components
import Section from '../components/section';
import ActivityList from '../components/activitylist';


class AccountPage extends Component {
  parseTime = (timeStr) => {
    let timeObj = new Date(timeStr);
		return `${timeObj.getMonth() + 1}/${timeObj.getDate()}/${timeObj.getUTCFullYear()}`;
  };

  render() {
    const { authedUserState, goToUserPolls, openNewPollPopup, deleteUser } = this.props;
    const user = authedUserState.user;
    return (
      <Grid className='grid-container' container
        direction='row'
        justify='center'
        alignItems='flex-start'
      >
        {/* Page Title Area */}
        <Grid className='grid-item' item xs={12} sm={12}>
          <Typography className='page-title' variant='title'>
            Account
          </Typography>
        </Grid>

        {/* Account Area */}
        {!!user && !!user.cuid && !!user.activity && (
          <Grid id='account' className='grid-container' container
            alignItems='flex-start'
            justify='center'
          >
            <Grid item xs={10} sm={5}>
              <Grid container>
                <Grid className='grid-item' item xs={6} sm={12}>
                  {/* Details Section Area */}
                  <Section
                    title='Details'
                    list={[
                      {
                        primary: 'Account ID',
                        secondary: user.cuid
                      }, {
                        primary: 'Name',
                        secondary: user.name
                      }, {
                        primary: 'Email',
                        secondary: user.email
                      }, {
                        primary: 'Member since',
                        secondary: `${this.parseTime(user.date_created)}`
                      }, {
                        primary: 'Account E-mail',
                        secondary: `${user.emailVerified ? 'Verfied' : 'Not Verfied'}`,
                        iconType: 'status',
                        iconColor: `${user.emailVerified ? 'green' : 'orange'}`
                      }
                    ]}
                  />
                </Grid>
                <Grid className='grid-item' item xs={6} sm={12}>
                  {/* Action Section Area */}
                  <Section
                    title='Actions'
                    list={[
                      {
                        primary: 'Create Poll',
                        iconType: 'add',
                        iconColor: 'green',
                        iconAction: openNewPollPopup
                      }, {
                        primary: 'View Polls',
                        iconType: 'list',
                        iconColor: 'blue',
                        secondaryAction: goToUserPolls.bind(null, user.name),
                        secondaryActionLink: '/polls'
                      }, {
                        primary: 'Delete Account',
                        iconAction: deleteUser,
                        iconType: 'user',
                        iconColor: 'red'
                      }
                    ]}
                  />
                </Grid>
              </Grid>
            </Grid>

            <Grid className='grid-item' item xs={10} sm={6}>
              {/* ActivityList Area */}
              <ActivityList
                title='Activity'
                list={user.activity}
              />
            </Grid>
          </Grid>
        )}
      </Grid>
    );
  }
}

AccountPage.contextTypes = {
  router: PropTypes.object
};

AccountPage.propTypes = {
  openNewPollPopup: PropTypes.func.isRequired,
  deleteUser: PropTypes.func.isRequired,
  goToUserPolls: PropTypes.func.isRequired,
  authedUserState: PropTypes.shape({
    user: PropTypes.object
  }).isRequired,
}

export default connect(
  state => ({
    authedUserState: state.users.authedUser
  }), null)(AccountPage);
