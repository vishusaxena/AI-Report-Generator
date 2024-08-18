const docx = require('docx');
const fs = require('fs');
const path = require('path');

const createDocx = async (content) => {
  const doc = new docx.Document({
    sections: [
      {
        properties: {},
        children: [
          new docx.Paragraph({
            children: [
              new docx.TextRun(content),
            ],
          }),
        ],
      },
    ],
  });

  const filePath = path.join(__dirname, '../reports', `report_${Date.now()}.docx`);
  try {
    const buffer = await docx.Packer.toBuffer(doc);
    fs.writeFileSync(filePath, buffer);
  } catch (error) {
    console.error('Error writing DOCX file:', error);
    throw error;
  }

  return filePath;
};

module.exports = {
  createDocx,
};
