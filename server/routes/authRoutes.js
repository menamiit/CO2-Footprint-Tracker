const express = require('express');
const { registerUser, loginUser } = require('../controllers/authController');
const verifyToken = require('../middleware/verifyToken');

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);

router.get('/protected', verifyToken, (req, res) => {
  res.json({ message: 'You have access to this protected route!', user: req.user });
});

module.exports = router;