import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
// import '../../css/home/Home.css';

// import { fetchAllSongs } from '../../actions/songActions';
// import { fetchAllComments } from '../../actions/commentActions';
// import { postSingleSongComment } from '../../actions/songActions';
import { fetchAllCommentsForSingleSong } from '../../actions/commentActions';
import SingleSongComments from './SingleSongComments'


class SingleSong extends Component {
  constructor(props) {
    super(props)
    this.state = {
      // searchedSong: '',
      // formSubmitted: false,
      //
      // body: '',
      // add_single_song_comment: '',
      // songId: '',
      // commentSubmitted: false,
    }

  }

  // handleComment = (e) => {
  //   this.setState({
  //     [e.target.name]: e.target.value,
  //   })
  // }

  // handleCommentSubmit = (e) => {
  //   e.preventDefault();
  //   console.log('USERID, SONGID, COMMENTADDED',this.props.song.user_id, this.props.song.song_id, this.state.add_single_song_comment);
  //
  //   this.props.postSingleSongComment(this.props.song.user_id, this.props.song.song_id, this.state.add_single_song_comment)
  //   this.setState({
  //     body: '',
  //     commentSubmitted: true,
  //   })
  // }


  // handleChange = (e) => {
  //   this.setState({
  //     [e.target.name]: e.target.value,
  //     formSubmitted: false,
  //   })
  // }

  // handleSubmit = (e) => {
  //   e.preventDefault();
  //   this.setState({
  //     formSubmitted: true,
  //   })
  // }

  componentDidMount() {
    // console.log('99999999999', this.props.song.song_id);
    // console.log('THIS.STATE SINGLE SONG',this.state);
    // this.props.fetchAllSongs();
    // this.props.fetchAllComments();
    this.props.fetchAllCommentsForSingleSong(this.props.song.song_id)
  }


  render () {
    // console.log(this.props);
    // console.log(this.state);
    console.log(this.props.single_song_comments);
    // console.log(this.props.all_songs);
    // console.log(this.props.all_comments);


    const songComments = this.props.single_song_comments.map(comment => {
      return (
        <div>
          <p>comments</p>
        < SingleSongComments comment={comment} />
      </div>
      )
    })


      return (
        <div key={this.props.song.song_id} className= 'eachSongListDiv'>
          <div className='imageAndRestRow'>

            <div className='imageColumn'>
              <Link to='' style={{textDecoration: 'none'}} >
                <img src={this.props.song.img_url} alt='' width='50' />
              </Link>
            </div>

            <div className='titleEtcColumn'>
              <div className='titleRow'>
                <div className='songTitle'>
                  <Link to='' style={{textDecoration: 'none'}} >
                    <h2>{this.props.song.title} </h2>
                  </Link>
                </div>

                <div className='allButSongTitleRow allButSongTitleRowForGenre'>
                  <div className='userName'>
                    <Link to={'/profile/' + this.props.song.user_id} style={{textDecoration: 'none'}} >
                      <p>{this.props.song.username} </p>
                    </Link>
                  </div>

                  <div className='genreName'>
                    <p>{this.props.song.genre_name} </p>
                  </div>

                  <div className='favoriteCount'>
                    <p>{this.props.song.favorite_count} Favorites</p>
                  </div>

                  <div className='favoriteButton'>
                    <button> Favorite </button>
                  </div>
                </div>
              </div>

            <div className='commentBody'>
              {/* // {this.props.song.comment_body}  */}
              {songComments}
            </div>

            <div className='addNewComment'>
              <div className='addNewCommentTextInput'>
                <input type='text' name='add_single_song_comment' value= {this.state.add_single_song_comment} onChange={this.handleComment} ></input>
              </div>
              <div className='commentButton'>
                <button type='button' onClick={this.handleCommentSubmit} songid={this.props.song.song_id}>Add Comment </button>
              </div>

            </div>


          </div>

        </div>

      </div>
      )









    }
}


const mapStateToProps = state => {
  console.log('STATETOPROPS. STATE',state);
  return {
   // all_songs: state.songs.all_songs,
   // add_single_song_comment: state.songs.add_single_song_comment,
   // all_comments: state.comments.all_comments,
   single_song_comments: state.comments.single_song_comments,
 }
}

const mapDispatchToProps = dispatch => {
  return {
    // fetchAllSongs: () => dispatch(fetchAllSongs()),
    // postSingleSongComment: (user_id, song_id, addComment) => dispatch(postSingleSongComment(user_id, song_id, addComment)),
    // fetchAllComments: () => dispatch(fetchAllComments()),
    fetchAllCommentsForSingleSong: (song_id) => dispatch(fetchAllCommentsForSingleSong(song_id)),
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(SingleSong);
