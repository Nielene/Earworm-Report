import { FETCH_ALL_COMMENTS_FOR_SINGLE_SONG, ADD_COMMENT_FOR_SINGLE_SONG } from './types';
import axios from 'axios';


export const fetchAllCommentsForSingleSong = (song_id) => dispatch => {
  axios.get(`/comments/${song_id}`)
  .then(res => {
    // console.log(res.data);
    // debugger
    dispatch ({
      type: FETCH_ALL_COMMENTS_FOR_SINGLE_SONG,
      payload: {
        comments: res.data.single_song_comments,
        song_id: song_id // all comments for a given song_id
      }
    })
  })
}

export const postSingleSongComment = (song_id, commentData) => dispatch => {
  axios.post(`/comments/${song_id}`, commentData)
  .then(res => {
    // console.log('POSTING COMMENT SUCCESS',res);
    // debugger
    dispatch({
      type: ADD_COMMENT_FOR_SINGLE_SONG,
      payload: {
        comment_obj: res.data.body, // key:value pair made
        song_id: song_id
      }

    })
  }).catch(err => {
    console.log('FAILED TO POST COMMENT', err)
  })
}
