


import React, { useState, useEffect } from "react";
import { axiosInstance } from "../../Utility/urlInstance";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal"; // 🔹 Added Modal import
import { PiSmileySadThin } from "react-icons/pi";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { Link, useNavigate } from "react-router-dom";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

dayjs.extend(customParseFormat);

function OldGasBills() {
  const [gasList, setGasList] = useState([]);
  const [filteredGases, setFilteredGases] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchCas, setSearchCas] = useState("");
  const [showModal, setShowModal] = useState(false); 
  const [gasName, setSelectedGasName] = useState(null); 
  const [gasDate, setSelectedGasDate] = useState(null); 



  useEffect(() => {
    getAllGases();
  }, []);

  const auth = useAuthUser();
  const navigate = useNavigate();

  let getAllGases = async () => {
    try {
      setLoading(true);
      let response = await axiosInstance.get("/junkGasFiles");
      if (response.data) {
        setGasList(response.data);
        setFilteredGases(response.data);
      } else {
        setGasList([]);
        setFilteredGases([]);
      }
      setLoading(false);
    } catch (error) {
      console.log(error.message);
      setGasList([]);
      setFilteredGases([]);
      setLoading(false);
    }
  };



  const paginationModel = { page: 0, pageSize: 3 };

  const detailPage = (gasId) => {
    navigate(`/gasDetails/${gasId}`);
  };

  // 🔹 When delete button is clicked // gass id means the file name in this case
  const handleDeleteClick = (gasName,gasDate) => {
    setSelectedGasDate(gasDate);
    setSelectedGasName(gasName)
    setShowModal(true);
  };

  // 🔹 Confirm actual deletion
  const confirmDelete = async () => {
    try {
      setLoading(true);
      let fullFileName = `${gasDate}_${gasName}`
      console.log(fullFileName)
      await axiosInstance.delete(`/deleteJunkGasFiles/${fullFileName}`);
      getAllGases();
    } catch (error) {
        console.log(error)
      console.error("Error deleting old gas bill:", error.message);
      toast.error("Failed to delete gas");
    } finally {
      setLoading(false);
      setShowModal(false);
      setSelectedGasId(null);
    }
  };

  // 🔹 Cancel deletion
  const cancelDelete = () => {
    setShowModal(false);
    setSelectedGasId(null);
  };

     const baseUrl = axiosInstance.defaults.baseURL;


  return (
    <>
      <ToastContainer position="top-right" />
      <h4 className="text-white m-4">List Of Gasses</h4>
      <hr className="text-white" />

      {!filteredGases || filteredGases.length === 0 ? (
        <h4 className="text-white m-3">
          No Gas bills to show <PiSmileySadThin />{" "}
        </h4>
      ) : (
        <Paper sx={{ height: "80%", width: "45%", margin: "auto" }}>
          <DataGrid
            rows={filteredGases?.map((singleGas, i) => {
              return {
                id: i,
                fileName: singleGas.fileName,
                filePath: singleGas.filePath,
                date: singleGas.formateDate,
                unformattedDate:singleGas.date
              };
            })}
            columns={[
              { field: "fileName", headerName: "Stored File Name", width: 140 },
              { field: "date", headerName: "Date of upload", width: 200 },
             
              {
                field: "Recept",
                headerName: "Recept",
                width: 110,
                renderCell: (params) => (
                    <Link to={`${baseUrl}/${params.row.filePath?.replace(/\\/g, '/')}`} target="__blank"> View recept</Link>
                ),
              },
              {
                field: "action",
                headerName: "Action",
                width: 110,
                renderCell: (params) => (

                  
                   auth.userRole ==='1' && <Button
                    style={{ margin: "5px" }}
                    onClick={() => handleDeleteClick(params.row.fileName,params.row.unformattedDate)} 
                    variant="danger"
                  >
                    Delete
                  </Button>
                ),
              },
            ]}
            initialState={{ pagination: { paginationModel } }}
            pageSizeOptions={[5, 10]}
            checkboxSelection={false}
            sx={{ border: 2 }}
          />
        </Paper>
      )}

      {/* 🔹 Confirmation Modal */}
      <Modal show={showModal} onHide={cancelDelete} centered>
        <Modal.Header closeButton>
          <Modal.Title>Are you sure?</Modal.Title>
        </Modal.Header>
        <Modal.Body>This action will permanently delete the selected gas bill.</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={cancelDelete}>
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default OldGasBills;
