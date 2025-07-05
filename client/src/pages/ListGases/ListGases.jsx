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

function ListOfGases() {
  const [gasList, setGasList] = useState([]);
  const [filteredGases, setFilteredGases] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchCas, setSearchCas] = useState("");
  const [showModal, setShowModal] = useState(false); // 🔹 Modal state
  const [selectedGasId, setSelectedGasId] = useState(null); // 🔹 For storing the gas to delete



  useEffect(() => {
    getAllGases();
  }, []);

  const auth = useAuthUser();
  const navigate = useNavigate();

  let getAllGases = async () => {
    try {
      setLoading(true);
      let response = await axiosInstance.get("/getAllGases");
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

  const paginationModel = { page: 0, pageSize: 10 };

  const detailPage = (gasId) => {
    navigate(`/gasDetails/${gasId}`);
  };

  // 🔹 When delete button is clicked
  const handleDeleteClick = (gasId) => {
    setSelectedGasId(gasId);
    setShowModal(true);
  };

  // 🔹 Confirm actual deletion
  const confirmDelete = async () => {
    try {
      setLoading(true);
      await axiosInstance.delete(`/delete-gas/${selectedGasId}`);
      getAllGases();
    } catch (error) {
      console.error("Error deleting chemical:", error.message);
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
          No Gas list to show <PiSmileySadThin />{" "}
        </h4>
      ) : (
        <Paper sx={{ height: "80%", width: "75%", margin: "auto" }}>
          <DataGrid
            rows={filteredGases?.map((singleGas, i) => {
              return {
                id: i,
                gas_name: singleGas.gas_name,
                ordered_by: singleGas.gas_ordered_by,
                Vender_name: singleGas.vendor_name,
                gas_id: singleGas.gas_id,
                gas_cylinders_amount: singleGas.gas_cylinders_amount,
                delivery_date: new Date(singleGas.updated_at).toLocaleDateString(),
                gas_bill_path : singleGas.gas_bill_path,
                last_updated_by:singleGas.gas_consumed_by

              };
            })}
            columns={[
              { field: "gas_name", headerName: "Gas name", width: 140 },
              { field: "ordered_by", headerName: "Ordered by", width: 200 },
              { field: "Vender_name", headerName: "Vendor name", width: 200 },
              {
                field: "gas_cylinders_amount",
                headerName: "Amount of Cylinders in stock",
                width: 200,
              },
              { field: "delivery_date", headerName: "Updated On", width: 100 },
              { field: "last_updated_by", headerName: "Updated By", width: 100 },
              {
                field: "Recept",
                headerName: "Recept",
                width: 110,
                renderCell: (params) => (
                    <Link to={`${baseUrl}/${params.row.gas_bill_path?.replace(/\\/g, '/')}`} target="__blank"> View recept</Link>
                ),
              },
              // {
              //   field: "action",
              //   headerName: "Action",
              //   width: 110,
              //   renderCell: (params) => (

                  
              //      auth.userRole ==='1' && <Button
              //       style={{ margin: "5px" }}
              //       onClick={() => handleDeleteClick(params.row.gas_id)} 
              //       variant="danger"
              //     >
              //       Delete
              //     </Button>
              //   ),
              // },
            ]}
            initialState={{ pagination: { paginationModel } }}
            pageSizeOptions={[5, 10]}
            checkboxSelection={false}
            sx={{ border: 2 }}
          />
        </Paper>
      )}

      {/* 🔹 Confirmation Modal */}
      {/* <Modal show={showModal} onHide={cancelDelete} centered>
        <Modal.Header closeButton>
          <Modal.Title>Are you sure?</Modal.Title>
        </Modal.Header>
        <Modal.Body>This action will permanently delete the selected gas.</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={cancelDelete}>
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal> */}
    </>
  );
}

export default ListOfGases;
