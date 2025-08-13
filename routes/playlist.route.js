const express = require('express');
const router = express.Router();
const multer = require('multer');
const {
  postNestedDataByUserId,
} = require('../controllers/postUsers.controller');

// Setup Multer for multipart/form-data
const storage = multer.memoryStorage();
const upload = multer({ storage });

// POST full playlist with images
router.post(
  '/api/users/:id/playlists',
  upload.fields([
    { name: 'playlist_image', maxCount: 1 },
    { name: 'track_images', maxCount: 50 },
  ]),
  postNestedDataByUserId
);

module.exports = router;
