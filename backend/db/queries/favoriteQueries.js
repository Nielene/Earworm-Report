const { db } = require('../index.js');


// Postman: http://localhost:3000/favorites
const getAllFavorites = (req, res, next) => {
  db.any('SELECT users.id AS user_id, username, songs.id AS song_id, title, img_url, genre_id, genre_name FROM favorites LEFT JOIN users ON favorites.user_id = users.id LEFT JOIN songs ON favorites.song_id = songs.id LEFT JOIN genres ON genres.id = songs.genre_id')
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

// favorites/song/:song_id
const getAllFavoritesForSpecificSong = (req, res, next) => {
  let songId = parseInt(req.params.song_id);
  db.any(
    `SELECT COUNT(favorites.song_id) FROM favorites WHERE song_id = $1`, [songId]
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

// http://localhost:3100/favorites/user/1
const getAllFavoritesForSpecificUser = (req, res, next) => {
  let userId = parseInt(req.params.user_id);
db.any ( `SELECT favorites.id AS favorite_id, favorites.user_id, favorites.song_id, songs.*, users.username FROM favorites LEFT JOIN songs ON favorites.song_id=songs.id LEFT JOIN users ON users.id=songs.user_id WHERE favorites.user_id = $1`, [userId] )
.then (favoriteSongs => {
    res.status(200).json({
      status: 'success',
      songs: favoriteSongs,
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

// POST http://localhost:3100/favorites/
const postNewFavorite = (req, res, next) => {
  db.none(
    'INSERT INTO favorites(song_id, user_id) VALUES(${song_id}, ${user_id})', {
      // ...req.body,  // just added
      song_id: req.body.song_id,
      user_id: req.body.user_id
    }
  ).then (() => {
    res.status(200)
    .json({
      status: 'success',
      message: 'New FAVORITE ADDED.',
      body: req.body
    })
  }).catch(err => {
    res.status(400)
    .json({
      status: 'error',
      message: "🤣 Na nana na nah. You didn't ADD a FAVORITE!😝"
    })
    console.log(err);
    next();
  })
}

// http://localhost:3100/favorites/45     router.delete  '/:favorite_id'
const deleteSingleFavorite = (req, res, next) => {
  let favoriteId = parseInt(req.params.favorite_id);
  db.result('DELETE FROM favorites WHERE favorites.id =$1', [favoriteId])
  .then(result => {
    res.status(200)
    .json({
      status: 'success',
      message: 'You DELETED this FAVORITE SONG.',
    })
  }).catch(err => {
    res.status(400)
    .json({
      status: 'error',
      message: "🤣 Na nana na nah. You didn't DELETED a FAVORITE SONG!😝"
    })
    console.log(err);
    next();
  })
}


module.exports = {
  getAllFavorites,
  getAllFavoritesForSpecificSong,
  getAllFavoritesForSpecificUser,
  postNewFavorite,
  deleteSingleFavorite
  }
