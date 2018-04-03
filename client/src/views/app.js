import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
// Import components
import HomePage from './pages/home-page';
import NewPollPopup from './components/popup-new-poll';
import Footer from './components/footer';
// Import images
import homePageImgUrl from './static/images/william-iven-22449.jpg';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authPopupOpen: false,
      newPollPopupOpen: false
    }
  };
  handleOpenAuthPopup = () => this.setState({ authPopupOpen: true });
  handleOpenNewPollPopup = () => this.setState({ newPollPopupOpen: true });
  handleCloseNewPollPopup = () => this.setState({ newPollPopupOpen: false });
  render() {
    const appName = 'Voting Redux';
    return (
      <div id='app'>

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
