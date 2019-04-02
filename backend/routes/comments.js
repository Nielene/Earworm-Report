let express = require('express');
let router = express.Router();
const db = require('../db/queries/commentQueries');


router.get('/', db.getAllComments );     // http://localhost:3100/users

router.get('/:song_id', db.getAllCommentsForSpecificSong)
// router.get('/', db.getAllCommentsForSpecificSong)
router.post('/:song_id', db.postNewComment);

router.patch('/:comment_id', db.patchSingleComment);

router.delete('/:song_id', db.deleteSingleComment);

module.exports = router;
