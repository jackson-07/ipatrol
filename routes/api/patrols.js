const express = require('express');
const router = express.Router();
const patrolCtrl = require('../../controllers/api/patrols');
const ensureLoggedIn = require('../../config/ensureLoggedIn');

router.get('/', ensureLoggedIn, patrolCtrl.getPatrol);
router.post('/', ensureLoggedIn, patrolCtrl.createPatrol);
router.delete('/:id', ensureLoggedIn, patrolCtrl.deletePatrol);

module.exports = router;