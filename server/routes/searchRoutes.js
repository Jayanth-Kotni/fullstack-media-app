const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken');
const { searchFiles } = require('../controllers/searchController');

/**
 * @swagger
 * tags:
 *   name: Search
 *   description: Search uploaded files
 */

/**
 * @swagger
 * /api/files/search:
 *   get:
 *     summary: Search for uploaded files by keyword
 *     tags: [Search]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: query
 *         schema:
 *           type: string
 *         required: true
 *         description: Keyword to search for in file metadata
 *     responses:
 *       200:
 *         description: List of matching files
 *       401:
 *         description: Unauthorized or token missing/invalid
 *       500:
 *         description: Server error
 */
router.get('/search', verifyToken, searchFiles);

module.exports = router;
