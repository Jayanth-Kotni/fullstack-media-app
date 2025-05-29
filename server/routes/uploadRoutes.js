const express = require('express');
const router = express.Router();
const multer = require('multer');
const { storage } = require('../config/cloudinary');
const upload = multer({ storage });

const verifyToken = require('../middleware/verifyToken');
const { uploadFile, deleteFile, incrementView } = require('../controllers/uploadController');

/**
 * @swagger
 * tags:
 *   name: Files
 *   description: File management (upload, delete, view)
 */

/**
 * @swagger
 * /api/files/upload:
 *   post:
 *     summary: Upload a file
 *     tags: [Files]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: File uploaded successfully
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.post('/upload', verifyToken, upload.single('file'), uploadFile);

/**
 * @swagger
 * /api/files/{id}:
 *   delete:
 *     summary: Delete a file
 *     tags: [Files]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the file to delete
 *     responses:
 *       200:
 *         description: File deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: File not found
 *       500:
 *         description: Server error
 */
router.delete('/:id', verifyToken, deleteFile);

/**
 * @swagger
 * /api/files/view/{id}:
 *   post:
 *     summary: Increment view count of a file
 *     tags: [Files]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the file to increment view
 *     responses:
 *       200:
 *         description: View count incremented
 *       404:
 *         description: File not found
 *       500:
 *         description: Server error
 */
router.post('/view/:id', incrementView);

module.exports = router;
