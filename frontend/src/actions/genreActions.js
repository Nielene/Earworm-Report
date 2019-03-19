import { FETCH_ALL_GENRES } from './types';
import axios from 'axios';


export const fetchAllGenres = () => dispatch => {
  axios.get('/genres')
  .then(res => {
    // console.log(res.data);
    // debugger
    dispatch ({
      type: FETCH_ALL_GENRES,
      payload: res.data.genres
    })
  })
}
