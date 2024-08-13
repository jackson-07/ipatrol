const express = require('express');
const router = express.Router();
const incidentCtrl = require('../../controllers/api/incidents');
const ensureLoggedIn = require('../../config/ensureLoggedIn');

router.get('/incidents', ensureLoggedIn, incidentCtrl.getIncident);
router.post('/incidents', ensureLoggedIn, incidentCtrl.createIncident);
router.delete('/incidents/:id', ensureLoggedIn, incidentCtrl.deleteIncident);
router.put('/incidents/:id', ensureLoggedIn, incidentCtrl.updateIncident)

module.exports = router;