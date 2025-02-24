import React, { useState } from "react";

const FullCsvModal = ({ fileName, data, onClose }) => {
  const rowsPerPageOptions = [20, 50, 100, 200, 500]; // Double the main page options
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[0]);

  const totalPages = Math.ceil(data.length / rowsPerPage);
  const displayedData = data.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

  return (
    <div style={modalBackgroundStyle}>
      <div style={modalContentStyle}>
        <button onClick={onClose} style={closeButtonStyle}>❌ Close</button>
        <h2>{fileName}</h2>

        {/* Rows Per Page Selection */}
        <label>
          Show rows:
          <select value={rowsPerPage} onChange={(e) => {
            setRowsPerPage(Number(e.target.value));
            setCurrentPage(1); // Reset to first page
          }}>
            {rowsPerPageOptions.map((num) => (
              <option key={num} value={num}>{num}</option>
            ))}
          </select>
        </label>

        {/* Table Wrapper */}
        <div style={{ overflowX: "auto", maxWidth: "100%" }}>
          <table style={tableStyle}>
            <thead>
              <tr>
                {Object.keys(data[0] || {}).map((key) => (
                  <th key={key} style={tableHeaderStyle}>{key}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {displayedData.map((row, index) => (
                <tr key={index}>
                  {Object.values(row).map((value, i) => (
                    <td key={i} style={tableCellStyle}>{value}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        <div style={paginationStyle}>
          <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
            ⬅️ Prev
          </button>
          <span> Page {currentPage} of {totalPages} </span>
          <button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages}>
            Next ➡️
          </button>
        </div>
      </div>
    </div>
  );
};

// Styles
const modalBackgroundStyle = {
  position: "fixed",
  top: "0",
  left: "0",
  width: "100vw",
  height: "100vh",
  background: "rgba(0, 0, 0, 0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: "1000"
};

const modalContentStyle = {
  width: "90vw",
  height: "90vh",
  background: "white",
  padding: "20px",
  borderRadius: "10px",
  overflow: "auto",
  position: "relative"
};

const closeButtonStyle = {
  position: "absolute",
  top: "10px",
  right: "10px",
  background: "red",
  color: "white",
  border: "none",
  padding: "5px 10px",
  cursor: "pointer",
  borderRadius: "5px"
};

const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
  fontSize: "12px"
};

const tableHeaderStyle = {
  padding: "8px",
  border: "1px solid #ddd",
  whiteSpace: "nowrap"
};

const tableCellStyle = {
  padding: "8px",
  border: "1px solid #ddd",
  whiteSpace: "nowrap"
};

const paginationStyle = {
  display: "flex",
  justifyContent: "center",
  marginTop: "10px",
  gap: "10px"
};

export default FullCsvModal;
