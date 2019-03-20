import { FETCH_SINGLE_USER } from './types';
import axios from 'axios';


export const fetchSingleUser = (user_id) => dispatch => {
  axios.get(`/users/${user_id}`)
  .then(res => {
    // console.log(res.data);
    // debugger
    dispatch ({
      type: FETCH_SINGLE_USER,
      payload: res.data.single_user
    })
  })
}
