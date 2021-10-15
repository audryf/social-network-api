const { Thought, User } = require('../models');

const thoughtController = {
    // get all thoughts
    getAllThoughts(req, res) {
        Thought.find({})
    },

    // get one thought by id
    getThoughtById({params}, res) {
        Thought.findOne({ _id: params.id })
    },

    // create new thought and push new thought to associated users thoughts array
    addThought({body}, res) {
        Thought.create(body)
    },

    // update a thought by id
    updateThought({ params, body}, res) {
        Thought.findOneAndUpdate({_id: params.id}, body, {new: true, runValidators: true})
    },

    // remove thought by id
    deleteThought({ params }, res) {
        Thought.findOneAndDelete({_id: params.id})
    }
}

module.exports = thoughtController;