import { FETCH_ALL_SONGS, FETCH_ALL_SONGS_POSTED_BY_SPECIFIC_USER, FETCH_ALL_SONGS_BY_GENRE} from '../actions/types';

const initialState = {
  all_songs: [],
  all_songs_by_user: [],
  all_songs_by_genre: [],
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
    case FETCH_ALL_SONGS_BY_GENRE:
      return {
        ...state,
        all_songs_by_genre: action.payload
      }
    default:
      return state;
  }
}
