const { Thought, User } = require('../models');

const userController = {
    // get all users
    getAllUsers(req, res) {
        User.find({})
    },

    // get one user by id
    getUserById({params}, res) {
        User.findOne({_id: params.id})
    },

    // create new user
    addUser({body}, res) {
        User.create(body)
    },

    // update a user by id
    updateUser({params, body}, res) {
        User.findOneAndUpdate({_id: params.id}, body, {new: true, runValidators: true})
    },

    // delete user by id
    deleteUser({params}, res) {
        User.findOneAndDelete({_id: params.id})
    }
}

module.exports = userController;