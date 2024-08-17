const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
    templateName: {
        type: String,
        required: true,
        trim: true,
    },
    templateContent: {
        type: String,
        required: true,
    },
    codeFilePath: {
        type: String,
        required: true,
    },
    generatedReportPath: {
        type: String,
        required: true,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Report = mongoose.model('Report', reportSchema);

module.exports = Report;
