import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
// Import material-ui
import Drawer from 'material-ui/Drawer';
import Divider from 'material-ui/Divider';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import FaceIcon from 'material-ui-icons/Face';
import EqualizerIcon from 'material-ui-icons/Equalizer';
import ChevronLeftIcon from 'material-ui-icons/ChevronLeft';
import Collapse from 'material-ui/transitions/Collapse';
import ExpandLess from 'material-ui-icons/ExpandLess';
import ExpandMore from 'material-ui-icons/ExpandMore';


class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = { sidebarProfileOpen: false }

    this.handleNewPollPopup = this.handleNewPollPopup.bind(this);
    this.handleLogoutUser = this.handleLogoutUser.bind(this);
    this.handleAuthPopup = this.handleAuthPopup.bind(this);
  };
  handleToggleSidebarProfile = () => this.setState({ sidebarProfileOpen: !this.state.sidebarProfileOpen })
  handleNewPollPopup = (e) => {
    if (!!e && e.preventDefault) e.preventDefault();
    this.props.closeSidebar();
    this.props.openNewPollPopup();
  };
  handleLogoutUser = (e) => {
    if (!!e && e.preventDefault) e.preventDefault();
    const { closeSidebar, logoutUser } = this.props;
    closeSidebar();
    logoutUser();
  };
  handleAuthPopup = (e) => {
    if (!!e && e.preventDefault) e.preventDefault();
    this.props.closeSidebar();
    this.props.openAuthPopup();
  };

  render() {
    const {
      sidebarOpen, closeSidebar,
      authedUser
    } = this.props;
    return (
      <Drawer
        anchor='right'
        open={Boolean(sidebarOpen)}
        onClose={closeSidebar}
      >
        <List>
          <ListItem id='close' button
            onClick={closeSidebar}
          >
            <ListItemIcon><ChevronLeftIcon /></ListItemIcon>
          </ListItem>
          <Divider />
          <ListItem id='about' button
            component={Link} to='/about' onClick={closeSidebar}
          >
            <ListItemText primary='About' />
          </ListItem>
          <ListItem id='polls' button
            component={Link} to='/polls' onClick={closeSidebar}
          >
            <ListItemText primary='List' />
          </ListItem>
          <Divider />
          {!!authedUser ? (
            <List id='auth-drawer'>
              <ListItem id='toggle-profile' button
                onClick={this.handleToggleSidebarProfile}
              >
                <ListItemText primary={authedUser.name} />
                {this.state.sidebarProfileOpen ? <ExpandLess color='primary' /> : <ExpandMore color='primary' />}
              </ListItem>
              <Collapse in={this.state.sidebarProfileOpen} timeout='auto' unmountOnExit>
                <List>
                  <ListItem id='open-new-poll-popup' button
                    onClick={this.handleNewPollPopup}
                  >
                    <ListItemIcon><EqualizerIcon className='rotate-90' /></ListItemIcon>
                    <ListItemText primary='Create Poll' />
                  </ListItem>
                  <ListItem id='account' button
                    component={Link} to='/account' onClick={closeSidebar}
                  >
                    <ListItemIcon><FaceIcon /></ListItemIcon>
                    <ListItemText primary='Account' />
                  </ListItem>

                </List>
              </Collapse>
              <Divider />
              <ListItem id='logout' button
                onClick={(e) => this.handleLogoutUser(e)}
              >
                <ListItemText primary='Logout' />
              </ListItem>
            </List>
          ) : (
            <ListItem id='open-auth-user-popup' button
              onClick={(e) => this.handleAuthPopup(e)}
            >
              <ListItemText primary='Sign In' />
            </ListItem>
          )}
        </List>
      </Drawer>
    );
  }
};

Sidebar.propTypes = {
  sidebarOpen: PropTypes.bool.isRequired,
  closeSidebar: PropTypes.func.isRequired,
  openAuthPopup: PropTypes.func.isRequired,
  openNewPollPopup: PropTypes.func.isRequired,
  logoutUser: PropTypes.func.isRequired,
  authedUser: PropTypes.shape({
    name: PropTypes.string
  })
};

export default Sidebar;
