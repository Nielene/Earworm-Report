import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';

import { fetchAllSongsPostedBySpecificUser } from '../../actions/songActions';
import { fetchAllFavoritesBySpecificUser } from '../../actions/favoriteActions';
import { fetchSingleUser } from '../../actions/userActions';

import SingleSong from '../songs/SingleSong'

class UserProfile extends Component {
  state = {
    backgroundColorPosted: 'blue',
    postedSelected: true,
    backgroundColorFavorited: 'white',
    favoritedSelected: false,
  }

  handlePosted = e => {
    this.props.fetchAllSongsPostedBySpecificUser(this.props.match.params.user_id);
    this.setState({
      backgroundColorPosted: 'blue',
      backgroundColorFavorited: 'white',
      postedSelected: true,
      favoritedSelected: false,

    })
  }

  handleFavorited = e => {
    console.log(this.props.match.params.user_id);
    this.props.fetchAllFavoritesBySpecificUser(this.props.match.params.user_id)
    this.setState({
      backgroundColorFavorited: 'blue',
      backgroundColorPosted: 'white',
      postedSelected: false,
      favoritedSelected: true,
    })
  }

  componentDidMount() {
    this.props.fetchAllSongsPostedBySpecificUser(this.props.match.params.user_id);
    this.props.fetchSingleUser(this.props.match.params.user_id);

    // console.log(this.props, 'hello');
    // debugger
  }

  render () {
    // console.log(this.props, 'userProfile');


    let songArray = this.props.all_songs_by_user;
    if (this.state.postedSelected) {
      songArray = this.props.all_songs_by_user
    } else if (this.state.favoritedSelected) {
      songArray = this.props.all_favorites_by_user
    }


    const username = this.props.single_user.username;

    const songItems = songArray.map(song => {
      return (

        < SingleSong song={song} />

    )
  })

    return (

        <div className='mainBodyDiv'>
          <div className='mainBody userProfile mainBodyByProfile'>
            <div className='pageTitle profileTitle usernameTitle'>
              <h1> {username} </h1>
            </div>

            <form className='form'>

                <div className='postedAndFavoritedButtonsDiv'>
                  <div className='leftPostedbutton'>
                    <button type='button' style={{backgroundColor: this.state.backgroundColorPosted}} onClick={this.handlePosted} >Posted</button>
                  </div>
                  <div className='rightFavoritedButton'>
                    <button type='button' style={{backgroundColor: this.state.backgroundColorFavorited}} onClick={this.handleFavorited}>Favorited</button>
                  </div>
                </div>

            </form>

            <div className='songListDiv'>
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
    fetchAllSongsPostedBySpecificUser: id => dispatch(fetchAllSongsPostedBySpecificUser(id)),
    fetchAllFavoritesBySpecificUser: id => dispatch(fetchAllFavoritesBySpecificUser(id)),
    fetchSingleUser: (id) => dispatch(fetchSingleUser(id)),

  };
};

export default connect(mapStateToProps, mapDispatchToProps )(UserProfile);
