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

  handleSidebar = (val, event) => this.setState({ sidebarOpen: ((val === true || val === false) ? val : !this.state.sidebarOpen) });
  handleOpenPopup = (popup, event) => this.setState({ [popup]: true });
  handleClosePopup = (popup, event) => {
    this.props.resetActivePoll();
    this.setState({ [popup]: false });
  }

  handleOpenVotePollPopup = (id, event) => {
    if (!!event && !!event.preventDefault) event.preventDefault();
    if (!!id) {
      this.props.loadActivePoll(id);
      this.setState({ votePollPopupOpen: true })
    }
  };

  handleGoToUserPolls = (name, event) => {
    const { loadFilteredPolls, authedUser } = this.props;
    const value = !!name ? name : (!!authedUser ? authedUser.name : 'public');
    loadFilteredPolls([{
      label: 'User',
      key: 'user_name',
      value
    }])
  }

  render() {
    const appName = 'Voting Redux';
    const authProvidedUser = () => console.log('auth provided user');
    const {
      authedUser,
      logoutUser
    } = this.props;
    const authed = (!!authedUser ? !!authedUser.token : false);
    return (
      <div id='app'>

        <Header
          appName={appName}
          logoImgUrl={logoImgUrl}
          toggleSidebar={this.handleSidebar.bind()}
          openAuthPopup={this.handleOpenPopup.bind(null, 'authUserPopupOpen')}
          openNewPollPopup={this.handleOpenPopup.bind(null, 'newPollPopupOpen')}
          logoutUser={logoutUser}
        />

        <Sidebar
          sidebarOpen={this.state.sidebarOpen}
          closeSidebar={this.handleSidebar.bind(null, false)}
          openAuthPopup={this.handleOpenPopup.bind(null, 'authUserPopupOpen')}
          openNewPollPopup={this.handleOpenPopup.bind(null, 'newPollPopupOpen')}
          logoutUser={logoutUser}
        />

        <AuthUserPopup
          authUserPopupOpen={this.state.authUserPopupOpen}
          closeAuthUserPopup={this.handleClosePopup.bind(null, 'authUserPopupOpen')}
          authUser={this.props.authUser}
          logoutUser={logoutUser}
          authProvidedUser={authProvidedUser}
        />
        <NewPollPopup
          newPollPopupOpen={this.state.newPollPopupOpen}
          closeNewPollPopup={this.handleClosePopup.bind(null, 'newPollPopupOpen')}
          postPoll={this.props.postPoll}
        />
        <VotePollPopup
          votePollPopupOpen={this.state.votePollPopupOpen}
          closeVotePollPopup={this.handleClosePopup.bind(null, 'votePollPopupOpen')}
          updatePollVote={this.props.updatePollVote}
        />

        <div id='pages'>
          <Switch>
            <Route exact path='/' render={() => <HomePage
              appName={appName}
              homePageImgUrl={homePageImgUrl}
              openAuthPopup={this.handleOpenPopup.bind(null, 'authUserPopupOpen')}
              openNewPollPopup={this.handleOpenPopup.bind(null, 'newPollPopupOpen')} />}
            />
            <Route exact path='/about' render={() => <AboutPage
              appName={appName}
              logoImgUrl={logoImgUrl}
              creatorName='Alexandra Swart'
              creatorImgUrl={creatorImgUrl} />}
            />
            <Route path='/account' render={() => <AccountPage
              goToUserPolls={this.handleGoToUserPolls}
              openNewPollPopup={this.handleOpenPopup.bind(null, 'newPollPopupOpen')}
              deleteUser={this.props.deleteUser} />}
            />
            <Route path='/poll/:pollId' render={() => <PollPage
              locationPath={this.props.location.pathname}
              updatePollStatus={this.props.updatePollStatus}
              deletePoll={this.props.deletePoll}
              loadViewedPoll={this.props.loadViewedPoll}
              resetViewedPoll={this.props.resetViewedPoll}
              goToUserPolls={this.handleGoToUserPolls}
              openVotePollPopup={this.handleOpenVotePollPopup} />}
            />
            <Route exact path='/polls' render={() => <PollsListPage
              openVotePollPopup={this.handleOpenVotePollPopup}
              getPolls={this.props.getPolls}
              authed={authed}
              loadFilteredPolls={this.props.loadFilteredPolls} />}
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
  authedUser: PropTypes.shape({
    cuid: PropTypes.string,
    name: PropTypes.string,
    email: PropTypes.string,
    polls: PropTypes.array,
    activity: PropTypes.array,
    token: PropTypes.string
  }),
  authUser: PropTypes.func.isRequired,
  logoutUser: PropTypes.func.isRequired,
  deleteUser: PropTypes.func.isRequired,
  getPolls: PropTypes.func.isRequired,
  postPoll: PropTypes.func.isRequired,
  updatePollStatus: PropTypes.func.isRequired,
  updatePollVote: PropTypes.func.isRequired,
  deletePoll: PropTypes.func.isRequired,
  loadFilteredPolls: PropTypes.func.isRequired,
  loadActivePoll: PropTypes.func.isRequired,
  loadViewedPoll: PropTypes.func.isRequired,
  resetActivePoll: PropTypes.func.isRequired,
  resetViewedPoll: PropTypes.func.isRequired
};

//=====================================
//  CONNECT
//-------------------------------------

export default connect(
  state => ({
    authedUser: state.users.authedUser.user
  }), {
    ...userActions,
    ...pollActions
  })(App);
