import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// Import material-ui
import Typography from 'material-ui/Typography';
import Grid from 'material-ui/Grid';
// Import components
import Btn from '../components/btn';


export class HomePage extends React.Component {
  render() {
    const {
      appName, homePageImgUrl, openAuthPopup, openNewPollPopup
    } = this.props;
    return (
      <Grid className='home-page' container
        alignItems='center'
        direction='column'
        justify='center'
      >

        <span className='background-image'
          style={{ backgroundImage: `url(${homePageImgUrl})` }}
        >
          <span className='background-backdrop' />
        </span>
        <Grid className='home-page-title grid-item' item xs={12} sm={12}>
          <Typography variant='headline' color='inherit'>
            {`Welcome to ${appName}!`}
          </Typography>
        </Grid>

        <Grid className='home-page-btn grid-item' item xs={12} sm={12}>
          <Btn
            size='large'
            text='Make a Poll'
            onClick={openNewPollPopup}
          />
        </Grid>

        <Grid className='home-page-subtitle grid-item' item xs={12} sm={12}>
          <Typography variant='subheading' color='inherit'>
            or you can
            <Btn className='own-polls'
              span={true}
              variant='flat'
              size='small'
              text=' own your polls '
              onClick={openAuthPopup}
              style={{ paddingBottom:10 }}
            />
            or
            <Btn className='view-polls'
              span={true}
              variant='flat'
              size='small'
              text=' view polls'
              to='/polls'
              style={{ paddingBottom:10 }}
            />
          </Typography>
        </Grid>

      </Grid>
    );
  }
}

HomePage.propTypes = {
  appName: PropTypes.string.isRequired,
  homePageImgUrl: PropTypes.string.isRequired,
  openAuthPopup: PropTypes.func.isRequired,
  openNewPollPopup: PropTypes.func.isRequired
}

//=====================================
//  CONNECT
//-------------------------------------

export default connect(null, null)(HomePage);
