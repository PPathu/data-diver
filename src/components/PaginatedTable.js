import React, { useState } from "react";

const PaginatedTable = ({ fileName, data, rowsPerPageOptions, onRemove, onViewFull }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[0]);

  const totalPages = Math.ceil(data.length / rowsPerPage);
  const displayedData = data.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

  return (
    <div style={{
      width: "100%",
      minWidth: "500px",
      maxWidth: "100%",
      border: "1px solid #ddd",
      padding: "10px",
      background: "#f9f9f9",
      borderRadius: "5px",
      textAlign: "center",
      boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
      overflow: "hidden"
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h3>{fileName}</h3>
        <div>
          <button onClick={onViewFull} style={buttonStyle("#007BFF")}>
            📄 View Full CSV
          </button>
          <button onClick={onRemove} style={buttonStyle("red")}>
            ❌ Remove
          </button>
        </div>
      </div>

      <label>
        Show rows:
        <select value={rowsPerPage} onChange={(e) => setRowsPerPage(Number(e.target.value))}>
          {rowsPerPageOptions.map((num) => (
            <option key={num} value={num}>
              {num}
            </option>
          ))}
        </select>
      </label>

      <div style={{ overflowX: "auto", maxWidth: "100%" }}>
        <table style={tableStyle}>
          <thead>
            <tr>
              {data.length > 0 &&
                Object.keys(data[0]).map((key) => (
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
  );
};

const buttonStyle = (bgColor) => ({
  background: bgColor,
  color: "white",
  border: "none",
  padding: "5px 10px",
  cursor: "pointer",
  borderRadius: "5px",
  marginRight: "10px"
});

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

export default PaginatedTable;
