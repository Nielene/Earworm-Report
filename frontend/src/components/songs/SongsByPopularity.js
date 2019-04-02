import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchAllSongsByPopularity } from '../../actions/songActions';
import { Link } from 'react-router-dom';
// import '../../css/home/Home.css';
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
    console.log(this.props);
    // console.log(this.state);

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
      // console.log('userprofile', song.user_id);
      if (song.user_id === 1) {
        song.user_id = '';
      }

      return(
        <SingleSong song={song} />

        //   <div key={song.song_id} className= 'eachSongListDiv'>
        //     <div className='imageAndRestRow'>
        //
        //       <div className='imageColumn'>
        //         <Link to='' style={{textDecoration: 'none'}} >
        //           <img src={song.img_url} alt='' width='50' />
        //         </Link>
        //       </div>
        //
        //       <div className='titleEtcColumn'>
        //         <div className='titleRow'>
        //           <div className='songTitle'>
        //             <Link to='' style={{textDecoration: 'none'}} >
        //               <h2>{song.title} </h2>
        //             </Link>
        //           </div>
        //
        //           <div className='allButSongTitleRow'>
        //             <div className='userName'>
        //               <Link to={'/profile/' + song.user_id} style={{textDecoration: 'none'}} >
        //                 <p>{song.username} </p>
        //               </Link>
        //             </div>
        //
        //             <div className='favoriteCount'>
        //               <p>{song.favorite_count} Favorites</p>
        //             </div>
        //
        //             <div className='favoriteButton'>
        //               <button> Favorite </button>
        //             </div>
        //           </div>
        //         </div>
        //
        //       <div className='commentBody'>
        //         {song.comment_body}
        //       </div>
        //
        //       <div className='addNewComment'>
        //         <div className='addNewCommentTextInput'>
        //           <input type='text' name='body' id={song.song_id} onChange={this.handleComment} ></input>
        //         </div>
        //         <div className='commentButton'>
        //           <button type='button' onClick={this.handleCommentSubmit} songid={song.song_id}>Add Comment </button>
        //         </div>
        //
        //       </div>
        //
        //
        //     </div>
        //
        //   </div>
        //
        // </div>

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
  // all_songs: state.songs.all_songs,
  all_songs_by_popularity: state.songs.all_songs_by_popularity
})

const mapDispatchToProps = dispatch => {
  return {
    fetchAllSongsByPopularity: () => dispatch(fetchAllSongsByPopularity()),
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(SongsByPopularity);
