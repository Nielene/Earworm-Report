import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { fetchAllSongs } from '../../actions/songActions';
import { fetchAllSongsPostedForSpecificGenre } from '../../actions/songActions';
import { fetchAllGenres } from '../../actions/genreActions';

// import '../../css/home/Home.css';

class SongsByGenreId extends Component {
  state = {
    selectedGenre: '',
    formSubmitted: false,
  }

  handleSelect = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
      formSubmitted: false,
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();

    // console.log('SELECTED GENRE', this.state.selectedGenre);
    // console.log('FORM SUBMITTED', this.state.formSubmitted);
    this.props.fetchAllSongsPostedForSpecificGenre(this.state.selectedGenre)
    // debugger

    this.setState({
      formSubmitted: true,
    })
  }

  componentDidMount() {
    this.props.fetchAllGenres();
    this.props.fetchAllSongs();
  }


  render () {
    // console.log(this.props);
    // console.log(this.state);

    const { selectedGenre, formSubmitted } = this.state;
    const { all_songs, all_songs_by_genre, all_genres } = this.props;


    let songFilter = all_songs;
    if (selectedGenre && formSubmitted) {
      songFilter = all_songs_by_genre
    } else if (selectedGenre === '' && formSubmitted) {
      songFilter = all_songs
    }


    const songItems = songFilter.map(song => {
      return(
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
    )
  })






  const genreItems = all_genres.map(genre => {
    return <option key={genre.genre_id} value={genre.genre_id}>{genre.genre_name}</option>
  })

    return (
      <div className='mainBodyDiv'>
        <div className='mainBody userProfile mainBodyByGenre'>

          <div className='pageTitle genreTitle'>
            <h1> Songs By Genre </h1>
          </div>

          <form className='form' onSubmit={this.handleSubmit} >
            <div className='searchByTitleDiv'>
              <div className='searchSongTextInput'>


                <select onChange={this.handleSelect}  name='selectedGenre' >
                  <option key='0'value='' >All Genres</option>
                  {genreItems}
                </select>
              </div>

              <div className='searchByTitleButton'>
                <button type='submit'>Search By Genre</button>
              </div>
            </div>

          </form>

          <div className='songListDiv'>
            {songItems}
          </div>
        </div>
      </div>

    )
  }
}


const mapStateToProps = state => ({
  all_songs: state.songs.all_songs,
  all_songs_by_genre: state.songs.all_songs_by_genre,
  all_genres: state.genres.all_genres
})

const mapDispatchToProps = dispatch => {
  return {
    fetchAllSongs: () => dispatch(fetchAllSongs()),
    fetchAllSongsPostedForSpecificGenre: (id) => dispatch(fetchAllSongsPostedForSpecificGenre(id)),
    fetchAllGenres: () => dispatch(fetchAllGenres()),

  }
}


export default connect(mapStateToProps, mapDispatchToProps)(SongsByGenreId);
