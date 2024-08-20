import React, { useState } from 'react';
import ReportForm from '../componenets/ReportForm';
import GenerateButton from '../componenets/GenerateButton';
import ReportDisplay from '../componenets/ReportDisplay';
import axios from 'axios';

const ReportPage = () => {
  const [topic, setTopic] = useState('');
  const [pages, setPages] = useState('');
  const [reportLink, setReportLink] = useState('');

  const handleGenerateReport = async () => {
    
    try {
      // Make a POST request to the backend with the topic and pages
      const response = await axios.post('http://localhost:5000/api/reports/generate', { topic, pages });
      
      // Extract the file path from the response
      const filePath = response.data.filePath;

      // Set the report link to the file path for the user to download
      setReportLink(`http://localhost:5000${filePath}`);
    } catch (error) {
      console.error('Error generating report:', error);
    }
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
