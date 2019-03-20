//Very cool to see you're using redux for this app. 

import { combineReducers } from 'redux';
import songReducer from './songReducer';
import userReducer from './userReducer';
import genreReducer from './genreReducer';

export default combineReducers({
  songs: songReducer,
  users: userReducer,
  genres: genreReducer,
})
