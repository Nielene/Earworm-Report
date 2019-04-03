import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchAllSongsByPopularity } from '../../actions/songActions';
import SingleSong from './SingleSong'



class SongsByPopularity extends Component {
  state = {
    searchedSong: '',
    formSubmitted: false,
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
    this.props.fetchAllSongsByPopularity();
  }


  render () {
    // console.log(this.props); console.log(this.state);

    const { searchedSong, formSubmitted } = this.state;
    const { all_songs_by_popularity } = this.props;

    const filteredSongs = all_songs_by_popularity.filter( song => {
      return song.title.toLowerCase().includes(searchedSong.toLowerCase())
    })

    let songArray = all_songs_by_popularity;
    if (!formSubmitted) {
      songArray = all_songs_by_popularity
    } else if (formSubmitted) {
      songArray = filteredSongs
    }

    const songItems = songArray.map(song => {
      if (song.user_id === 1) {
        song.user_id = '';
      }
      return (
        <div key={song.song_id}>
          <SingleSong song={song} />
        </div>
      )
    })

    return (
      <div className='mainBodyDiv'>
        <div className='mainBody userProfile mainBodyByPopularity'>

          <div className='pageTitle popularityTitle '>
            <h1> Songs by Popularity </h1>
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
  all_songs_by_popularity: state.songs.all_songs_by_popularity
})

const mapDispatchToProps = dispatch => {
  return {
    fetchAllSongsByPopularity: () => dispatch(fetchAllSongsByPopularity()),
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(SongsByPopularity);
