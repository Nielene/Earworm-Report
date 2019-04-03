import { FETCH_ALL_COMMENTS_FOR_SINGLE_SONG, FETCH_ALL_COMMENTS } from './types';
import axios from 'axios';


export const fetchAllCommentsForSingleSong = (song_id) => dispatch => {
  axios.get(`/comments/${song_id}`)
  // axios.get(`/comments/`)
  .then(res => {
    console.log(res.data);
    debugger
    dispatch ({
      type: FETCH_ALL_COMMENTS_FOR_SINGLE_SONG,
      payload: res.data.single_song_comments
    })
  })
}

export const fetchAllComments = () => dispatch => {
  axios.get(`/comments/`)
  // axios.get(`/comments/`)
  .then(res => {
    // console.log(res.data);
    // debugger
    dispatch ({
      type: FETCH_ALL_COMMENTS,
      payload: res.data.all_comments
    })
  })
}
