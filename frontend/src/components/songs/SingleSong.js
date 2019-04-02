import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
// import '../../css/home/Home.css';

import { fetchAllSongs } from '../../actions/songActions';
import { fetchAllComments } from '../../actions/commentActions';
import { postSingleSongComment } from '../../actions/songActions';
import { fetchAllCommentsForSingleSong } from '../../actions/commentActions';



class SingleSong extends Component {
  constructor(props) {
    super(props)
    this.state = {
      searchedSong: '',
      formSubmitted: false,

      body: '',
      // userId: '',
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

    // if (this.state.body && this.state.commentSubmitted) {
      // const addComment = {comment_body: this.state.body}
      // const songId = {song_id: this.state.song.song_id}
      // const userId = '1'
      // this.props.postSingleSongComment(songId, addComment)

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
    this.props.fetchAllComments();
    // this.props.fetchAllCommentsForSingleSong(this.state.song_id)
  }


  render () {
    console.log(this.props);
    console.log(this.state);
    console.log(this.props.all_songs);
    console.log(this.props.all_comments);


    const { searchedSong, formSubmitted } = this.state;
    const { all_songs } = this.props;
    const filteredSongs = all_songs.filter( song => {
      return song.title.toLowerCase().includes(searchedSong.toLowerCase())
    })

    let songArray = all_songs;
    if (!formSubmitted) {
      songArray = all_songs
    } else if (formSubmitted) {
      songArray = filteredSongs
    }


    // const commentItems = this.props.all_comments.map (comment => {
    //   return (
    //     <div key={comment.song_id}>
    //       <li>{comment.song_id}</li>
    //       <li>{comment.comment_body}</li>
    //     </div>
    //   )
    // })




    const songItems = songArray.map(song => {

      if (song.user_id === 1) {
        song.user_id = '';
      }

      return(
        <div key={song.song_id} className= 'eachSongListDiv'>
          <div className='imageAndRestRow'>

            <div className='imageColumn'>
              <Link to='' style={{textDecoration: 'none'}} >
                <img src={song.img_url} alt='' width='50' />
              </Link>
            </div>

            <div className='titleEtcColumn'>
              <div className='titleRow'>
                <div className='songTitle'>
                  <Link to='' style={{textDecoration: 'none'}} >
                    <h2>{song.title} </h2>
                  </Link>
                </div>

                <div className='allButSongTitleRow'>
                  <div className='userName'>
                    <Link to={'/profile/' + song.user_id} style={{textDecoration: 'none'}} >
                      <p>{song.username} </p>
                    </Link>
                  </div>

                  <div className='favoriteCount'>
                    <p>{song.favorite_count} Favorites</p>
                  </div>

                  <div className='favoriteButton'>
                    <button> Favorite </button>
                  </div>
                </div>
              </div>

            <div className='commentBody'>
              {song.comment_body}
            </div>

            <div className='addNewComment'>
              <div className='addNewCommentTextInput'>
                <input type='text' name='body' id={song.song_id} onChange={this.handleComment} ></input>
              </div>
              <div className='commentButton'>
                <button type='button' onClick={this.handleCommentSubmit} songid={song.song_id}>Add Comment </button>
              </div>

            </div>


          </div>

        </div>

      </div>
    )
  })

    return (
      <div className='mainBodyDiv'>
        <div className='mainBody userProfile mainBodyByAllSongs'>

          <div className='pageTitle allSongsTitle'>
            <h1> All Songs </h1>
          </div>

          <form className='form' onSubmit={this.handleSubmit} >
            <div className='searchByTitleDiv'>
              <div className='searchSongTextInput'>
              <input type='text' name='searchedSong' onChange={this.handleChange} ></input>
            </div>
            <div className='searchByTitleButton'>
              <button type='submit'>Search By Title </button>
            </div>
            </div>
          </form>

          <div className = 'songListDiv'>
            {songItems}
          </div>

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
