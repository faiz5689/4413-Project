import { compose, applyMiddleware } from 'redux';
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';

import {
  userRegisterReducer,
  userSigninReducer,
} from './reducers/user.reducer.js';

const initialState = {
  userSignin: {
    userInfo: localStorage.getItem('userInfo')
      ? JSON.parse(localStorage.getItem('userInfo'))
      : null,
  },

};

const reducers = combineReducers({
  userSignin: userSigninReducer,
  userRegister: userRegisterReducer,
});
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = configureStore(
  {reducer: reducers},
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);

export default store;