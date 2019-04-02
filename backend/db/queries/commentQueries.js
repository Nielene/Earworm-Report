const { db } = require('../index.js');


// Postman: http://localhost:3000/users
const getAllComments = (req, res, next) => {
  db.any('SELECT * FROM comments').then(comments => {
    res.status(200)
    res.json({
      status: 'success',
      message: 'Got all Comments.',
      comments: comments
    })
  }).catch(err => {
    res.status(400)
    .json({
      status: 'error',
      message: " 🤣 Na nana na nah. You didn't get your Comments!😝 "
    })
    console.log(err);
    next();
  })
}


const getAllCommentsForSpecificSong = (req, res, next) => {
  let songId = parseInt(req.params.song_id);
  // let songId = parseInt(req.body.song_id);
  db.any(
    `SELECT songs.id AS song_id, comments.id AS comment_id, comment_body FROM songs JOIN comments ON songs.id = comments.song_id WHERE songs.id = $1 GROUP BY songs.id, comments.id`, [songId]
  )
  .then(comments => {
    res.status(200).json({
      status: 'success',
      single_song_comments: comments,
      message: 'Single Song Received!'
    })
  })
  .catch(err => {
    res.status(400)
    .json({
      status: 'error',
      message: " 🤣 Na nana na nah. You didn't get your Comments!😝 "
    })
    console.log(err);
    next();
  })
}


// incomplete:
const postNewComment = (req, res, next) => {
  db.none("INSERT INTO comments(comment_body, user_id, song_id) VALUES(${comment_body}, ${user_id}, ${song_id})", {
    ...req.body,
    song_id: parseInt(req.params.song_id),
    // user_id: 1
  })
  .then(() => {
    res.status(200).json({
      status: "success",
      message: "added a comment"
    })
  })
  .catch(err => {
    res.status(400)
    .json({
      status: 'error',
      message: " 🤣 Na nana na nah. You didn't post your COMMENT!😝 "
    })
    console.log(err);
    next();
  })
}


const patchSingleComment = (req, res, next) => {

}

const deleteSingleComment = (req, res, next) => {
  let commentId = parseInt(req.body.id);
  db.result('DELETE FROM comments WHERE comments.id =$1', [commentId])
  .then(result => {
    res.status(200)
    .json({
      status: 'success',
      message: 'You DELETED this COMMENT.'
    })
  }).catch(err => {
    res.status(400)
    .json({
      status: 'error',
      message: "🤣 Na nana na nah. You didn't DELETED a Comment!😝"
    })
    console.log(err);
    next();
  })
}


module.exports = {
  getAllComments,
  getAllCommentsForSpecificSong,
  postNewComment,
  patchSingleComment,
  deleteSingleComment
  }
