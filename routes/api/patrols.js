const express = require('express');
const router = express.Router();
const patrolCtrl = require('../../controllers/api/patrols');
const ensureLoggedIn = require('../../config/ensureLoggedIn');

router.get('/', ensureLoggedIn, patrolCtrl.getAll);
router.post('/', ensureLoggedIn, patrolCtrl.create);

module.exports = router;