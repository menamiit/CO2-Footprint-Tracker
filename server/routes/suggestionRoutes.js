const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/verifyToken');

const suggestions = {
  transport: {
    title: "Focus on Your Commute",
    tip: "Your travel habits are a major contributor. Try carpooling, using public transport more often, or cycling for short trips to make a big difference.",
    icon: "transport"
  },
  flight: {
    title: "Rethink Air Travel",
    tip: "Flights have a significant impact. Consider high-speed trains for shorter distances or combine multiple trips into one to reduce your flight frequency.",
    icon: "flight"
  },
  electricity: {
    title: "Optimize Home Energy",
    tip: "Your electricity usage is high. Switch to LED bulbs, unplug electronics when not in use, and consider a smart thermostat to cut down on energy waste.",
    icon: "electricity"
  },
  redMeat: {
    title: "Adjust Your Diet",
    tip: "Red meat has a high carbon footprint. Try incorporating more plant-based meals into your week or swapping beef for chicken to reduce your impact.",
    icon: "redMeat"
  },
  default: {
    title: "Keep Up the Great Work!",
    tip: "Your carbon footprint is looking good. Continue making sustainable choices to maintain your low impact on the environment.",
    icon: "leaf"
  }
};

router.post('/', authMiddleware, (req, res) => {
  const { emissions } = req.body;

  if (!emissions || typeof emissions !== 'object') {
    return res.status(400).json({ msg: 'Invalid emissions data provided.' });
  }

  let highestEmitter = 'default';
  let maxValue = 0;

  for (const category in emissions) {
    if (Object.prototype.hasOwnProperty.call(emissions, category) && emissions[category] > maxValue) {
      maxValue = emissions[category];
      highestEmitter = category;
    }
  }

  if (maxValue === 0) {
      highestEmitter = 'default';
  }

  const suggestion = suggestions[highestEmitter] || suggestions.default;

  res.json(suggestion);
});

module.exports = router;
