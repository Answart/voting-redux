import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
// Import components
import Header from './components/header';
import Sidebar from './components/sidebar';
import NewPollPopup from './components/popup-new-poll';
import Footer from './components/footer';
import HomePage from './pages/home-page';
import AboutPage from './pages/about-page';
import AccountPage from './pages/account-page';
import PollPage from './pages/poll-page';
import PollsListPage from './pages/pollslist-page';
// Import images
import logoImgUrl from './static/images/logo.png';
import homePageImgUrl from './static/images/william-iven-22449.jpg';
import creatorImgUrl from './static/images/creator.jpg';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sidebarOpen: false,
      authPopupOpen: false,
      newPollPopupOpen: false,
      votePollPopupOpen: false
    }
  };
  handleOpenSidebar = () => this.setState({ sidebarOpen: true });
  handleToggleSidebar = () => this.setState({ sidebarOpen: !this.state.sidebarOpen });
  handleCloseSidebar = () => this.setState({ sidebarOpen: false });

  handleOpenAuthPopup = () => this.setState({ authPopupOpen: true });
  handleCloseAuthPopup = () => this.setState({ authPopupOpen: false });

  handleOpenNewPollPopup = () => this.setState({ newPollPopupOpen: true });
  handleCloseNewPollPopup = () => this.setState({ newPollPopupOpen: false });

  handleOpenVotePollPopup = () => this.setState({ votePollPopupOpen: true });
  handleCloseVotePollPopup = () => this.setState({ votePollPopupOpen: false });

  render() {
    const appName = 'Voting Redux';
    const authedUserState = {
      user: {
        name: 'somebody',
        id: '1234',
        token: 'secret'
      }
    };
    const logoutUser = () => console.log('logout user');
    const fetchPolls = () => console.log('fetch da polls');
    const loadViewedPoll = () => console.log('load da poll');
    const authed = Boolean(!!authedUserState.user ? !!authedUserState.user.token : false);
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

        <Sidebar
          sidebarOpen={this.state.sidebarOpen}
          closeSidebar={this.handleCloseSidebar}
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
            <Route exact path='/about' render={() => <AboutPage
              appName={appName}
              logoImgUrl={logoImgUrl}
              creatorName='Alexandra Swart'
              creatorImgUrl={creatorImgUrl} />}
            />
            <Route path='/account' render={() => <AccountPage
              authedUserState={authedUserState}
              openNewPollPopup={this.handleOpenNewPollPopup} />}
            />
            <Route path='/poll/:pollId' render={() => <PollPage
              authedUser={authedUserState.user}
              locationPath={this.props.location.pathname}
              loadViewedPoll={loadViewedPoll}
              openVotePollPopup={this.handleOpenVotePollPopup} />}
            />
            <Route exact path='/polls' render={() => <PollsListPage
              openVotePollPopup={this.handleOpenVotePollPopup}
              fetchPolls={fetchPolls}
              authed={authed} />}
            />
          </Switch>
        </div>

        <Footer />
      </div>
    )
  };
}


App.propTypes = {
  children: PropTypes.element
};

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
