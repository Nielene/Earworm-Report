import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';

import { fetchAllSongsPostedBySpecificUser } from '../../actions/songActions';
import { fetchAllFavoritesBySpecificUser } from '../../actions/favoriteActions';
import { fetchSingleUser } from '../../actions/userActions';
import SingleSong from '../songs/SingleSong'


class MyUserProfile extends Component {
  state = {
    backgroundColorPosted: 'blue',
    postedSelected: true,
    backgroundColorFavorited: 'white',
    favoritedSelected: false,
  }

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

    let songArray = this.props.all_songs_by_user;
    if (this.state.postedSelected) {
      songArray = this.props.all_songs_by_user
    } else if (this.state.favoritedSelected) {
      songArray = this.props.all_favorites_by_user
    }

    const username = this.props.single_user.username;

    const songItems = songArray.map(song => (

      < SingleSong song = {song} />


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
