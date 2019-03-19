import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { fetchAllSongsPostedBySpecificUser } from '../../actions/songActions';

// import '../../css/home/UserProfile.css';



class MyUserProfile extends Component {
  componentDidMount() {
    const user_id = 1;
    this.props.fetchAllSongsPostedBySpecificUser(user_id);
    // console.log(this.props, 'hello');
    // debugger
  }

  render () {
    console.log('MyUserProfile props', this.props);
    console.log(this.props.all_songs_by_user[0]);

    const username = '';

    const songItems = this.props.all_songs_by_user.map(song => (
      <div key={song.song_id}>

        <div className=''>

          <div className=''>
            <Link to= '' style={{textDecoration: 'none' }} >
              <img src={song.img_url} alt='' width='50' />
            </Link>
          </div>

          <div className=''>
            <Link to='' style={{ textDecoration: 'none' }} >
              <h2>{song.title}</h2></Link>
          </div>

          <div className=''>
            <h4>{song.username}</h4>
          </div>

          <div className=''>
            <h4>TOTAL NO OF FAVORITES</h4>
          </div>

        </div>

      </div>
    ))

    return (

        <div className='mainBodyDiv'>
          <div className='mainBody userProfile'>

            <div className='usernameTitle'>
              <h1> User Name {username}</h1>
            </div>

            <form className='form'>

                <div className='postedAndFavoritedButtonsDiv'>
                  <div className='leftPostedbutton'>
                    <button type='button' >Posted</button>
                  </div>
                  <div className='rightFavoritedButton'>
                    <button type='button' >Favorited</button>
                  </div>
                </div>

              <div className='addNewSongDiv'>
                <p>Add New Song</p>
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
                {/*
                  */}
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
});

const mapDispatchToProps = dispatch => {
  return {
    fetchAllSongsPostedBySpecificUser: (id) => dispatch(fetchAllSongsPostedBySpecificUser(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps )(MyUserProfile);
