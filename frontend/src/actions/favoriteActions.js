import { FETCH_ALL_FAVORITES_BY_USER, POST_NEW_FAVORITE, DELETE_FAVORITE } from './types';
import axios from 'axios';


export const fetchAllFavoritesBySpecificUser = (user_id) => dispatch => {
  axios.get(`/favorites/user/${user_id}`)
  .then(res => {
    console.log(res);
    // debugger
    dispatch({
      type: FETCH_ALL_FAVORITES_BY_USER,
      payload: res.data.songs
    })
  })
}

export const postNewFavorite = (favoriteData) => dispatch => {
  axios.post(`/favorites`, favoriteData)
  .then(res => {
    console.log(res);
    debugger
    dispatch({
      type: POST_NEW_FAVORITE,
      payload:  res.data.body
    })
  })
}
