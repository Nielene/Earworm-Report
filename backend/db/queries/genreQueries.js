const { db } = require('../index.js');


// Postman: http://localhost:3000/users
const getAllGenres = (req, res, next) => {
  db.any(
`SELECT genres.id AS genre_id, genres.genre_name FROM genres`
  )
  .then(genres => {
    res.status(200).json({
      status: 'success',
      genres: genres,
      message: 'All Genres Received!'
    })
  })
  .catch(err => {
    res.status(400)
    .json({
      status: 'error',
      message: " 🤣 Na nana na nah. You didn't get your GENRES!😝 "
    })
    console.log(err);
    next();
  })
}


const postNewGenre = (req, res, next) => {
  db.none(
    'INSERT INTO genres(genre_name) VALUES(${genre_name})', {
      genre_name: req.body.genre_name
    }
  ).then (() => {
    res.status(200)
    .json({
      status: 'success',
      message: 'New GENRE ADDED.'
    })
  }).catch(err => {
    res.status(400)
    .json({
      status: 'error',
      message: "🤣 Na nana na nah. You didn't ADD a GENRE!😝"
    })
    console.log(err);
    next();
  })
}



module.exports = {
  getAllGenres,
  postNewGenre,
  }
