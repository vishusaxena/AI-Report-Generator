import React from 'react';

const ReportDisplay = ({ reportLink }) => {
  return (
    reportLink && (
      <div className="mt-6 text-center">
        <a
          href={reportLink}
          download
          className="text-blue-500 hover:underline"
        >
          Download Generated Report
        </a>
      </div>
    )
  );
};

export default ReportDisplay;
