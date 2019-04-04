let express = require('express');
let router = express.Router();
const db = require('../db/queries/favoriteQueries');


router.get('/', db.getAllFavorites );     // http://localhost:3100/users
router.post('/', db.postNewFavorite);    //??

router.get('/song/:song_id', db.getAllFavoritesForSpecificSong)
router.get('/user/:user_id', db.getAllFavoritesForSpecificUser);

router.delete('/:favorite_id', db.deleteSingleFavorite);

module.exports = router;
