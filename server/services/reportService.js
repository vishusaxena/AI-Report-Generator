const axios = require('axios');
const fs = require('fs');
const path = require('path');
const { createDocx } = require('../models/reportModel');

const generateReportService = async (topic, pages) => {
    try {
      const apiKey = process.env.HUGGING_FACE_API_KEY;
      const apiUrl = 'https://api-inference.huggingface.co/models/ichvishu/google/gemma-2-2b-it';
      const contentChunks = [];
  
      for (let i = 0; i < pages; i++) {
        const response = await axios.post(apiUrl, {
          inputs: `Generate a section of ${topic} for page ${i + 1}.`,
          parameters: {
            max_length: 500, // Adjust based on how much content you need per chunk
            temperature: 0.7,
          },
          headers: {
            Authorization: `Bearer ${apiKey}`,
          },
        });
  
        contentChunks.push(response.data.generated_text);
      }
  
      const fullReportContent = contentChunks.join('\n\n');
      const reportPath = createDocx(fullReportContent);
      
      return reportPath;
    } catch (error) {
      console.error('Error generating report:', error);
      throw error;
    }
  };
  
module.exports = {
  generateReportService,
};
