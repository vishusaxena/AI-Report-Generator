const axios = require('axios');
const fs = require('fs');
const path = require('path');
const docx = require('docx');
const Report = require('../models/reportModel');
const { Document, Packer, Paragraph, TextRun } = docx;

const DEEP_AI_API_KEY = '6c0d5178-3b6b-43eb-9d9b-27e6c5be3e87'; // Replace with your DeepAI API key

const generateReport = async (req, res) => {
    const { templateName, templateContent } = req.body;
    const codeFile = req.file;

    try {
        // Save the uploaded code file
        const codeFilePath = path.join(__dirname, '../uploads/', codeFile.filename);
        fs.writeFileSync(codeFilePath, codeFile.buffer);

        // Read the content of the code file
        const codeContent = fs.readFileSync(codeFilePath, 'utf-8');

        // Call DeepAI API to generate a report
        const response = await axios.post('https://api.deepai.org/api/text-generator', {
            text: `Analyze the following code and generate a report:\n\n${codeContent}`,
        }, {
            headers: { 'api-key': DEEP_AI_API_KEY },
        });

        const aiGeneratedContent = response.data.output;

        // Replace placeholders in the template with AI-generated content
        const filledTemplate = templateContent
            .replace('{{aiGeneratedContent}}', aiGeneratedContent);

        // Generate the report using the filled template
        const doc = new Document({
            sections: [
                {
                    properties: {},
                    children: [
                        new Paragraph({
                            children: [
                                new TextRun({
                                    text: "AI-Generated Report",
                                    bold: true,
                                }),
                            ],
                        }),
                        new Paragraph({
                            children: [
                                new TextRun(filledTemplate),
                            ],
                        }),
                    ],
                },
            ],
        });

        // Save the generated report to a file
        const reportFileName = `${Date.now()}_report.docx`;
        const reportFilePath = path.join(__dirname, '../uploads/', reportFileName);
        const buffer = await Packer.toBuffer(doc);
        fs.writeFileSync(reportFilePath, buffer);

        // Save report information in the database
        const report = await Report.create({
            templateName,
            templateContent: filledTemplate,
            codeFilePath,
            generatedReportPath: reportFilePath,
            createdBy: req.user._id,
        });

        res.status(201).json({
            message: 'AI-generated report created successfully',
            report,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    generateReport,
};


module.exports = {
    generateReport,
};
