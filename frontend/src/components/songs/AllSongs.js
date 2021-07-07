// Still missing the ability to do favoiriting and to read / write
// comments.
// Remove link on song title. Keeps routing to home page and
// that is a negative user experience.
// Search functionality is working nicely.

//Good start so far. Keep up the good work!
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchAllSongs } from '../../actions/songActions';
// import { postSingleSongComment } from '../../actions/songActions';
import { fetchAllCommentsForSingleSong } from '../../actions/commentActions';
import SingleSong from './SingleSong'

// import '../../css/App.css'

class AllSongs extends Component {
  constructor(props) {
    super(props)
    this.state = {
      searchedSong: '',
      formSubmitted: false,

      body: '',
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
    this.props.fetchAllCommentsForSingleSong(this.state.song_id)
  }


  render () {
    // console.log(this.props); console.log(this.state);
    // console.log(this.props.all_songs); console.log(this.props.all_comments);

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



    const songItems = songArray.map(song => {

      if (song.user_id === 1) {
        song.user_id = '';
      }

      return(
        <div key={song.song_id}>
          < SingleSong song={song}/>
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
  single_song_comments: state.comments.single_song_comments,
  // add_single_song_comment: state.songs.add_single_song_comment,
})

const mapDispatchToProps = dispatch => {
  return {
    fetchAllSongs: () => dispatch(fetchAllSongs()),
    fetchAllCommentsForSingleSong: (song_id) => dispatch(fetchAllCommentsForSingleSong(song_id)),
    // postSingleSongComment: (user_id, song_id, addComment) => dispatch(postSingleSongComment(user_id, song_id, addComment)),
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(AllSongs);
