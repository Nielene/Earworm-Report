const { db } = require('../index.js');


// Postman: http://localhost:3100/songs
const getAllSongs = (req, res, next) => {
  // db.any('SELECT songs.id AS song_id, title, img_url, user_id, genre_id, username, genre_name FROM songs JOIN genres ON genres.id = songs.genre_id JOIN users ON songs.user_id = users.id ORDER BY songs.id DESC')
  db.any('SELECT songs.id AS song_id, title, img_url, songs.user_id, genre_id, username, genre_name, ARRAY_AGG(DISTINCT comments.comment_body) AS comment_body FROM songs JOIN genres ON genres.id = songs.genre_id JOIN users ON songs.user_id = users.id JOIN comments ON comments.user_id = users.id GROUP BY songs.id, users.username, genres.genre_name ORDER BY songs.id DESC')
  // db.any('SELECT songs.id AS song_id, title, img_url, songs.user_id, genre_id, username, genre_name, STRING_AGG(comments.comment_body, CHAR(13)) AS comment_body FROM songs JOIN genres ON genres.id = songs.genre_id JOIN users ON songs.user_id = users.id JOIN comments ON comments.user_id = users.id GROUP BY songs.id, users.username, genres.genre_name ORDER BY songs.id DESC')
  // db.any('SELECT songs.id AS song_id, title, img_url, songs.user_id, genre_id, username, genre_name,     SELECT STRING_AGG (FirstName, CHAR(13)) AS csv         comments.comment_body FROM songs JOIN genres ON genres.id = songs.genre_id JOIN users ON songs.user_id = users.id JOIN comments ON comments.user_id = users.id GROUP BY songs.id, users.username, genres.genre_name, comments.comment_body ORDER BY songs.id DESC')
  .then(songs => {
    res.status(200)
    res.json({
      status: 'success',
      message: 'Got all Songs.',
      songs: songs
    })
  }).catch(err => {
    res.status(400)
    .json({
      status: 'error',
      message: " 🤣 Na nana na nah. You didn't get your Songs!😝 "
    })
    console.log(err);
    next();
  })
}

// router.get('songs/genre/:genre_id', db.getAllSongsForSpecificGenre)
const getAllSongsForSpecificGenre = (req, res, next) => {
  let genreId = parseInt(req.params.genre_id);
  db.any(
    `SELECT songs.id AS song_id, title, img_url, user_id, genre_id, genre_name FROM songs JOIN genres ON songs.genre_id = genres.id JOIN users ON users.id = songs.user_id WHERE genres.id = $1 GROUP BY genres.id, users.id, songs.id`, [genreId]
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

// router.get('/user/:user_id', db.getAllSongsPostedBySpecificUser);
const getAllSongsPostedBySpecificUser = (req, res, next) => {
  let userId = parseInt(req.params.user_id);
  db.any(
    `SELECT songs.id AS song_id, title, img_url, user_id, username, genre_id FROM songs JOIN genres ON songs.genre_id = genres.id JOIN users ON users.id = songs.user_id WHERE users.id = $1 GROUP BY genres.id, users.id, songs.id`, [userId]
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

// router.get('SONGS/user/myProfile/1', db.getAllSongsPostedByMe);
// const getAllSongsPostedByMe = (req, res, next) => {
//   let userId = parseInt(req.params.user_id); //userId=1
//   db.any(
//     `SELECT songs.id AS song_id, title, img_url, user_id, username, genre_id FROM songs JOIN genres ON songs.genre_id = genres.id JOIN users ON users.id = songs.user_id WHERE user_id = 1 GROUP BY genres.id, users.id, songs.id`, [userId])
//   .then(songs => {
//     res.status(200).json({
//       status: 'success',
//       songs: songs,
//       message: 'Songs by Genre Received!'
//     })
//   })
//   .catch(err => {
//     res.status(400)
//     .json({
//       status: 'error',
//       message: " 🤣 Na nana na nah. You didn't get your Songs!😝 "
//     })
//     console.log(err);
//     next();
//   })
// }

const getOneSong = (req, res, next) => {
  let songId = parseInt(req.params.song_id);
  db.one('SELECT title, img_url, user_id, genre_id, username, genre_name FROM songs JOIN genres ON songs.genre_id = genres.id JOIN users ON users.id = songs.user_id WHERE songs.id = $1 GROUP BY genres.id, users.id, songs.id', [songId])
  .then(data => {
    res.status(200)
    .json({
      status: 'success',
      message: 'You got your Song.',
      body: data
    })
  }).catch(err => {
    res.status(400)
    .json({
      status: 'error',
      message: "🤣 Na nana na nah. You didn't get your Song!😝 "
    })
    console.log(err);
    next();
  })
}

const postNewSong = (req, res, next) => {
  db.none(
    'INSERT INTO songs(title, img_url, user_id, genre_id) VALUES(${title}, ${img_url}, ${user_id}, ${genre_id})', {
      title: req.body.title,
      img_url: req.body.img_url,
      user_id: req.body.user_id,
      genre_id: req.body.genre_id
    }
  ).then (() => {
    res.status(200)
    .json({
      status: 'success',
      message: 'New SONG ADDED.'
    })
  }).catch(err => {
    res.status(400)
    .json({
      status: 'error',
      message: "🤣 Na nana na nah. You didn't ADD a SONG!😝"
    })
    console.log(err);
    next();
  })
}

const deleteSingleSong = (req, res, next) => {
  let songId = parseInt(req.params.song_id);
  db.result('DELETE FROM songs WHERE songs.id =$1', [songId])
  .then(result => {
    res.status(200)
    .json({
      status: 'success',
      message: 'You DELETED this SONG.'
    })
  }).catch(err => {
    res.status(400)
    .json({
      status: 'error',
      message: "🤣 Na nana na nah. You didn't DELETED a SONG!😝"
    })
    console.log(err);
    next();
  })
}


module.exports = {
  getAllSongs,
  getAllSongsForSpecificGenre,
  getAllSongsPostedBySpecificUser,
  // getAllSongsPostedByMe,
  getOneSong,
  postNewSong,
  deleteSingleSong
  }
