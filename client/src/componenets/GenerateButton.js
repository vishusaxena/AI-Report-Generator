import React from 'react';
import { Button } from 'flowbite-react';

const GenerateButton = ({ onClick }) => {
  return (
    <Button onClick={onClick} className="w-full">
      Generate Report
    </Button>
  );
};

export default GenerateButton;
