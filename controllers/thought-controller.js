const { Thought, User } = require('../models');

const thoughtController = {
    // get all thoughts
    getAllThoughts(req, res) {
        Thought.find({})
            .then(dbThought => res.json(dbThought))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            })
    },

    // get one thought by id
    getThoughtById({ params }, res) {
        Thought.findOne({ _id: params.id })
            .then(dbThought => {
                if (!dbThought) {
                    res.status(404).json({ message: 'No user found with this id' });
                    return;
                }
                res.json(dbThought);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            })
    },

    // create new thought and push new thought to associated users thoughts array
    addThought({ params, body }, res) {
        Thought.create(body)
            .then(({ _id }) => {
                return User.findOneAndUpdate(
                    { _id: body.userId },
                    { $push: { thoughts: _id } },
                    { new: true }
                );
            })
            .then(dbThought => {
                if (!dbThought) {
                    res.status(404).json({ message: 'No user found with this id' });
                    return;
                }
                res.json(dbThought);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            })
    },

    // update a thought by id
    updateThought({ params, body }, res) {
        Thought.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
            .then(dbThought => {
                if (!dbThought) {
                    res.status(404).json({ message: 'No user found with this id' });
                    return;
                }
                res.json(dbThought);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            })
    },

    // remove thought by id
    deleteThought({ params }, res) {
        Thought.findOneAndDelete({ _id: params.id })
            .then(dbThought => {
                if (!dbThought) {
                    res.status(404).json({ message: 'No user found with this id' });
                    return;
                }
                res.json(dbThought);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            })
    },

    // add reaction
    addReaction({ params, body }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $push: { reactions: body } },
            { new: true, runValidators: true }
        )
            .then(dbThought => {
                if (!dbThought) {
                    res.status(404).json({ message: 'No thought found with this id' });
                    return;
                }
                res.json(dbThought);
            })
            .catch(err => res.json(err));
    },

    // delete reaction
    deleteReaction({ params }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $pull: { reactions: { reactionId: params.reactionId } } },
            { new: true }
        )
        .then(dbThought => res.json(dbThought))
        .catch(err => res.json(err));
    }
}

module.exports = thoughtController;