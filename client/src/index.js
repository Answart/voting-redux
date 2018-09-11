import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Route, Router } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// Internal
import configureStore from './core/store';
import theme from './views/styles/theme';
import history from './core/history';
import App from './views/app';
import registerServiceWorker from './register-service-worker';
// eslint-disable-next-line
import faStyles from 'font-awesome/css/font-awesome.css';
import './views/styles/index.css';

const store = configureStore();
const rootElement = document.getElementById('root');


ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider theme={theme}>
      <Router history={history}>
        <Route path='/' component={App} />
      </Router>
    </MuiThemeProvider>
  </Provider>,
  rootElement
);
registerServiceWorker();
