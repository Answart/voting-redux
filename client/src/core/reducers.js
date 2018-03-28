import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import { routerReducer } from 'react-router-redux';


export default combineReducers({
  form,
  router: routerReducer
});
