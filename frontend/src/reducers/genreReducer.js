import { FETCH_ALL_GENRES } from '../actions/types';

const initialState = {
  all_genres: [],

}

export default function (state = initialState, action ) {
  switch(action.type) {
    case FETCH_ALL_GENRES:
      return {
        ...state,
        all_genres: action.payload
      }

    default:
      return state;
  }
}
