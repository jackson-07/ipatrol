const express = require('express');
const router = express.Router();
const patrolCtrl = require('../../controllers/api/patrols');
const ensureLoggedIn = require('../../config/ensureLoggedIn');

router.get('/', patrolCtrl.getAll);
router.post('/', patrolCtrl.create);

module.exports = router;