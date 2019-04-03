import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { fetchAllCommentsForSingleSong } from '../../actions/commentActions';
import SingleSongComments from './SingleSongComments'


class SingleSong extends Component {

  componentDidMount() {
    this.props.fetchAllCommentsForSingleSong(this.props.song.song_id)
  }

  render () {
    console.log('SINGLE SONG COMMENTS', this.props.single_song_comments);
    console.log('song id', this.props.song.song_id);


    const testComments = this.props.single_song_comments.map(comment => {
      return (
        <div key={comment.comment_id}>
          < SingleSongComments comment={comment} />
      </div>
      )
    })

    const songComments = this.props.song.comment_body.map( comment => {
      return (
        <div>
          {comment}
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
            {/*{this.props.song.comment_body} */}
            {songComments}
          </div>

          <div className='addNewComment'>
            <div className='addNewCommentTextInput'>
              <input type='text' name='add_single_song_comment' value= {this.add_single_song_comment} onChange={this.handleComment} ></input>
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
    single_song_comments: state.comments.single_song_comments,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchAllCommentsForSingleSong: (song_id) => dispatch(fetchAllCommentsForSingleSong(song_id)),
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(SingleSong);
