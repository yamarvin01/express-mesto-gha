const router = require('express').Router();
const {
  getLoggedInUser,
  getUsers,
  getUserById,
  undateProfile,
  undateAvatar,
} = require('../controllers/users');

router.get('/users/me', getLoggedInUser);
router.get('/users', getUsers);
router.get('/users/:userId', getUserById);
router.patch('/users/me', undateProfile);
router.patch('/users/me/avatar', undateAvatar);

module.exports = router;
