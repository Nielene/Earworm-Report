let express = require('express');
let router = express.Router();
const db = require('../db/queries/genreQueries');


router.get('/', db.getAllGenres );     // http://localhost:3100/genres
router.post('/', db.postNewGenre);


module.exports = router;
