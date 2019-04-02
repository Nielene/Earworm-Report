import { FETCH_ALL_SONGS, FETCH_ALL_SONGS_BY_POPULARITY, FETCH_ALL_SONGS_POSTED_BY_SPECIFIC_USER, FETCH_ALL_SONGS_BY_GENRE, ADD_COMMENT_FOR_SINGLE_SONG } from './types';
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

export const fetchAllSongsByPopularity = () => dispatch => {
  axios.get('/songs/byPopularity')
  .then(res => {
    // console.log(res.data);
    // debugger
    dispatch ({
      type: FETCH_ALL_SONGS_BY_POPULARITY,
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

export const postSingleSongComment = (user_id, song_id, addComment) => dispatch => {
  axios.post(`/comments/${song_id}`, addComment)
  .then(res => {
    console.log('POSTING COMMENT SUCCESS',res);
    debugger
    dispatch({
      type: ADD_COMMENT_FOR_SINGLE_SONG,
      payload: res.data.add_single_song_comment
    })
  }).catch(err => {
    console.log('FAILED TO POST COMMENT', err)
  })
}
