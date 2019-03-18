const { db } = require('../index.js');


// Postman: http://localhost:3000/users
const getAllFavorites = (req, res, next) => {
  db.any('SELECT users.id AS user_id, username, songs.id AS song_id, title, img_url, genre_id, genre_name FROM favorites JOIN users ON favorites.user_id = users.id JOIN songs ON favorites.song_id = songs.id JOIN genres ON genres.id = songs.genre_id')
  .then(favorites => {
    res.status(200)
    res.json({
      status: 'success',
      message: 'Got all FAVORITES.',
      favorites: favorites
    })
  }).catch(err => {
    res.status(400)
    .json({
      status: 'error',
      message: " 🤣 Na nana na nah. You didn't get your FAVORITES!😝 "
    })
    console.log(err);
    next();
  })
}


const getAllFavoritesForSpecificSong = (req, res, next) => {

}


const getAllFavoritesForSpecificUser = (req, res, next) => {

}

const postNewFavorite = (req, res, next) => {

}

const deleteSingleFavorite = (req, res, next) => {

}


module.exports = {
  getAllFavorites,
  getAllFavoritesForSpecificSong,
  getAllFavoritesForSpecificUser,
  postNewFavorite,
  deleteSingleFavorite
  }
