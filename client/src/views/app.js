import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
// Import components
import Header from './components/header';
import Sidebar from './components/sidebar';
import AuthUserPopup from './components/popup-auth-user';
import NewPollPopup from './components/popup-new-poll';
import VotePollPopup from './components/popup-vote-poll';
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
// Import actions
import { userActions } from '../core/users';
import { pollActions } from '../core/polls';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sidebarOpen: false,
      authUserPopupOpen: false,
      newPollPopupOpen: false,
      votePollPopupOpen: false
    }
  };
  componentDidMount = () => this.props.getPolls();

  handleOpenSidebar = () => this.setState({ sidebarOpen: true });
  handleToggleSidebar = () => this.setState({ sidebarOpen: !this.state.sidebarOpen });
  handleCloseSidebar = () => this.setState({ sidebarOpen: false });

  handleOpenAuthUserPopup = () => this.setState({ authUserPopupOpen: true });
  handleCloseAuthUserPopup = () => this.setState({ authUserPopupOpen: false });

  handleOpenNewPollPopup = () => this.setState({ newPollPopupOpen: true });
  handleCloseNewPollPopup = () => {
    // console.log('resetActivePoll here')
    this.setState({ newPollPopupOpen: false });
  };

  handleOpenVotePollPopup = (e, id) => {
    if (!!e && !!e.preventDefault) e.preventDefault();
    if (!!id) {
      // console.log('upload poll with id here', id);
      this.setState({ votePollPopupOpen: true })
    }
  };
  handleCloseVotePollPopup = () => {
    // console.log('resetActivePoll here')
    this.setState({ votePollPopupOpen: false });
  };

  handleGoToUserPolls = () => {
    console.log('loadFilteredPolls with default user filter here');
  }

  render() {
    const appName = 'Voting Redux';
    const activePollState = {
      poll: {
        title: 'Someones Poll',
        user_name: 'Somebody else',
        choices: [
          { id: 1, label: 'choice 1' },
          { id: 2, label: 'choice 2' }
        ]
      }
    };
    const authProvidedUser = () => console.log('auth provided user');
    const loadViewedPoll = () => console.log('load viewed poll');
    const loadActivePoll = () => console.log('load active poll');
    const updatePollStatus = () => console.log('update poll status');
    const deletePoll = () => console.log('delete poll');
    const resetViewedPoll = () => console.log('reset viewed poll');
    const loadFilteredPolls = () => console.log('load filtered polls');

    const {
      authed,
      logoutUser
    } = this.props;
    return (
      <div id='app'>

        <Header
          appName={appName}
          logoImgUrl={logoImgUrl}
          toggleSidebar={this.handleToggleSidebar}
          openAuthPopup={this.handleOpenAuthUserPopup}
          openNewPollPopup={this.handleOpenNewPollPopup}
          logoutUser={logoutUser}
        />

        <Sidebar
          sidebarOpen={this.state.sidebarOpen}
          closeSidebar={this.handleCloseSidebar}
          openAuthPopup={this.handleOpenAuthUserPopup}
          openNewPollPopup={this.handleOpenNewPollPopup}
          logoutUser={logoutUser}
        />

        <AuthUserPopup
          authUserPopupOpen={this.state.authUserPopupOpen}
          closeAuthUserPopup={this.handleCloseAuthUserPopup}
          logoutUser={logoutUser}
          authProvidedUser={authProvidedUser}
        />
        <NewPollPopup
          newPollPopupOpen={this.state.newPollPopupOpen}
          closeNewPollPopup={this.handleCloseNewPollPopup}
        />
        <VotePollPopup
          votePollPopupOpen={this.state.votePollPopupOpen}
          closeVotePollPopup={this.handleCloseVotePollPopup}
          activePollState={activePollState}
          authed={authed}
        />

        <div id='pages'>
          <Switch>
            <Route exact path='/' render={() => <HomePage
              appName={appName}
              homePageImgUrl={homePageImgUrl}
              openAuthPopup={this.handleOpenAuthUserPopup}
              openNewPollPopup={this.handleOpenNewPollPopup} />}
            />
            <Route exact path='/about' render={() => <AboutPage
              appName={appName}
              logoImgUrl={logoImgUrl}
              creatorName='Alexandra Swart'
              creatorImgUrl={creatorImgUrl} />}
            />
            <Route path='/account' render={() => <AccountPage
              goToUserPolls={this.handleGoToUserPolls}
              openNewPollPopup={this.handleOpenNewPollPopup}
              deleteUser={this.props.deleteUser} />}
            />
            <Route path='/poll/:pollId' render={() => <PollPage
              locationPath={this.props.location.pathname}
              updatePollStatus={updatePollStatus}
              deletePoll={deletePoll}
              loadViewedPoll={loadViewedPoll}
              resetViewedPoll={resetViewedPoll}
              goToUserPolls={this.handleGoToUserPolls}
              openVotePollPopup={this.handleOpenVotePollPopup} />}
            />
            <Route exact path='/polls' render={() => <PollsListPage
              openVotePollPopup={this.handleOpenVotePollPopup}
              getPolls={this.props.getPolls}
              loadActivePoll={loadActivePoll}
              authed={authed}
              loadFilteredPolls={loadFilteredPolls} />}
            />
          </Switch>
        </div>

        <Footer />
      </div>
    )
  };
}


App.propTypes = {
  children: PropTypes.element,
  authed: PropTypes.bool.isRequired,
  logoutUser: PropTypes.func.isRequired,
  deleteUser: PropTypes.func.isRequired,
  getPolls: PropTypes.func.isRequired
};

//=====================================
//  CONNECT
//-------------------------------------

export default connect(
  state => ({
    authed: Boolean(!!state.users.authedUser.user ? !!state.users.authedUser.user.token : false)
  }), {
    ...userActions,
    ...pollActions
  })(App);
