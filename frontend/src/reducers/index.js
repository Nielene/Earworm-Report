import { combineReducers } from 'redux';
import songReducer from './songReducer';
import userReducer from './userReducer';
import genreReducer from './genreReducer';
import favoriteReducer from './favoriteReducer';
import commentReducer from './commentReducer';

export default combineReducers({
  songs: songReducer,
  users: userReducer,
  genres: genreReducer,
  favorites: favoriteReducer,
  comments: commentReducer,
})
