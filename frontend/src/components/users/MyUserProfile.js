// Not fully functional yet. No toggle between favorites 
// and posted.
// I think you can reuse and share more of the code between this and
// UserProfile. No need for copy paste. Form not working.
// I need to be able to add a pic and title for song.


import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';

import { fetchAllSongsPostedBySpecificUser } from '../../actions/songActions';
import { fetchAllFavoritesBySpecificUser } from '../../actions/favoriteActions';
import { fetchSingleUser } from '../../actions/userActions';
import SingleSong from '../songs/SingleSong'

import { postNewSong } from '../../actions/songActions'//our action;
import { fetchAllGenres } from '../../actions/genreActions';
import { withRouter } from "react-router";


class MyUserProfile extends Component {
  state = {
    backgroundColorPosted: 'blue',
    postedSelected: true,
    backgroundColorFavorited: 'white',
    favoritedSelected: false,

    title: '',
    img_url: '',
    user_id: 1,
    genre_id: '',

    // selectedGenre: '',

  }


  // POSTED AND FAVORITED BUTTONS:
  handlePosted = e => {
    const user_id = 1;
    this.props.fetchAllSongsPostedBySpecificUser(user_id);

    this.setState({
      backgroundColorPosted: 'blue',
      backgroundColorFavorited: 'white',
      postedSelected: true,
      favoritedSelected: false,
    })
  }

  handleFavorited = e => {
    const user_id = 1;
    this.props.fetchAllFavoritesBySpecificUser(user_id)
    this.setState({
      backgroundColorFavorited: 'blue',
      backgroundColorPosted: 'white',
      postedSelected: false,
      favoritedSelected: true,
    })
  }


  //POST NEW SONG:
  onChange = (e) => {
  this.setState({ [e.target.name]: e.target.value });
  }


  submitNewSong = (e) => {
    e.preventDefault();

    const songData = {
      title: this.state.title,
      img_url: this.state.img_url,
      user_id: this.state.user_id,
      genre_id: this.state.genre_id,
    }

    this.props.postNewSong(songData)

    this.props.fetchAllSongsPostedBySpecificUser(this.state.user_id);

    // REFERENCE:
      // (function() {
      //   alert( `Your song has beed added. ` )
      // })()
  }


  componentDidMount() {
    const user_id = 1;
    this.props.fetchAllSongsPostedBySpecificUser(user_id);
    this.props.fetchSingleUser(user_id);
    this.props.fetchAllGenres();

    // console.log(this.props, 'hello');
    // debugger
  }

  render () {
    // console.log('MyUserProfile props', this.props);
    // console.log('MyUserProfile', this.props.single_user.username);

    let songArray = this.props.all_songs_by_user;
    if (this.state.postedSelected) {
      songArray = this.props.all_songs_by_user
    } else if (this.state.favoritedSelected) {
      songArray = this.props.all_favorites_by_user
    }

    const username = this.props.single_user.username;

    const songItems = songArray.map(song => (
      <div key={song.song_id}>
        < SingleSong song = {song} />
      </div>
    ))

    const genreItems = this.props.all_genres.map(genre => {
      return <option key={genre.genre_id} value={genre.genre_id} >{genre.genre_name} </option>
    })

    return (

      <div className='mainBodyDiv'>
        <div className='mainBody userProfile mainBodyByProfile'>

          <div className='pageTitle profileTitle usernameTitle'>
            <h1> {username}</h1>
          </div>

          <form className='form' onSubmit={this.submitNewSong}>

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

                <div className='addNewSongTitleAndImage'>
                  <div className='addNewSongTitleInput'>
                    <input type='text' name='title' onChange={this.onChange} value={this.state.title}  placeholder='New Song Title' />
                  </div>
                  <div className='addNewSongImageInput'>
                    <input type='text' name='img_url' onChange={this.onChange} value={this.state.img_url} placeholder='Image URL' />
                  </div>
                  <div className=''>
                    <select onChange={this.onChange}  name='genre_id' >
                      <option key='0' value='' >All Genres</option>
                      {genreItems}
                    </select>
                  </div>
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
  post_new_song: state.songs.post_new_song,
  all_genres: state.genres.all_genres,

});

const mapDispatchToProps = dispatch => {
  return {
    fetchAllSongsPostedBySpecificUser: (id) => dispatch(fetchAllSongsPostedBySpecificUser(id)),
    fetchAllFavoritesBySpecificUser: id => dispatch(fetchAllFavoritesBySpecificUser(id)),
    fetchSingleUser: (id) => dispatch(fetchSingleUser(id)),
    postNewSong: (songData) => dispatch(postNewSong(songData)),
    fetchAllGenres: () => dispatch(fetchAllGenres()),

  };
};

export default connect(mapStateToProps, mapDispatchToProps )(withRouter(MyUserProfile));
