const docx = require('docx');
const fs = require('fs');
const path = require('path');

const A4_WIDTH = 11906;  // Width in twips
const A4_HEIGHT = 16838; // Height in twips

const createDocx = async (content) => {
  const doc = new docx.Document({
    sections: [
      {
        properties: {
          page: {
            size: {
              width: A4_WIDTH,
              height: A4_HEIGHT,
            },
            margins: {
              top: 1440, // 2 inches in twips
              right: 1440,
              bottom: 1440,
              left: 1440,
            },
          },
        },
        children: [
          ...generateContentFromText(content),
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

const generateContentFromText = (text) => {
  const paragraphs = text.split('\n\n'); // Split text by double line breaks for paragraphs

  return paragraphs.map(paragraph => {
    if (paragraph.startsWith('## ')) {
      return new docx.Paragraph({
        text: paragraph.substring(3), // Remove '## ' from start
        heading: docx.HeadingLevel.HEADING_1,
        style: 'Heading1',
      });
    } else if (paragraph.startsWith('**')) {
      return new docx.Paragraph({
        children: [
          new docx.TextRun({
            text: paragraph.substring(2, paragraph.length - 2), // Remove '**' from start and end
            bold: true,
          }),
        ],
        spacing: {
          before: 240, // 10 points in twips
        },
      });
    } else {
      return new docx.Paragraph({
        children: [
          new docx.TextRun({
            text: paragraph,
            font: 'Times New Roman',
            size: 24, // Font size (1/2 point, so 24 = 12pt)
          }),
        ],
        spacing: {
          after: 240, // 10 points in twips
        },
      });
    }
  });
};

module.exports = {
  createDocx,
};
