import React, { useState } from 'react';
import ReportForm from '../componenets/ReportForm';
import GenerateButton from '../componenets/GenerateButton';
import ReportDisplay from '../componenets/ReportDisplay';

const ReportPage = () => {
  const [topic, setTopic] = useState('');
  const [pages, setPages] = useState('');
  const [reportLink, setReportLink] = useState('');

  const handleGenerateReport = async () => {
    // Logic for generating report using Hugging Face API will go here
    setReportLink('/path-to-generated-report.docx');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-6 text-center">AI Report Generator</h2>
        <ReportForm
          topic={topic}
          setTopic={setTopic}
          pages={pages}
          setPages={setPages}
        />
        <GenerateButton onClick={handleGenerateReport} />
        <ReportDisplay reportLink={reportLink} />
      </div>
    </div>
  );
};

export default ReportPage;
