import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { fetchAllMovies } from '../../actions/movieActions';
import { fetchAllMoviesByGenre } from '../../actions/movieActions';
import { fetchAllGenres } from '../../actions/genreActions';

import '../../css/movies/MoviesByGenre.css';


class MoviesByGenre extends Component {
  state = {
    selectedGenre: '',
    formSubmitted: false,
  }

  handleSelect = (e) => {
    this.setState ({
      [e.target.name]: e.target.value,
      formSubmitted: false,
    })
  }

  handleSubmit = e => {
    e.preventDefault();
    // this.props.fetchAllMoviesByGenre(this.props.match.params.genre_id);
    this.props.fetchAllMoviesByGenre(this.state.selectedGenre);
    console.log('HERE', this.state.selectedGenre);
    // debugger
    this.setState({
      formSubmitted: true,
    })
  }


  componentDidMount() {
    this.props.fetchAllMovies();
    this.props.fetchAllGenres()
  }


  render () {
    console.log(this.props);
    console.log(this.state);

    let movieFilter = this.props.all_movies;

    if (this.state.selectedGenre && this.state.formSubmitted) {
      movieFilter = this.props.all_movies_by_genre
    }
    else if (this.state.selectedGenre === '' && this.state.formSubmitted) {
      movieFilter = this.props.all_movies
    }



    const movieItems = movieFilter.map(movie => (
      <div key={movie.movie_id}>

        <div className='eachMovieDiv'>

          <div className='eachImage'>
            <Link to= {'/movies/' + movie.movie_id} style={{textDecoration: 'none' }} >
              <img src={movie.img_url} alt='' width='50' />
            </Link>
          </div>

          <div className='eachTitle'>
            <Link to={'/movies/'+ movie.movie_id } style={{ textDecoration: 'none' }} >
              <h2>{movie.title}</h2>
            </Link>
          </div>

          <div className='eachGenre'>
          <h4>{movie.genre}</h4>
          </div>

          <div className='eachRating'>
          <h4>{movie.rating}</h4>
          </div>

        </div>

      </div>
    ))

    const genreItems = this.props.all_genres.map(genre => {
      return <option key={genre.id} value={genre.id}>{genre.name}</option>
    })


    return (
      <div className='movieListBackground'>
        <div className='movieListBackgroundInner'>

          <div className='movieListInnerBackgroundDiv'>
            <div className='allMoviesTitle'>
              <h1>ALL MOVIES BY GENRE </h1>

              <form onSubmit={this.handleSubmit}>
                <select onChange={this.handleSelect}  name='selectedGenre'  >
                  <option key='0'value='' >All Genres</option>
                  {genreItems}
                </select>
                <div className='MoviesByGenreButton'>
                  <button type='submit'>Search By Genre</button>
                </div>
              </form>

            </div>
          </div>

          <div className='movieListInnerBackgroundDiv'>
            <div className='movieListInnerBackground'>
              {movieItems}
            </div>
          </div>

        </div>
      </div>
    )
  }
}



const mapStateToProps = state => ({
  all_movies: state.movies.all_movies,
  all_movies_by_genre: state.movies.all_movies_by_genre,

  all_genres: state.genres.all_genres,

});

const mapDispatchToProps = dispatch => {
  return {
    fetchAllMovies: () => dispatch(fetchAllMovies()),
    fetchAllMoviesByGenre: id => dispatch(fetchAllMoviesByGenre(id)),

    fetchAllGenres: () => dispatch(fetchAllGenres()),

  };
};

export default connect(mapStateToProps, mapDispatchToProps )(MoviesByGenre);
