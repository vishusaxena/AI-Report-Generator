import React from 'react';
import { Button } from 'flowbite-react';

const GenerateButton = ({ onClick }) => {
  return (
    <Button onClick={onClick} className="w-full bg-blue-700 my-4">
      Generate Report
    </Button>
  );
};

export default GenerateButton;
