const Activity = require('../models/Activity');

// @desc    Get activity data for a specific month
// @route   GET /api/activity/:month
// @access  Private
exports.getActivity = async (req, res) => {
  try {
    // req.user is populated by the verifyToken middleware
    const activity = await Activity.findOne({ user: req.user.id, month: req.params.month });

    if (!activity) {
      // It's okay to not find an activity, it just means the user hasn't entered data for this month yet.
      // The client-side handles this by resetting to default values.
      return res.status(200).json(null);
    }

    res.json(activity);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @desc    Create or update activity data for a specific month
// @route   POST /api/activity
// @access  Private
exports.saveActivity = async (req, res) => {
  const { month, activities, totalFootprint } = req.body;
  const userId = req.user.id; // from verifyToken middleware

  try {
    // Use findOneAndUpdate with 'upsert: true' to either update an existing document or create a new one.
    const activityData = { user: userId, month, activities, totalFootprint };
    const updatedActivity = await Activity.findOneAndUpdate({ user: userId, month }, activityData, { new: true, upsert: true });

    res.status(200).json(updatedActivity);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Error saving activity' });
  }
};