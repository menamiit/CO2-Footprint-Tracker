const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken');
const Activity = require('../models/Activity');
const mongoose = require('mongoose');

router.get('/graph', verifyToken, async (req, res) => {
  console.log("Authenticated user ID:", req.user.id); // <-- ADD THIS LINE

  try {
    const userId = new mongoose.Types.ObjectId(req.user.id);
    const graphData = await Activity.aggregate([
      { $match: { user: userId } },
      {
        $group: {
          _id: "$month",
          totalFootprint: { $sum: "$totalFootprint" }
        }
      },
      { $sort: { _id: 1 }}
    ]);

    res.status(200).json(graphData);
  } catch (err) {
    console.error("Footprint history error:", err);
    res.status(500).json({ message: "Server error while fetching footprint history" });
  }
});



module.exports = router;
