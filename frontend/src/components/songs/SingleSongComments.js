import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
// import '../../css/home/Home.css';

import { fetchAllSongs } from '../../actions/songActions';
import { fetchAllComments } from '../../actions/commentActions';
import { postSingleSongComment } from '../../actions/songActions';
import { fetchAllCommentsForSingleSong } from '../../actions/commentActions';
import SingleSongComments from './SingleSongComments'


class SingleSong extends Component {
  constructor(props) {
    super(props)
    this.state = {
      searchedSong: '',
      formSubmitted: false,

      body: '',
      add_single_song_comment: '',
      songId: '',
      commentSubmitted: false,
    }

  }

  handleComment = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  handleCommentSubmit = (e) => {
    e.preventDefault();
    console.log('USERID, SONGID, COMMENTADDED',this.props.song.user_id, this.props.song.song_id, this.state.add_single_song_comment);

    this.props.postSingleSongComment(this.props.song.user_id, this.props.song.song_id, this.state.add_single_song_comment)

      this.setState({
        body: '',
        commentSubmitted: true,
      })

  }


  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
      formSubmitted: false,
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({
      formSubmitted: true,
    })
  }

  componentDidMount() {
    this.props.fetchAllSongs();
    // this.props.fetchAllComments();
    this.props.fetchAllCommentsForSingleSong(this.state.song_id)
  }


  render () {
    // console.log(this.props);
    console.log(this.state);
    // console.log(this.props.all_songs);
    // console.log(this.props.all_comments);

    //
    // const { searchedSong, formSubmitted } = this.state;
    // const { all_songs } = this.props;
    // const filteredSongs = all_songs.filter( song => {
    //   return song.title.toLowerCase().includes(searchedSong.toLowerCase())
    // })
    //
    // let songArray = all_songs;
    // if (!formSubmitted) {
    //   songArray = all_songs
    // } else if (formSubmitted) {
    //   songArray = filteredSongs
    // }

    // const songComments = this.props.single_song_comments.map(comment => {
    //   return (
    //     < SingleSongComments comment={comment} />
    //   )
    // })
    //

      return (
        <div key={this.props.comment.comment_id} className= 'eachSongListDiv'>
          

                  <div className='comments'>
                      <p>{this.props.comment.comment_body} </p>
                  </div>

      </div>
      )









    }
}


const mapStateToProps = state => ({
  all_songs: state.songs.all_songs,
  all_comments: state.comments.all_comments,
  add_single_song_comment: state.songs.add_single_song_comment,
  single_song_comments: state.comments.single_song_comments,
})

const mapDispatchToProps = dispatch => {
  return {
    fetchAllSongs: () => dispatch(fetchAllSongs()),
    fetchAllComments: () => dispatch(fetchAllComments()),
    postSingleSongComment: (user_id, song_id, addComment) => dispatch(postSingleSongComment(user_id, song_id, addComment)),
    fetchAllCommentsForSingleSong: (song_id) => dispatch(fetchAllCommentsForSingleSong(song_id)),
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(SingleSong);
