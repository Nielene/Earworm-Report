const { db } = require('../index.js');


// Postman: http://localhost:3000/users
const getAllUsers = (req, res, next) => {
  db.any(
`SELECT users.id AS user_id, users.username FROM users`
  )
  .then(users => {
    res.status(200).json({
      status: 'success',
      users: users,
      message: 'All Users Received!'
    })
  })
  .catch(err => {
    res.status(400)
    .json({
      status: 'error',
      message: " 🤣 Na nana na nah. You didn't get your USERS!😝 "
    })
    console.log(err);
    next();
  })
}


const getSingleUser = (req, res, next) => {
  let userId = parseInt(req.params.user_id)
  db.one(
    `SELECT users.id AS user_id, username FROM users WHERE users.id = $1 ORDER BY users.id`, [userId]
  )
  .then(user => {
    res.status(200).json({
      status: 'success',
      single_user: user,
      message: 'This User Received!'
    })
  })
  .catch(err => {
    res.status(400)
    .json({
      status: 'error',
      message: " 🤣 Na nana na nah. You didn't get your User!😝 "
    })
    console.log(err);
    next();
  })
}


const postNewUser = (req, res, next) => {
  db.none(
    'INSERT INTO users(username) VALUES(${username})', {
      username: req.body.username
    }
  ).then (() => {
    res.status(200)
    .json({
      status: 'success',
      message: 'New USER ADDED.'
    })
  }).catch(err => {
    res.status(400)
    .json({
      status: 'error',
      message: "🤣 Na nana na nah. You didn't ADD a USER!😝"
    })
    console.log(err);
    next();
  })
}

const deleteSingleUser = (req, res, next) => {
  let user_id = parseInt(req.params.user_id);
  db.result('DELETE FROM users WHERE users.id =$1', [user_id])
  .then(() => {
    res.status(200).json({
      status: 'success',
      message: 'You DELETED this user.'
    })
  }).catch(err => {
    res.status(400).json({
      status: 'error',
      message: 'You did NOT delete any user.'
    })
     console.log(err);
    next();
  })
}


module.exports = {
  getAllUsers,
  getSingleUser,
  postNewUser,
  deleteSingleUser,
  }






  // const getAllAnimals = (req, res, next) => {
  //   db.any('SELECT * FROM animals').then(animals => {
  //     res.status(200)
  //     res.json({
  //       status: 'success',
  //       message: 'Got all Animals.',
  //       body: animals
  //     })
  //   }).catch(err => {
  //     res.status(400)
  //     .json({
  //       status: 'error',
  //       message: " 🤣 Na nana na nah. You didn't get your Animals!😝 "
  //     })
  //     console.log(err);
  //     next();
  //   })
  // }
  //
  // // http://localhost:3000/posts/1
  // const getSinglePost = (req, res, next) => {
  //   let postId = parseInt(req.params.id);
  //   db.one('SELECT users.*, subreddits.*, posts.*, COUNT(comments.id) FROM subreddits JOIN posts ON subreddits.id = posts.subreddit_id JOIN users ON users.id = posts.user_id JOIN comments ON users.id = comments.user_id WHERE posts.id= $1 GROUP BY users.id, subreddits.id, posts.id ORDER BY posts.post_votes DESC', [postId])
  //   .then(data => {
  //     res.status(200)
  //     .json({
  //       status: 'success',
  //       message: 'You got your Post.@@@@@@@',
  //       body: data
  //     })
  //   }).catch(err => next(err))
  // }
  //
  // // http://localhost:3000/posts/user/1
  // const getAllPostsBySingleUser = (req, res, next) => {
  //   let userId = parseInt(req.params.user_id);
  //   db.any(
  //     'SELECT users.*, subreddits.*, posts.* FROM subreddits JOIN users ON subreddits.id = users.subreddit_id JOIN posts ON users.id = posts.user_id WHERE posts.user_id =$1', [userId])
  //
  //   .then(data => {
  //     res.status(200).json({
  //       status: 'success',
  //       user_posts: data,
  //       message: 'ALL POSTS BY THIS USER!'
  //     })
  //   })
  //   .catch(err => {
  //     res.status(400)
  //     .json({
  //       status: 'error',
  //       message: 'YOU ARE NOT GETTING ALL POSTS FOR THIS USER!'
  //     })
  //      console.log(err);
  //     next();
  //   });
  // }
  //
  // const createNewPostInSingleSubreddit = (req, res, next) => {
  //
  //   let queryString = "INSERT INTO posts ";
  //
  //   if (req.body.post_body) {
  //     queryString +=   "(post_body, post_title, post_type, post_time, post_votes, subreddit_id, user_id, image_url) VALUES(${post_body}, ${post_title}, ${post_type}, ${post_time}, ${post_votes}, ${subreddit_id}, ${user_id}, ${image_url} )"
  //   } else if (req.body.image_url) {
  //     queryString +=   "(image_url, post_title, post_type, post_time, post_votes, subreddit_id, user_id) VALUES(${image_url}, ${post_title}, ${post_type}, ${post_time}, ${post_votes}, ${subreddit_id}, ${user_id} )"
  //   }
  //
  //   db.none(queryString, {
  //     ...req.body,
  //     user_id: req.user.id // if user is loogged in , you alwyas have req.user - which contains the user. i copied this from isLoggedIn (usersQueries) line 47.
  //   })
  //   .then(() => {
  //     res.status(200).json({
  //       status: 'success',
  //       message: 'NEW POST CREATED IN A SINGLE SUBREDDIT!',
  //       body: req.body,
  //     })
  //   })
  //   .catch(err => next(err));
  // }
  //
  //
  // const deleteOwnPost = (req, res, next) => {
  //   let post_id = parseInt(req.params.id);
  //   db.result('DELETE FROM posts WHERE posts.id =$1', [post_id])
  //   .then(result => {
  //     res.status(200).json({
  //       status: 'success',
  //       message: 'You DELETED this post.'
  //     })
  //   }).catch(err => {
  //     res.status(400).json({
  //       status: 'error',
  //       message: 'You did NOT delete any Post.'
  //     })
  //      console.log(err);
  //     next();
  //   })
  // }
