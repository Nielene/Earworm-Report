let express = require('express');
let router = express.Router();
const db = require('../db/queries/userQueries');


router.get('/', db.getAllUsers );     // http://localhost:3100/users
router.post('/', db.postNewUser);

router.get('/:user_id', db.getSingleUser);

router.delete('/:user_id', db.deleteSingleUser);

module.exports = router;
