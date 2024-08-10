const Patrol = require ("../../models/patrol");

module.exports = {
    getPatrol,
    create, 
}

async function getPatrol(req, res) {
    try {
        const allPatrols = await Patrol.find({ user: req.user._id }).sort("start_time");
        res.json(allPatrols);
    } catch (error) {
        res.status(400).json(error);
    }

}

async function create(req, res) {
    console.log(req.body)
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