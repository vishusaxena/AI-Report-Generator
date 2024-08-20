const { generateReportService } = require('../services/reportService');
const path=require('path');
const generateReport = async (req, res) => {
  try {
    const { topic, pages } = req.body;

    if (!topic || !pages) {
      return res.status(400).json({ message: 'Topic and number of pages are required' });
    }

    const reportLink = await generateReportService(topic, pages);

    return res.json({filePath: `/reports/${path.basename(reportLink)}`});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = {
  generateReport,
};
