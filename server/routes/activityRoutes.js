const express = require('express');
const router = express.Router();
const { getActivity, saveActivity } = require('../controllers/activityController');
const verifyToken = require('../middleware/verifyToken');
const Activity = require('../models/Activity');

router.get('/history', verifyToken, async (req, res) => {
  try {
    const activities = await Activity.find({ user: req.user.id }).sort({ month: 1 });
    res.json(activities);
  } catch (err) {
    console.error('Error fetching activity history:', err);
    res.status(500).json({ error: 'Server error' });
  }
});


router.get('/:month', verifyToken, getActivity);
router.post('/', verifyToken, saveActivity);

module.exports = router;