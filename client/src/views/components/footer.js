import React, { Component } from 'react';
import IconButton from 'material-ui/IconButton';


class Footer extends Component {
  render() {
    return (
      <footer id='footer'>
        <IconButton href='https://github.com/answart' color='primary'>
          <span className='fa fa-github icon' />
        </IconButton>
        <IconButton href='https://www.linkedin.com/in/alexandra-swart-582a1235/' color='primary'>
          <span className='fa fa-linkedin-square icon' />
        </IconButton>
        <IconButton href='mailto:answart@sbcglobal.net.com' color='primary'>
          <span className='fa fa-envelope icon' />
        </IconButton>
        <p>&copy; Alexandra Swart 2018</p>
      </footer>
    );
  }
};

export default Footer;
