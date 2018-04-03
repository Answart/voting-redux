import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
// Import material-ui
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';
import { MenuItem } from 'material-ui/Menu';
import Popover from 'material-ui/Popover';
import Button from 'material-ui/Button';
import Divider from 'material-ui/Divider';
import MenuIcon from 'material-ui-icons/Menu';
import IconButton from 'material-ui/IconButton';
// Import components
import Btn from './btn';


class Header extends Component {
  constructor(props) {
    super(props)
    this.state = { menuPopupAnchorEl: null };
    this.handleMenuPopoverOpen = this.handleMenuPopoverOpen.bind(this);
    this.handleMenuPopoverClose = this.handleMenuPopoverClose.bind(this);
  }
  handleMenuPopoverOpen = e => {
    if (!!e && !!e.preventDefault) {
      e.preventDefault();
    };
    this.setState({ menuPopupAnchorEl: e.currentTarget })
  }
  handleMenuPopoverClose = e => {
    if (!!e && !!e.preventDefault) {
      e.preventDefault();
    };
    this.setState({ menuPopupAnchorEl: null })
  }

  render() {
    const { menuPopupAnchorEl } = this.state;
    const {
      appName, logoImgUrl,
      toggleSidebar, openNewPollPopup, openAuthPopup, logoutUser,
      authedUser
    } = this.props;
    return (
      <header id='header'>
        {/* Left Side */}
        <Link className='header-logo' to='/'>
          <img className='header-logo-img'
            src={logoImgUrl} alt={appName}
          />
          <h1 className='header-logo-title'>{appName}</h1>
        </Link>
        {/* Right Side Large Screen */}
        <nav className='header-nav'>
          <Btn id='header-nav-about' className='header-nav-btn'
            variant='flat'
            size='medium'
            text='About'
            to='/about'
          />
          <Btn id='header-nav-polls' className='header-nav-btn'
            variant='flat'
            size='medium'
            text='List'
            to='/polls'
          />
          {!!authedUser ? (
            <Button id='header-nav-user' className='header-nav-user'
              aria-owns={!!menuPopupAnchorEl ? 'account-menu' : null}
              aria-haspopup={true}
              onClick={this.handleMenuPopoverOpen}
              style={{ color:'white' }}
            >{authedUser.name}<ExpandMoreIcon />
            </Button>
          ) : (
            <Btn id='header-nav-signin' className='header-nav-signin'
              variant='flat'
              size='medium'
              text='Sign in'
              onClick={openAuthPopup}
            />
          )}
          {!!authedUser ? (
            <Popover id='auth-menu'
              open={Boolean(!!menuPopupAnchorEl)}
              anchorEl={menuPopupAnchorEl}
              anchorPosition={{ top:200, left:400 }}
              anchorOrigin={{ horizontal:'left', vertical:'bottom' }}
              transformOrigin={{ horizontal:'left', vertical:'top' }}
              onClose={this.handleMenuPopoverClose}
              style={{ padding:5 }}
            >
              <MenuItem id='create-poll-popup'
                onClick={openNewPollPopup}
              >Create Poll</MenuItem>
              <MenuItem id='account' className='link-hover'
                component={Link} to='/account'
              >Profile</MenuItem>
              <Divider />
              <MenuItem id='logout'
                onClick={logoutUser}
              >Logout</MenuItem>
            </Popover>
          ) : (
            <Popover id='public-menu'
              open={Boolean(!!menuPopupAnchorEl)}
              anchorEl={menuPopupAnchorEl}
              anchorPosition={{ top:200, left:400 }}
              anchorOrigin={{ horizontal:'left', vertical:'bottom' }}
              transformOrigin={{ horizontal:'left', vertical:'top' }}
              onClose={this.handleMenuPopoverClose}
              style={{ padding:5 }}
            >
              <MenuItem id='sign-in-popup'
                component={Link} to='#'
                onClick={openAuthPopup}
              >Sign in</MenuItem>
            </Popover>
          )}
        </nav>
        {/* Right Side Small Screen */}
        <div className='header-nav-sm'>
          <IconButton className='header-nav-signin'>
            <MenuIcon id='toggle-sidebar'
              onClick={toggleSidebar}
              style={{ color:'white', width:'100%', height:'100%' }}
            />
          </IconButton>
        </div>
      </header>
    )
  };
}

Header.contextTypes = {
  router: PropTypes.object,
};

Header.propTypes = {
  logoImgUrl: PropTypes.string.isRequired,
  appName: PropTypes.string.isRequired,
  toggleSidebar: PropTypes.func.isRequired,
  openAuthPopup: PropTypes.func.isRequired,
  openNewPollPopup: PropTypes.func.isRequired,
  logoutUser: PropTypes.func.isRequired,
  authedUser: PropTypes.shape({
    name: PropTypes.string
  })
};

export default connect(null, null)(Header);
