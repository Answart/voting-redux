import { combineReducers } from 'redux';
import { userReducer } from './users';
import { reducer as form } from 'redux-form';
import { routerReducer } from 'react-router-redux';


export default combineReducers({
  users: userReducer,
  form,
  router: routerReducer
});
