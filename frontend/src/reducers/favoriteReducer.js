import { FETCH_ALL_FAVORITES_BY_USER} from '../actions/types';

const initialState = {
  all_favorites_by_user: [],
}

export default function (state = initialState, action ) {
  switch(action.type) {
    case FETCH_ALL_FAVORITES_BY_USER:
      return {
        ...state,
        all_favorites_by_user: action.payload
      }

    default:
      return state;
  }
}
