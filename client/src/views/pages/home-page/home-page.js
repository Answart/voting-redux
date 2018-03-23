import React from 'react';
import PropTypes from 'prop-types';
// Import material-ui
import Typography from 'material-ui/Typography';
import Grid from 'material-ui/Grid';


export class HomePage extends React.Component {
  render() {
    const {
      appName
    } = this.props;
    return (
      <Grid className='home-page' container
        alignItems='center'
        direction='column'
        justify='center'
      >

        <Grid className='home-page-title grid-item' item xs={12} sm={12}>
          <Typography variant='headline' color='inherit'>
            {`Welcome to ${appName}!`}
          </Typography>
        </Grid>

        <Grid className='grid-item' item xs={12} sm={12}>
          <strong>Make a Poll</strong>
        </Grid>

        <Grid className='home-page-subtitle grid-item' item xs={12} sm={12}>
          <Typography variant='subheading' color='inherit'>
            or you can <strong>own your polls</strong> or <strong>view polls</strong>
          </Typography>
        </Grid>
        
      </Grid>
    );
  }
}

HomePage.propTypes = {
  appName: PropTypes.string.isRequired
}

export default HomePage;
