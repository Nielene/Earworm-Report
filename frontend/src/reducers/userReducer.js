import { FETCH_ALL_USERS } from '../actions/types';

const initialState = {
  all_songs: [],

}

export default function (state = initialState, action ) {
  switch(action.type) {
    case FETCH_ALL_USERS:
      return {
        ...state,
        all_songs: action.payload
      }

    default:
      return state;
  }
}
