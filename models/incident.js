const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

const incidentSchema = new mongoose.Schema({
    patrol: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Patrol' },
    incident_time: { type: Date, required: true },
    description: { type: String, required: true },
    actions_taken: { type: String, required: true }
  });

module.exports = mongoose.model('Incident', incidentSchema);