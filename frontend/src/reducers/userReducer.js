import { FETCH_ALL_USERS, FETCH_SINGLE_USER } from '../actions/types';

const initialState = {
  all_users: [],
  single_user: '',
}

export default function (state = initialState, action ) {
  switch(action.type) {
    case FETCH_ALL_USERS:
      return {
        ...state,
        all_songs: action.payload
      }
    case FETCH_SINGLE_USER:
      return {
        ...state,
        single_user: action.payload
      }

    default:
      return state;
  }
}
