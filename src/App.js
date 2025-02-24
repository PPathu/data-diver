import React, { useState } from "react";
import FileUploader from "./components/FileUploader";
import CsvTable from "./components/CsvTable";

function App() {
  const [csvData, setCsvData] = useState({});

  const handleDataLoaded = (fileName, data) => {
    setCsvData((prevData) => ({ ...prevData, [fileName]: data }));
  };

  const handleRemoveCsv = (fileName) => {
    setCsvData((prevData) => {
      const updatedData = { ...prevData };
      delete updatedData[fileName];  // Remove the CSV from state
      return updatedData;
    });
  };

  return (
    <div>
      <h1>CSV Viewer</h1>
      <FileUploader onDataLoaded={handleDataLoaded} />
      <CsvTable csvData={csvData} onRemoveCsv={handleRemoveCsv} />
    </div>
  );
}

export default App;
