const express = require('express');
const router = express.Router();
const incidentCtrl = require('../../controllers/api/incidents');
const ensureLoggedIn = require('../../config/ensureLoggedIn');

router.get('/', ensureLoggedIn, incidentCtrl.getIncident);
router.post('/', ensureLoggedIn, incidentCtrl.createIncident);
router.delete('/:id', ensureLoggedIn, incidentCtrl.deleteIncident);
router.put('/:id', ensureLoggedIn, incidentCtrl.updateIncident);

module.exports = router;