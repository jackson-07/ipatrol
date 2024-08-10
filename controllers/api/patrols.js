const Patrol = require("../../models/patrol");

module.exports = {
    getPatrol,
    createPatrol,
    deletePatrol,
    updatePatrol,
}

async function getPatrol(req, res) {
    try {
        const allPatrols = await Patrol.find({ user: req.user._id }).sort("start_time");
        res.json(allPatrols);
    } catch (error) {
        res.status(400).json(error);
    }
}

async function createPatrol(req, res) {
    try {
        const patrol = await Patrol.create({
            ...req.body,
            user: req.user._id
        });
        res.status(201).json(patrol);
    } catch (error) {
        console.log(error)
        res.status(400).json(error);
    }
}

async function deletePatrol(req, res) {
    try {
        const patrol = await Patrol.findOneAndDelete({
            _id: req.params.id,
            user: req.user._id
        });
        res.status(201).json(patrol)
    } catch (error) {
        console.log(error)
        res.status(400).json(error);
    }
}

async function updatePatrol(req, res) {
    try {
        const patrol = await Patrol.findOneAndUpdate(
            {
                _id: req.params.id,
                user: req.user._id
            },
            req.body,
            { new: true, runValidators: true });
        res.status(200).json(patrol);
    } catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
}