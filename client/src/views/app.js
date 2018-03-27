import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
// Import components
import HomePage from './pages/home-page';
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
  render() {
    const appName = 'Voting Redux';
    return (
      <div id='app'>

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

      </div>
    )
  };
}


export default App;
