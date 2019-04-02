import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { fetchAllSongsPostedBySpecificUser } from '../../actions/songActions';
import { fetchAllFavoritesBySpecificUser } from '../../actions/favoriteActions';
import { fetchSingleUser } from '../../actions/userActions';



class MyUserProfile extends Component {
  state = {
    backgroundColorPosted: 'blue',
    backgroundColorFavorited: 'white',
  }

  handlePosted = e => {
    const user_id = 1;
    this.props.fetchAllSongsPostedBySpecificUser(user_id);

    this.setState({
      backgroundColorPosted: 'blue',
      backgroundColorFavorited: 'white',

    })
  }

  handleFavorited = e => {
    const user_id = 1;
    this.props.fetchAllFavoritesBySpecificUser(user_id)
    this.setState({
      backgroundColorFavorited: 'blue',
      backgroundColorPosted: 'white',

    })

  }


  componentDidMount() {
    const user_id = 1;
    this.props.fetchAllSongsPostedBySpecificUser(user_id);
    this.props.fetchSingleUser(user_id);

    // console.log(this.props, 'hello');
    // debugger
  }

  render () {
    console.log('MyUserProfile props', this.props);
    // console.log('MyUserProfile', this.props.single_user.username);

    const username = this.props.single_user.username;

    const songItems = this.props.all_songs_by_user.map(song => (
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

              <div className='allButSongTitleRowForGenre'>
                <div className='userName'>
                  <Link to={'/profile/' + song.user_id} style={{textDecoration: 'none'}} >
                    <p>{song.username} </p>
                  </Link>
                </div>
                <div className='genreName'>
                  <p>{song.genre_name} </p>
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
    ))

    return (

      <div className='mainBodyDiv'>
        <div className='mainBody userProfile mainBodyByProfile'>

          <div className='pageTitle profileTitle usernameTitle'>
            <h1> {username}</h1>
          </div>

          <form className='form'>

            <div className='postedAndFavoritedButtonsDiv'>
              <div className='leftPostedbutton'>
                <button type='button' style={{backgroundColor: this.state.backgroundColorPosted}} onClick={this.handlePosted}>Posted</button>
              </div>
              <div className='rightFavoritedButton'>
                <button type='button' style={{backgroundColor: this.state.backgroundColorFavorited}} onClick={this.handleFavorited} >Favorited</button>
              </div>
            </div>

            <div className='addNewSongDiv'>
              <p>Add New Song </p>
              <div className='addNewSong'>
                <div className='addNewSongTextInput'>
                  <input type='text' />
                </div>
                <div className='addNewSongSubmitButton'>
                  <button type='submit' > Submit</button>
                </div>
              </div>
            </div>

          </form>

          <div className = 'songListDiv'>
            <div>
              {songItems}
            </div>
          </div>

        </div>
      </div>

    )
  }
}

const mapStateToProps = state => ({
  all_songs_by_user: state.songs.all_songs_by_user,
  single_user: state.users.single_user,
  all_favorites_by_user: state.favorites.all_favorites_by_user,

});

const mapDispatchToProps = dispatch => {
  return {
    fetchAllSongsPostedBySpecificUser: (id) => dispatch(fetchAllSongsPostedBySpecificUser(id)),
    fetchAllFavoritesBySpecificUser: id => dispatch(fetchAllFavoritesBySpecificUser(id)),
    fetchSingleUser: (id) => dispatch(fetchSingleUser(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps )(MyUserProfile);
