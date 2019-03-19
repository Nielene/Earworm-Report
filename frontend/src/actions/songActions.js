import { FETCH_ALL_SONGS } from './types';
import axios from 'axios';


export const fetchAllSongs = () => dispatch => {
  axios.get('/songs')
  .then(res => {
    // console.log(res.data);
    // debugger
    dispatch ({
      type: FETCH_ALL_SONGS,
      payload: res.data.songs
    })
  })
}
