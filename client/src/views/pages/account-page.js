import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// Import material-ui
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';


class AccountPage extends Component {

  render() {
    const { authedUserState } = this.props;
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
            <Grid className='grid-item' item xs={10} sm={5}>
              <Grid container>
                <Grid className='grid-item' item xs={6} sm={12}>
                  {/* Details Section Area */}
                </Grid>
                <Grid className='grid-item' item xs={6} sm={12}>
                  {/* Action Section Area */}
                </Grid>
              </Grid>
            </Grid>

            <Grid className='grid-item' item xs={10} sm={6}>
              {/* ActivityList Area */}
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
  authedUserState: PropTypes.shape({
    user: PropTypes.object
  }).isRequired,
}

export default connect(null, null)(AccountPage);
