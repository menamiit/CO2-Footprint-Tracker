const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Activity = require('../models/Activity');
const verifyToken = require('../middleware/verifyToken');

router.get('/', verifyToken, async (req, res) => {
    try {
        const currentMonth = new Date().toISOString().slice(0, 7);

        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const result = await Activity.aggregate([
            { $match: { user: user._id, month: currentMonth } },
            { $group: { _id: null, total: { $sum: "$totalFootprint" } } }
        ]);

        const totalFootprint = result.length > 0 ? result[0].total : 0;

        res.status(200).json({
            username: user.username,
            email: user.email,
            createdAt: user.createdAt,
            totalFootprint
        });
    } catch (err) {
        console.error('Error fetching user profile:', err);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;