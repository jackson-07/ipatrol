const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

const patrolSchema = new mongoose.Schema({
    patrol_id: { type: Number, required: true, unique: true },
    user_id: { type: Number, required: true, ref: 'User' },
    start_time: { type: Date, required: true },
    end_time: { type: Date, required: true },
    total_hours: { type: Number, required: true }
})


module.exports = mongoose.model('Patrol', patrolSchema);