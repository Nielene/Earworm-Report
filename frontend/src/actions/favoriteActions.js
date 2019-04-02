import { FETCH_ALL_FAVORITES_BY_USER } from './types';
import axios from 'axios';



export const fetchAllFavoritesBySpecificUser = (user_id) => dispatch => {
  axios.get(`/favorites/user/${user_id}`)
  .then(res => {
    // console.log(res);
    // debugger
    dispatch({
      type: FETCH_ALL_FAVORITES_BY_USER,
      payload: res.data.songs
    })
  })
}
