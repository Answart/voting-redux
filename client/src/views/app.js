import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
// Import components
import Header from './components/header';
import HomePage from './pages/home-page';
import NewPollPopup from './components/popup-new-poll';
import Footer from './components/footer';
// Import images
import logoImgUrl from './static/images/logo.png';
import homePageImgUrl from './static/images/william-iven-22449.jpg';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sidebarOpen: false,
      authPopupOpen: false,
      newPollPopupOpen: false
    }
  };
  handleOpenSidebar = () => this.setState({ sidebarOpen: true });
  handleToggleSidebar = () => this.setState({ sidebarOpen: !this.state.sidebarOpen });
  handleCloseSidebar = () => this.setState({ sidebarOpen: false });

  handleOpenAuthPopup = () => this.setState({ authPopupOpen: true });
  handleCloseAuthPopup = () => this.setState({ authPopupOpen: false });

  handleOpenNewPollPopup = () => this.setState({ newPollPopupOpen: true });
  handleCloseNewPollPopup = () => this.setState({ newPollPopupOpen: false });

  render() {
    const appName = 'Voting Redux';
    const authedUserState = {
      user: { name: 'somebody' }
    };
    const logoutUser = () => console.log('logout user');
    return (
      <div id='app'>

        <Header
          appName={appName}
          logoImgUrl={logoImgUrl}
          toggleSidebar={this.handleToggleSidebar}
          openAuthPopup={this.handleOpenAuthPopup}
          openNewPollPopup={this.handleOpenNewPollPopup}
          authedUser={authedUserState.user}
          logoutUser={logoutUser}
        />

        <NewPollPopup
          newPollPopupOpen={this.state.newPollPopupOpen}
          closeNewPollPopup={this.handleCloseNewPollPopup}
        />

        <div id='pages'>
          <Switch>
            <Route exact path='/' render={() => <HomePage
              appName={appName}
              homePageImgUrl={homePageImgUrl}
              openAuthPopup={this.handleOpenAuthPopup}
              openNewPollPopup={this.handleOpenNewPollPopup} />}
            />
          </Switch>
        </div>

        <Footer />
      </div>
    )
  };
}

//=====================================
//  CONNECT
//-------------------------------------

export default connect(
  function(state) {
    return {}
  },
  function(dispatch) {
    return {}
  }
)(App);
