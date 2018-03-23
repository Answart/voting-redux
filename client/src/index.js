import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Router } from 'react-router-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
// Internal
import history from './core/history';
import App from './views/app';
import registerServiceWorker from './register-service-worker';


const rootElement = document.getElementById('root');


injectTapEventPlugin();
ReactDOM.render(
  <Router history={history}>
    <Route path='/' component={App} />
  </Router>,
  rootElement
);
registerServiceWorker();
