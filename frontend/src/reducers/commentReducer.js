import { FETCH_ALL_COMMENTS_FOR_SINGLE_SONG, FETCH_ALL_COMMENTS} from '../actions/types';

const initialState = {
  single_song_comments: [],
  all_comments: [],
}

export default function (state = initialState, action ) {
  switch(action.type) {
    case FETCH_ALL_COMMENTS_FOR_SINGLE_SONG:
      return {
        ...state,
        single_song_comments: action.payload
      }
    case FETCH_ALL_COMMENTS:
      return {
        ...state,
        all_comments: action.payload
      }

    default:
      return state;
  }
}
