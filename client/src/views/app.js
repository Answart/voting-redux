import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
// eslint-disable-next-line
import faStyles from 'font-awesome/css/font-awesome.css';
// Import components
import HomePage from './pages/home-page';


class App extends Component {
  render() {
    const appName = 'Voting Redux';
    return (
      <div id='app'>

        <div id='pages'>
          <Switch>
            <Route exact path='/' render={() => <HomePage
              appName={appName} />}
            />
          </Switch>
        </div>

      </div>
    )
  };
}


export default App;
