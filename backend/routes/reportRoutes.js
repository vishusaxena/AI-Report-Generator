const express = require('express');
const { generateReport } = require('../controllers/reportController');
const { protect } = require('../middlewares/authMiddleware');
const upload = require('../middlewares/uploadMiddleware');
const path = require('path');

const router = express.Router();

// Route to generate report
router.post('/generate', protect, upload.single('codeFile'), generateReport);

router.get('/download/:id', protect, async (req, res) => {
    try {
        const report = await Report.findById(req.params.id);

        if (report && report.createdBy.toString() === req.user._id.toString()) {
            const reportFilePath = report.generatedReportPath;
            res.download(reportFilePath);
        } else {
            res.status(404).json({ message: 'Report not found or unauthorized' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
module.exports = router;
