import React, { useState } from "react";
import PaginatedTable from "./PaginatedTable";
import FullCsvModal from "./FullCsvModal";

const CsvTable = ({ csvData, onRemoveCsv }) => {
  const rowsPerPageOptions = [10, 25, 50, 100, 250];

  const [selectedCsv, setSelectedCsv] = useState(null); // Track the CSV opened in a popup

  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(500px, 1fr))",
      gap: "20px",
      justifyContent: "center",
      alignItems: "start",
      padding: "20px 20px",
      maxWidth: "95vw",
      margin: "0 auto",
    }}>
      {Object.entries(csvData).map(([fileName, data]) => (
        <PaginatedTable 
          key={fileName} 
          fileName={fileName} 
          data={data} 
          rowsPerPageOptions={rowsPerPageOptions} 
          onRemove={() => onRemoveCsv(fileName)}
          onViewFull={() => setSelectedCsv({ fileName, data })} // Open modal
        />
      ))}

      {/* Full CSV Modal */}
      {selectedCsv && (
        <FullCsvModal 
          fileName={selectedCsv.fileName} 
          data={selectedCsv.data} 
          onClose={() => setSelectedCsv(null)} // Close modal
        />
      )}
    </div>
  );
};

export default CsvTable;
