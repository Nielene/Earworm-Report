let express = require('express');
let router = express.Router();
const db = require('../db/queries/favoriteQueries');


router.get('/', db.getAllFavorites );     // http://localhost:3100/users
router.get('/', db.getAllFavoritesForSpecificSong)
router.get('/', db.getAllFavoritesForSpecificUser);

router.post('/', db.postNewFavorite);

router.delete('/:song_id', db.deleteSingleFavorite);

module.exports = router;
