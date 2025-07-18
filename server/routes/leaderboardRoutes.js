const express = require('express');
const router = express.Router();
const Activity = require('../models/Activity');
const User = require('../models/User');

router.get('/', async (req, res) => {
  try {
    const currentMonth = new Date().toISOString().slice(0, 7); // "2025-07"

    const leaderboard = await Activity.aggregate([
      { $match: { month: currentMonth } },
      {
        $group: {
          _id: "$user",
          totalFootprint: { $sum: "$totalFootprint" }
        }
      },
      { $sort: { totalFootprint: 1 } },
      { $limit: 10 },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "userDetails"
        }
      },
      { $unwind: "$userDetails" },
      {
        $project: {
          _id: 0,
          userId: "$userDetails._id",
          name: "$userDetails.name",
          email: "$userDetails.email",
          totalFootprint: 1
        }
      }
    ]);

    res.status(200).json(leaderboard);
  } catch (error) {
    console.error('Error generating leaderboard:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;