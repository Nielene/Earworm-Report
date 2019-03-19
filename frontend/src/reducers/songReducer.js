import { FETCH_ALL_SONGS, FETCH_ALL_SONGS_POSTED_BY_SPECIFIC_USER, FETCH_ALL_SONGS_POSTED_BY_ME } from '../actions/types';

const initialState = {
  all_songs: [],
  all_songs_by_user: [],
  all_songs_by_me: [],
}

export default function (state = initialState, action ) {
  switch(action.type) {
    case FETCH_ALL_SONGS:
      return {
        ...state,
        all_songs: action.payload
      }
    case FETCH_ALL_SONGS_POSTED_BY_SPECIFIC_USER:
      return {
        ...state,
        all_songs_by_user: action.payload
      }
    case FETCH_ALL_SONGS_POSTED_BY_ME:
      return {
        ...state,
        all_songs_by_me: action.payload
      }
    default:
      return state;
  }
}
