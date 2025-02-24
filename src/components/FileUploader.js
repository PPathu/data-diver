import React, { useState } from "react";
import Papa from "papaparse";

const FileUploader = ({ onDataLoaded }) => {
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleFileUpload = (event) => {
    const files = event.target.files;
    if (!files.length) return;

    const newFiles = [...selectedFiles, ...files];
    setSelectedFiles(newFiles);

    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = ({ target }) => {
        const csv = Papa.parse(target.result, { header: true, skipEmptyLines: true });
        onDataLoaded(file.name, csv.data);
      };
      reader.readAsText(file);
    });
  };

  return (
    <div>
      <input type="file" accept=".csv" multiple onChange={handleFileUpload} />
      <p>Selected Files: {selectedFiles.map((file) => file.name).join(", ")}</p>
    </div>
  );
};

export default FileUploader;
