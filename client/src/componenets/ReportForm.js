import React from 'react';
import { TextInput, Label } from 'flowbite-react';

const ReportForm = ({ topic, setTopic, pages, setPages }) => {
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="topic" value="Report Topic" />
        <TextInput
          id="topic"
          type="text"
          placeholder="Enter the topic"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          required
        />
      </div>
      <div>
        <Label htmlFor="pages" value="Number of Pages" />
        <TextInput
          id="pages"
          type="number"
          placeholder="Enter number of pages"
          value={pages}
          onChange={(e) => setPages(e.target.value)}
          required
        />
      </div>
    </div>
  );
};

export default ReportForm;
