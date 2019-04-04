import { FETCH_ALL_COMMENTS_FOR_SINGLE_SONG, ADD_COMMENT_FOR_SINGLE_SONG} from '../actions/types';

const initialState = {
  songs_to_comments_map: {
    // song_id: [],  // reference
  },

}

export default function (state = initialState, action ) {
  switch(action.type) {
    case FETCH_ALL_COMMENTS_FOR_SINGLE_SONG:
      return {
        ...state,
        songs_to_comments_map: {
          ...state.songs_to_comments_map, // keep old key:value pairs
          [action.payload.song_id]: action.payload.comments //computed property. [as yet unknown key]
        },
      }
    case ADD_COMMENT_FOR_SINGLE_SONG:
      const comments_for_single_song = [...state.songs_to_comments_map[action.payload.song_id]];
      comments_for_single_song.push(action.payload.comment_obj)

      return {
        ...state,
        songs_to_comments_map: {
          ...state.songs_to_comments_map,
          [action.payload.song_id]: comments_for_single_song
        }
      }

    default:
      return state;
  }
}
