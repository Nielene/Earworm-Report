import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchAllMovies, fetchAllMoviesByGenre } from '../../actions/movieActions';
import { Link } from 'react-router-dom';
import '../../css/movies/MoviesByGenre.css';


class AllMovies extends Component {
  state = {
    searchedMovie: '',
    formSubmitted: false,
    matchedMovie: [],
  }

  handleChange =  (e) => {
     this.setState ({
      [e.target.name]: e.target.value,
      formSubmitted: false,
    })
  }


  handleSubmit = e => {
    e.preventDefault();
    this.setState({
      formSubmitted: true
    })
  }

  componentDidMount() {
    this.props.fetchAllMovies();
  }


  render () {
    console.log(this.state, this.props);
    const { searchedMovie, formSubmitted } = this.state;
    const { all_movies } = this.props;

    const filteredMovies = all_movies.filter( movie => {
      return movie.title.toLowerCase().includes(searchedMovie.toLowerCase())
    })

    let movieArray = all_movies;

    if (!formSubmitted) {
      movieArray = all_movies
    }
    else if (formSubmitted) {
      movieArray = filteredMovies
    }


    const movieItems = movieArray.map(movie => (
      <div key={movie.movie_id}>

        <div className='eachMovieDiv'>

          <div className='eachImage'>
            <Link to= {'/movies/' + movie.movie_id} style={{textDecoration: 'none' }} >
              <img src={movie.img_url} alt='' width='50' />
            </Link>
          </div>

          <div className='eachTitle'>
            <Link to={'/movies/'+ movie.movie_id } style={{ textDecoration: 'none' }} >
              <h2>{movie.title}</h2></Link>
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


    return (
      <div className='movieListBackground'>
        <div className='movieListBackgroundInner'>

          <div className='movieListInnerBackgroundDiv'>
            <div className='allMoviesTitle'>
              <h1>ALL MOVIES</h1>
              <form onSubmit={this.handleSubmit}>

                <input type='text' name='searchedMovie' onChange={this.handleChange}></input>
                <div className='AllMoviesButton'>
                  <button type='submit'>Search By Title</button>
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
  all_movies_by_genre: state.movies.all_movies_by_genre
})

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllMovies: () => dispatch(fetchAllMovies()),
    fetchAllMoviesByGenre: (id) => dispatch(fetchAllMoviesByGenre(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps )(AllMovies);
