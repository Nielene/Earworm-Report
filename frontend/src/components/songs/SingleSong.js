import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { fetchAllCommentsForSingleSong, postSingleSongComment } from '../../actions/commentActions';
// import SingleSongComments from './SingleSongComments'
import { postNewFavorite } from '../../actions/favoriteActions';


class SingleSong extends Component {
  state = {
    comment: '',
    user_id: 1,
    song_id: this.props.song.song_id,
    username: 'Nielene',

    favoriteSongButtonColor: 'yellow',
    favoriteButtonClicked: false,
  }

  handleClickUsername = (e) => {
    this.props.fetchAllSongsPostedBySpecificUser(this.props.song.user_id)
  }

  onFavoriteThisSong = () => {
    this.setState ({
      favoriteButtonClicked: true,
      favoriteSongButtonColor: 'blue',
    })
    const favoriteData = {
      user_id: this.state.user_id,
      song_id: this.state.song_id,
    }
    this.props.postNewFavorite(favoriteData)
  }


  onUnfavoriteThisSong = () => {
    this.setState ({
      favoriteButtonClicked: false,
      favoriteSongButtonColor: 'yellow',
    })
  }

  handleCommentChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleCommentSubmit = e => {
    e.preventDefault();

    const commentData = {
      // song_id: this.props.song.song_id,
      // song_id: this.state.song_id,
      user_id: this.state.user_id,
      comment_body: this.state.comment,
      username: this.state.username,
    }

    this.props.postSingleSongComment(this.state.song_id, commentData)
    // this.props.fetchAllCommentsForSingleSong(this.props.song.song_id)
  }


  componentDidMount() {
    this.props.fetchAllCommentsForSingleSong(this.props.song.song_id)
  }


  indicateFavorites = () => {
    const { all_favorites_by_user} = this.props

    if (all_favorites_by_user) {
      const favorites = all_favorites_by_user.map(favorite => {
        return (
          <div>
          </div>
        )
      })
    }
  }


  displayComments = () => {
    const { song_comments } = this.props

    if (song_comments) {
      const comments =  song_comments.map( comment => {
        if (comment.user_id === 1) {
          comment.user_id = '';
        }

        return (
          <div key={comment.comment_id}>
            <div className='userName'>
              <Link to={'/profile/' + comment.user_id} style={{textDecoration: 'none'}} onClick={this.handleClickUsername} >
                <p>{comment.username} </p>
              </Link>
            </div>

            <div className='commentBody'>
              {comment.comment_body}
            </div>
          </div>
        )

      })
      return comments
    } else {
      return <h3> Loading...</h3>
    }
  }


render () {
  // console.log('SINGLE SONG COMMENTS', this.props.single_song_comments);  console.log('song id', this.props.song.song_id);   console.log(this.state);

  // KEEP FOR RECORDS:
  // const testComments = this.props.single_song_comments.map(comment => {
  //   return (  <div key={comment.comment_id}>  < SingleSongComments comment={comment} />  </div> )
  // })

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
                <button type='button'
                  style={{backgroundColor:this.state.favoriteSongButtonColor}}
                  onClick={ this.state.favoriteButtonClicked ? this.onUnfavoriteThisSong : this.onFavoriteThisSong} >
                    {this.state.favoriteButtonClicked ? 'Unfavorite' : 'Favorite'}
                </button>
              </div>
            </div>
          </div>

          <div className='commentBody'>
            {/*{this.props.song.comment_body} */}
            {/*{songComments}*/}
            {this.displayComments()}
          </div>

          <div className='addNewComment'>
            <div className='addNewCommentTextInput'>
              <input type='text' onChange={this.handleCommentChange} name='comment' value= {this.state.comment} placeholder='your comment...' ></input>
            </div>
            <div className='commentButton'>
              <button type='button' onClick={this.handleCommentSubmit} > Add Comment </button>
            </div>

          </div>

        </div>

      </div>

    </div>
  )

}
}


const mapStateToProps = (state, ownProps) => {
  // console.log('STATETOPROPS. STATE',state);
  return {

    single_song_comments: state.comments.songs_to_comments_map[ownProps.song.song_id],
    song_comments: state.comments.songs_to_comments_map[ownProps.song.song_id],
    post_new_favorite: state.favorites.post_new_favorite,
    all_favorites_by_user: state.favorites.all_favorites_by_user,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchAllCommentsForSingleSong: (song_id) => dispatch(fetchAllCommentsForSingleSong(song_id)),
    postSingleSongComment: (song_id, commentData) => dispatch(postSingleSongComment(song_id, commentData)),
    postNewFavorite: (favoriteData) => dispatch(postNewFavorite(favoriteData)),
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(SingleSong);
