import { FETCH_ALL_SONGS, FETCH_ALL_SONGS_BY_POPULARITY, FETCH_ALL_SONGS_POSTED_BY_SPECIFIC_USER, FETCH_ALL_SONGS_BY_GENRE, POST_NEW_SONG, ADD_COMMENT_FOR_SINGLE_SONG} from '../actions/types';

const initialState = {
  all_songs: [],
  all_songs_by_user: [],
  all_songs_by_genre: [],
  all_songs_by_popularity: [],
  post_new_song: {},
}

export default function (state = initialState, action ) {
  switch(action.type) {
    case FETCH_ALL_SONGS:
      return {
        ...state,
        all_songs: action.payload
      }
    case FETCH_ALL_SONGS_BY_POPULARITY:
      return {
        ...state,
        all_songs_by_popularity: action.payload
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
    case POST_NEW_SONG:
      return {
        ...state,
        post_new_song: action.payload
      }

    default:
      return state;
  }
}
