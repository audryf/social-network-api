const router = require('express').Router();
const {
    getAllUsers,
    getUserById,
    addUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend
} = require('../../controllers/user-controller');

// /api/users
router 
    .route('/')
    .get(getAllUsers)
    .post(addUser);

// /api/users/:id
router
    .route('/:id')
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser);

    // /api/users/:userId/friends
router
    .route('/:userId/friends')
    .post(addFriend)
    
// /api/users/:userId/friends/friendId
router
    .route('/:userId/friends/:friendId')
    .delete(deleteFriend)

module.exports = router;