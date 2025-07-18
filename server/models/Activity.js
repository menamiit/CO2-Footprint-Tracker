const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  month: { type: String, required: true },
  activities: {
    car: Number,
    bus: Number,
    train: Number,
    flight: Number,
    electricity: Number,
    redMeat: Number,
  },
  totalFootprint: Number,
}, { timestamps: true });

module.exports = mongoose.model('Activity', activitySchema);