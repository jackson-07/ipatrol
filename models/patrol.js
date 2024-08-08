const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

const patrolSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    start_time: { type: Date, required: true },
    end_time: { type: Date, required: true },
    total_hours: { type: Number, required: true }
})

module.exports = mongoose.model('Patrol', patrolSchema);