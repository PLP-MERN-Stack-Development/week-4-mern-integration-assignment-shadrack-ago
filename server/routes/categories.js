const express = require('express');
const router = express.Router();

// GET /api/categories - Get all categories (hardcoded for simplicity)
router.get('/', (req, res) => {
  const categories = [
    'Technology',
    'Travel',
    'Food',
    'Lifestyle',
    'Sports',
    'General'
  ];
  res.json(categories);
});

module.exports = router; 