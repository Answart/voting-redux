import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Router } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
// Internal
import theme from './views/styles/theme';
import history from './core/history';
import App from './views/app';
import registerServiceWorker from './register-service-worker';
// eslint-disable-next-line
import faStyles from 'font-awesome/css/font-awesome.css';
import './views/styles/index.css';

const rootElement = document.getElementById('root');


injectTapEventPlugin();
ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <Router history={history}>
      <Route path='/' component={App} />
    </Router>
  </MuiThemeProvider>,
  rootElement
);
registerServiceWorker();
