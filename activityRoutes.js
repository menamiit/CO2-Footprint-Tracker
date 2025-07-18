const express = require('express');
const Activity = require('./server/models/Activity');
const verifyToken = require('./server/middleware/verifyToken');
const router = express.Router();

// Save or update activity for a month
router.post('/', verifyToken, async (req, res) => {
  const { month, activities, totalFootprint } = req.body;
  try {
    let activity = await Activity.findOneAndUpdate(
      { user: req.user.id, month },
      { activities, totalFootprint },
      { new: true, upsert: true }
    );
    res.json(activity);
  } catch (err) {
    res.status(500).json({ message: "Failed to save activity", error: err.message });
  }
});

// Get activity for a month
router.get('/:month', verifyToken, async (req, res) => {
  try {
    const activity = await Activity.findOne({ user: req.user.id, month: req.params.month });
    res.json(activity);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch activity", error: err.message });
  }
});

module.exports = router;