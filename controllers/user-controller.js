const { Thought, User } = require('../models');

const userController = {
    // get all users
    getAllUsers(req, res) {
        User.find({})
            .populate({ path: 'thoughts', select: '-__v' })
            .select('-__v')
            .then(dbUser => res.json(dbUser))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            })
    },

    // get one user by id
    getUserById({ params }, res) {
        User.findOne({ _id: params.id })
            .populate({ path: 'thoughts', select: '-__v' })
            .select('-__v')
            .then(dbUser => {
                if (!dbUser) {
                    res.status(404).json({ message: 'No user found with this id' });
                    return;
                }
                res.json(dbUser);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            })
    },

    // create new user
    addUser({ body }, res) {
        User.create(body)
            .then(dbUser => res.json(dbUser))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            })
    },

    // update a user by id
    updateUser({ params, body }, res) {
        User.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
            .then(dbUser => {
                if (!dbUser) {
                    res.status(404).json({ message: 'No user found with this id' });
                    return;
                }
                res.json(dbUser);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            })
    },

    // delete user by id
    deleteUser({ params }, res) {
        User.findOneAndDelete({ _id: params.id })
            .then(dbUser => {
                if (!dbUser) {
                    res.status(404).json({ message: 'No user found with this id' });
                    return;
                }
                res.json(dbUser);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            })
    }
}

module.exports = userController;