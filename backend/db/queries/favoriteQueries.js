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
    `SELECT favorites.song_id AS song_id, title, img_url, users.id, username, genre_id, genre_name, COUNT(favorites.song_id) AS favorite_count, ARRAY_AGG(DISTINCT comments.comment_body) AS comment_body FROM favorites LEFT JOIN songs ON favorites.song_id=songs.id LEFT JOIN users ON favorites.user_id=users.id LEFT JOIN genres ON genres.id=songs.genre_id LEFT JOIN comments ON comments.song_id = songs.id WHERE songs.id = $1 GROUP BY favorites.song_id, songs.title,users.id, songs.genre_id, genres.genre_name, songs.img_url`, [songId]
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
  // let songId = req.body.song_id;
  db.any ( `SELECT favorites.song_id AS song_id, title, img_url, users.id, username, genre_id, genre_name, COUNT(favorites.user_id) AS favorite_count, ARRAY_AGG(DISTINCT comments.comment_body) AS comment_body FROM favorites LEFT JOIN songs ON favorites.song_id=songs.id LEFT JOIN users ON favorites.user_id=users.id LEFT JOIN genres ON genres.id=songs.genre_id LEFT JOIN comments ON comments.song_id = songs.id WHERE users.id = $1 GROUP BY favorites.song_id, songs.title,users.id, songs.genre_id, genres.genre_name, songs.img_url`, [userId] )
  .then(songs => {
    res.status(200).json({
      status: 'success',
      songs: songs,
      message: 'Songs by Genre Received!'
    })
  })


  // let favoriteDetails = {}

  // db.any(`SELECT song_id FROM favorites WHERE user_id = $1`, [userId])
  // .then (favorites => {
  //   favoriteDetails = {...favorites}

  // db.any (`SELECT favorites.song_id AS song_id, favorites.user_id AS user_id FROM favorites`)
  // .then (favorites => {
  //   favoriteDetails = {...favorites}

all songs user favorited one db statement
map over all songs and for each song, retrieve the favorites cout for one.

db.any ( `SELECT favorites.id, favorites.song_id, title, img_url, genres.id AS genre_id, genre_name, users.id, username, ARRAY_AGG(DISTINCT comments.comment_body) AS comment_body FROM favorites JOIN songs ON songs.id=favorites.song_id JOIN genres ON genres.id=songs.genre_id JOIN users ON users.id=favorites.user_id JOIN comments ON comments.song_id = songs.id GROUP BY favorites.id, favorites.user_id, favorites.song_id, songs.title, songs.img_url, genres.id, users.id ORDER BY favorites.id` )
.then (favorites => {
  favoriteDetails = {...favorites}
  db.any (`SELECT song_id FROM favorites WHERE user_id = $1`, [userId])
  .then (songs => {
    favoriteDetails = { ...favoriteDetails, songs: songs}
    db.one (`SELECT COUNT(favorites.song_id) AS favorites_count FROM favorites`)
  })
})

  //   db.any (`SELECT songs.id, songs.title, img_url FROM songs`)
  //   .then (songs => {
  //     favoriteDetails = {...songs}
  //     db.any (`SELECT users.id, username FROM users WHERE users.id = $1`, [userId])
  //     .then (users => {
  //       favoriteDetails = {...favoriteDetails, users: users}
  //       db.any (`SELECT genres.id, genre_name FROM genres`)
  //       .then(genres => {
  //         favoriteDetails = {...favoriteDetails, genres: genres}
  //         db.any (`SELECT favorites.id, favorites.song_id AS song_id, favorites.user_id AS user_id, COUNT(favorites.song_id) FROM favorites WHERE song_id= $1`, [songId])
  //         .then (favorites => {
  //           favoriteDetails= {...favoriteDetails, favorites: favorites}
  //           res.status(200).json({
  //             status: 'success',
  //             body: favoriteDetails,
  //             message: 'Songs by Genre Received!'
  //           })
  //         })
  //       })
  //     })
  //   })
  // })
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
      message: 'You DELETED this FAVORITE SONG.'
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
