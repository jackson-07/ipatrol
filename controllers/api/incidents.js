const Incident = require('../../models/incident');

module.exports = {
    getIncident,
    createIncident, 
    deleteIncident, 
    updateIncident, 

}

async function getIncident(req, res) {
    try {
        const allIncidents = await Incident.find({ user: req.user._id })
        res.json(allIncidents);
    } catch (error) {
        res.status(400).json(error);
    }
}

async function createIncident(req, res) {
    try {
        const incident = await Incident.create({
            ...req.body,
            user: req.user._id
        })
        res.status(201).json(incident);
    } catch (error) {
        console.log(error)
        res.status(400).json(error);
    }
}

async function deleteIncident(req, res) {

}

async function updateIncident(req, res) {
    
}