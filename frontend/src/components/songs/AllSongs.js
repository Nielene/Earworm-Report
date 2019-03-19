import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchAllSongs } from '../../actions/songActions';
import { Link } from 'react-router-dom';
// import '../../css/home/Home.css';



class AllSongs extends Component {
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
    this.props.fetchAllSongs();
  }


  render () {
    console.log(this.props);
    console.log(this.state);

    const { searchedSong, formSubmitted } = this.state;
    const { all_songs } = this.props;
    const filteredSongs = all_songs.filter( song => {
      return song.title.toLowerCase().includes(searchedSong.toLowerCase())
    })

    let songArray = all_songs;
    if (!formSubmitted) {
      songArray = all_songs
    } else if (formSubmitted) {
      songArray = filteredSongs
    }

    const songItems = songArray.map(song => {
      console.log('userprofile', song.user_id);
      if (song.user_id === 1) {
        song.user_id = '';
      }

      return(
      <div key={song.song_id}>

        <Link to='' style={{textDecoration: 'none'}} >
          <img src={song.img_url} alt='' width='50' />
        </Link>

        <Link to='' style={{textDecoration: 'none'}} >
          <h2>{song.title} </h2>
        </Link>

        <Link to={'/profile/' + song.user_id} style={{textDecoration: 'none'}} >
          <p>{song.username} </p>
        </Link>

        <p>NUMBER OF FAVORITES</p>

        <button> Favorite </button>

      </div>
    )
  })

    return (
        <div className=''>
          <h1> All Songs </h1>

          <form onSubmit={this.handleSubmit} >
            <input type='text' name='searchedSong' onChange={this.handleChange} ></input>
            <button type='submit'>Search By Title </button>
          </form>

          {songItems}
        </div>

    )
  }
}


const mapStateToProps = state => ({
  all_songs: state.songs.all_songs,
})

const mapDispatchToProps = dispatch => {
  return {
    fetchAllSongs: () => dispatch(fetchAllSongs()),
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(AllSongs);
