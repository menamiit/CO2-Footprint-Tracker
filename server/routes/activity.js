const express = require('express');
const router = express.Router();
const { getActivity, saveActivity } = require('../controllers/activityController');
const verifyToken = require('../middleware/verifyToken');

// @route   GET api/activity/:month
// @desc    Get user's activity for a specific month
// @access  Private
router.get('/:month', verifyToken, getActivity);

// @route   POST api/activity
// @desc    Create or update user's activity for a specific month
// @access  Private
router.post('/', verifyToken, saveActivity);

module.exports = router;