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
  let songId = parseInt(req.params.song_id);
  db.any(
    `SELECT favorites.song_id AS song_id, title, img_url, songs.user_id, username, genre_id FROM favorites JOIN songs ON favorites.song_id = songs.id JOIN genres ON songs.genre_id = genres.id JOIN users ON users.id = songs.user_id WHERE users.id = $1 GROUP BY genres.id, users.id, songs.id, favorites.song_id`, [songId]
  )
  .then(songs => {
    res.status(200).json({
      status: 'success',
      songs: songs,
      message: 'Songs by Genre Received!'
    })
  })
  .catch(err => {
    res.status(400)
    .json({
      status: 'error',
      message: " 🤣 Na nana na nah. You didn't get your Songs!😝 "
    })
    console.log(err);
    next();
  })
}


const getAllFavoritesForSpecificUser = (req, res, next) => {
  let userId = parseInt(req.params.user_id);
  db.any(
    // `SELECT favorites.song_id AS song_id, title, img_url, user_id, username, genre_id FROM songs JOIN genres ON songs.genre_id = genres.id JOIN users ON users.id = songs.user_id JOIN favorites ON favorites.song_id = songs.id WHERE users.id = $1 GROUP BY genres.id, users.id, songs.id`, [userId]
    // `SELECT favorites.song_id AS song_id, title, img_url, songs.user_id, username, genre_id FROM songs JOIN genres ON songs.genre_id = genres.id JOIN users ON users.id = songs.user_id JOIN favorites ON favorites.song_id = songs.id WHERE users.id = $1 GROUP BY genres.id, users.id, songs.id, favorites.song_id`, [userId]
    // `SELECT favorites.song_id AS song_id, title, img_url, songs.user_id, username, genre_id FROM favorites JOIN songs ON favorites.song_id = songs.id JOIN genres ON songs.genre_id = genres.id JOIN users ON users.id = songs.user_id WHERE users.id = $1 GROUP BY genres.id, users.id, songs.id, favorites.song_id`, [userId]
    // `SELECT favorites.song_id as song_id, title, img_url, users.id, username, genre_id, genre_name FROM favorites JOIN songs ON favorites.song_id=songs.id JOIN users ON favorites.user_id=users.id JOIN genres ON genres.id=songs.genre_id WHERE users.id = $1`, [userId]
    // `SELECT favorites.song_id AS song_id, title, img_url, users.id, username, genre_id, genre_name, COUNT(favorites.user_id) AS favorite_count FROM favorites JOIN songs ON favorites.song_id=songs.id JOIN users ON favorites.user_id=users.id JOIN genres ON genres.id=songs.genre_id WHERE users.id = $1 GROUP BY favorites.song_id, songs.title,users.id, songs.genre_id, genres.genre_name, songs.img_url`, [userId]
    `SELECT favorites.song_id AS song_id, title, img_url, users.id, username, genre_id, genre_name, COUNT(favorites.user_id) AS favorite_count, ARRAY_AGG(DISTINCT comments.comment_body) AS comment_body FROM favorites JOIN songs ON favorites.song_id=songs.id JOIN users ON favorites.user_id=users.id JOIN genres ON genres.id=songs.genre_id JOIN comments ON comments.song_id = songs.id WHERE users.id = $1 GROUP BY favorites.song_id, songs.title,users.id, songs.genre_id, genres.genre_name, songs.img_url`, [userId]
    // `SELECT favorites.user_id AS user_id, title, img_url, songs.user_id, username, genre_id, genre_name, COUNT(favorites.user_id) AS favorite_count, ARRAY_AGG(DISTINCT comments.comment_body) AS comment_body FROM favorites JOIN songs ON favorites.song_id = songs.id JOIN genres ON songs.genre_id = genres.id JOIN users ON users.id = songs.user_id JOIN comments ON comments.song_id = songs.id WHERE users.id = $1 GROUP BY genres.id, users.id, songs.id, favorites.song_id`, [userId]

  )
  .then(songs => {
    res.status(200).json({
      status: 'success',
      songs: songs,
      message: 'Songs by Genre Received!'
    })
  })
  .catch(err => {
    res.status(400)
    .json({
      status: 'error',
      message: " 🤣 Na nana na nah. You didn't get your Songs!😝 "
    })
    console.log(err);
    next();
  })
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
