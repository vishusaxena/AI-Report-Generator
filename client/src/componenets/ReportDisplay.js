import React from 'react';
import { Button } from 'flowbite-react';

const ReportDisplay = ({ reportLink }) => {
  return (
    reportLink && (
      <div className="mt-6 text-center">
       <Button className="text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm w-full text-center me-2 mb-2"> <a
          href={reportLink}
          download
         
        >
          Download Generated Report
        </a>
        </Button>
      </div>
    )
  );
};

export default ReportDisplay;
