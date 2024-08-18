const { generateReportService } = require('../services/reportService');

const generateReport = async (req, res) => {
  try {
    const { topic, pages } = req.body;

    if (!topic || !pages) {
      return res.status(400).json({ message: 'Topic and number of pages are required' });
    }

    const reportLink = await generateReportService(topic, pages);

    return res.json({ reportLink });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = {
  generateReport,
};
