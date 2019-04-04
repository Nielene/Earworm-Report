import { FETCH_ALL_FAVORITES_BY_USER, POST_NEW_FAVORITE, DELETE_FAVORITE} from '../actions/types';

const initialState = {
  all_favorites_by_user: [],
  post_new_favorite: {},
  delete_favorite: {},
  is_favorited: false,
}

export default function (state = initialState, action ) {
  switch(action.type) {
    case FETCH_ALL_FAVORITES_BY_USER:
      return {
        ...state,
        all_favorites_by_user: action.payload
      }
    case POST_NEW_FAVORITE:
      return {
        ...state,
        post_new_favorite: action.payload
      }
    case DELETE_FAVORITE:
      return {
        ...state,
        delete_favorite: action.payload
      }
    default:
      return state;
  }
}
