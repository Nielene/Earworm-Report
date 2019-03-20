import { FETCH_ALL_SONGS, FETCH_ALL_SONGS_POSTED_BY_SPECIFIC_USER, FETCH_ALL_SONGS_BY_GENRE } from './types';
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

export const fetchAllSongsPostedBySpecificUser = (user_id) => dispatch => {
  axios.get(`/songs/user/${user_id}`)
  .then(res => {
    // console.log(res);
    // debugger
    dispatch({
      type: FETCH_ALL_SONGS_POSTED_BY_SPECIFIC_USER,
      payload: res.data.songs
    })
  })
}

export const fetchAllSongsPostedForSpecificGenre = (genre_id) => dispatch => {
  axios.get(`/songs/genre/${genre_id}`)
  .then(res => {
    // console.log(res);
    // debugger
    dispatch({
      type: FETCH_ALL_SONGS_BY_GENRE,
      payload: res.data.songs
    })
  })
}
