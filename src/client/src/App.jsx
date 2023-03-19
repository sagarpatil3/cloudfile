import React, { useState, useRef, useMemo, useCallback, Fragment } from "react";
import { AgGridReact } from "ag-grid-react";
import FileUpload from "./components/FileUpload";
import Form from "react-bootstrap/Form";
import "./App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "ag-grid-community/styles/ag-grid.css"; // Core grid CSS, always needed
import "ag-grid-community/styles/ag-theme-alpine.css";

const App = () => {
  const gridRef = useRef();
  const [rowData, setRowData] = useState([]);
  const [scenario, setScenario] = useState("");
  const [fileName, setFileName] = useState("");
  const [fileData, setFileData] = useState([]);
  const [showESGGrid, setShowESGGrid] = useState(false);

  const [columnDefs, setColumnDefs] = useState([]);

  const defaultColDef = useMemo(() => ({
    sortable: true,
  }));

  // Example of consuming Grid Event
  const cellClickedListener = useCallback((event) => {
    console.log("cellClicked", event);
  }, []);

  const onFileUpload = (fileName, data) => {
    setFileName(fileName);
    setFileData(data);
    const columns = Object.keys(data[0]);
    const colDefs = columns.map((n, i) => {
      const columnDef = {
        id: `column${i}`,
        headerName: n,
        field: n,
        prop: n,
        minWidth: 120,
        resizable: true,
      };
      return columnDef;
    });
    setColumnDefs(colDefs);
    setRowData(data);
  };

  const getESGCalulated = () => {
    setShowESGGrid(true);
  };

  return (
    <div className="container mt-4">
      <div className="brand">
        <FontAwesomeIcon icon="cloud" size="4x" />
        <h4 className="display-4 mb-4"> Cloud File</h4>
      </div>

      <FileUpload onFileUpload={onFileUpload} />

      {rowData.length > 0 ? (
        <div
          className="ag-theme-alpine"
          style={{ width: "100%", height: "600px", margin: "15px" }}
        >
          <AgGridReact
            ref={gridRef}
            rowData={rowData}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            animateRows={true}
            rowSelection="multiple"
            onCellClicked={cellClickedListener}
          />
        </div>
      ) : (
        ""
      )}

      {rowData.length > 0 ? (
        <div className="scenario-form">
          <Form.Select
            aria-label="Default select example"
            onChange={setScenario}
            className="scenarios"
          >
            <option>Select Scenario :</option>
            <option value="1">1% increase in Global Temperature</option>
            <option value="2">5% YOY Reduced Rain</option>
            <option value="3">10% increase in atmosperic CO2</option>
          </Form.Select>
          <input
            value="Execute"
            className="btn btn-primary btn-execute"
            onClick={getESGCalulated}
          />
        </div>
      ) : (
        ""
      )}

      {showESGGrid ? (
        <div
          className="ag-theme-alpine"
          style={{ width: "100%", height: "600px", margin: "15px" }}
        >
          <AgGridReact
            ref={gridRef}
            rowData={rowData}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            animateRows={true}
            rowSelection="multiple"
            onCellClicked={cellClickedListener}
          />
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default App;
