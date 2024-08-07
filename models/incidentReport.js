const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

const incidentReportSchema = new mongoose.Schema({
    report_id: { type: Number, required: true, unique: true },
    patrol: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Patrol' },
    incident_time: { type: Date, required: true },
    description: { type: String, required: true },
    actions_taken: { type: String, required: true }
  });

module.exports = mongoose.model('Incident', incidentReportSchema);