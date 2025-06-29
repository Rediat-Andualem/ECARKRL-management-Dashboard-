// import React, { useState, useEffect } from "react";
// import { axiosInstance } from "../../Utility/urlInstance";
// import { DataGrid } from "@mui/x-data-grid";
// import Paper from "@mui/material/Paper";
// import Button from "react-bootstrap/Button";
// import Modal from "react-bootstrap/Modal"; // 🔹 Added Modal import
// import { PiSmileySadThin } from "react-icons/pi";
// import dayjs from "dayjs";
// import customParseFormat from "dayjs/plugin/customParseFormat";
// import { Link, useNavigate } from "react-router-dom";
// import useAuthUser from "react-auth-kit/hooks/useAuthUser";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// dayjs.extend(customParseFormat);

// function ListConsumables() {
//   const [consumableList, setConsumableList] = useState([]);
//   const [filteredConsumables, setFilteredGases] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [searchCas, setSearchCas] = useState("");
//   const [showModal, setShowModal] = useState(false); // 🔹 Modal state
//   const [selectedGasId, setSelectedGasId] = useState(null); // 🔹 For storing the gas to delete



//   useEffect(() => {
//     getAllConsumables();
//   }, []);

//   const auth = useAuthUser();
//   const navigate = useNavigate();

//   let getAllConsumables = async () => {
//     try {
//       setLoading(true);
//       let response = await axiosInstance.get("/getAllConsumables");
//       console.log(response)
//       if (response.data) {
//         setConsumableList(response.data);
//         setFilteredGases(response.data);
//       } else {
//         setConsumableList([]);
//         setFilteredGases([]);
//       }
//       setLoading(false);
//     } catch (error) {
//       console.log(error.message);
//       setConsumableList([]);
//       setFilteredGases([]);
//       setLoading(false);
//     }
//   };


//   const paginationModel = { page: 0, pageSize: 3 };

//   const detailPage = (gasId) => {
//     navigate(`/gasDetails/${gasId}`);
//   };

//   // 🔹 When delete button is clicked
//   const handleDeleteClick = (gasId) => {
//     setSelectedGasId(gasId);
//     setShowModal(true);
//   };

//   // 🔹 Confirm actual deletion
//   const confirmDelete = async () => {
//     try {
//       setLoading(true);
//       await axiosInstance.delete(`/delete-gas/${selectedGasId}`);
//       getAllConsumables();
//     } catch (error) {
//       console.error("Error deleting chemical:", error.message);
//       toast.error("Failed to delete gas");
//     } finally {
//       setLoading(false);
//       setShowModal(false);
//       setSelectedGasId(null);
//     }
//   };

//   // 🔹 Cancel deletion
//   const cancelDelete = () => {
//     setShowModal(false);
//     setSelectedGasId(null);
//   };

//      const baseUrl = axiosInstance.defaults.baseURL;

//      console.log(filteredConsumables)

//   return (
//     <>
//       <ToastContainer position="top-right" />
//       <h4 className="text-white m-4">List Of Consumables</h4>
//       <hr className="text-white" />

//       {!filteredConsumables || filteredConsumables.length === 0 ? (
//         <h4 className="text-white m-3">
//           No consumables to show <PiSmileySadThin />{" "}
//         </h4>
//       ) : (
//         <Paper sx={{ height: "80%", width: "60%", margin: "auto" }}>
//           <DataGrid
//             rows={filteredConsumables?.map((singleConsumable, i) => {
//               return {
//                 id: i,
//                 consumable_name: singleConsumable.consumable_name,
//                 consumable_location: singleConsumable.consumable_location,
//                 consumables_vender_name: singleConsumable.consumables_vender_name,
//                 consumables_id: singleConsumable.consumables_id,
//                 delivery_date: new Date(singleConsumable.created_at).toLocaleDateString(),
//                 consumable_bill_path : singleConsumable.picture_location
//               };
//             })}
//             columns={[
//               { field: "consumable_name", headerName: "Consumable name", width: 140 },
//               { field: "consumable_location", headerName: "consumable location", width: 250 },
//               { field: "consumables_vender_name", headerName: "Vendor name", width: 200 },
//               { field: "delivery_date", headerName: "Delivered on", width: 100 },
//               {
//                 field: "Recept",
//                 headerName: "Recept",
//                 width: 110,
//                 renderCell: (params) => (
//                     <Link to={`${baseUrl}/${params.row.consumable_bill_path?.replace(/\\/g, '/')}`} target="__blank"> View recept</Link>
//                 ),
//               },
//               {
//                 field: "action",
//                 headerName: "Action",
//                 width: 110,
//                 renderCell: (params) => (

                  
//                    auth.userRole ==='1' && <Button
//                     style={{ margin: "5px" }}
//                     onClick={() => handleDeleteClick(params.row.gas_id)} 
//                     variant="danger"
//                   >
//                     Delete
//                   </Button>
//                 ),
//               },
//             ]}
//             initialState={{ pagination: { paginationModel } }}
//             pageSizeOptions={[5, 10]}
//             checkboxSelection={false}
//             sx={{ border: 2 }}
//           />
//         </Paper>
//       )}

//       {/* 🔹 Confirmation Modal */}
//       <Modal show={showModal} onHide={cancelDelete} centered>
//         <Modal.Header closeButton>
//           <Modal.Title>Are you sure?</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>This action will permanently delete the selected gas.</Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={cancelDelete}>
//             Cancel
//           </Button>
//           <Button variant="danger" onClick={confirmDelete}>
//             Yes
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </>
//   );
// }

// export default ListConsumables;
import React, { useState, useEffect } from "react";
import { axiosInstance } from "../../Utility/urlInstance";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { PiSmileySadThin } from "react-icons/pi";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { Link, useNavigate } from "react-router-dom";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

dayjs.extend(customParseFormat);

function ListConsumables() {
  const [consumableList, setConsumableList] = useState([]);
  const [filteredConsumables, setFilteredGases] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchCas, setSearchCas] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedGasId, setSelectedGasId] = useState(null);

  const auth = useAuthUser();
  const navigate = useNavigate();
  const baseUrl = axiosInstance.defaults.baseURL;

  useEffect(() => {
    getAllConsumables();
  }, []);

  const getAllConsumables = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get("/getAllConsumables");
      if (response.data) {
        setConsumableList(response.data);
        setFilteredGases(response.data);
      } else {
        setConsumableList([]);
        setFilteredGases([]);
      }
      setLoading(false);
    } catch (error) {
      console.error(error.message);
      setConsumableList([]);
      setFilteredGases([]);
      setLoading(false);
    }
  };

  const handleSearch = (query) => {
    const filtered = consumableList.filter((item) =>
      item.consumable_name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredGases(filtered);
  };

  const paginationModel = { page: 0, pageSize: 10 };

  const detailPage = (gasId) => {
    navigate(`/gasDetails/${gasId}`);
  };

  const handleDeleteClick = (gasId) => {
    setSelectedGasId(gasId);
    setShowModal(true);
  };

  const confirmDelete = async () => {
    try {
      setLoading(true);
      await axiosInstance.delete(`/delete-consumables/${selectedGasId}`);
      getAllConsumables();
    } catch (error) {
      console.log(error)
      console.error("Error deleting chemical:", error.message);
      toast.error("Failed to delete consumable item");
    } finally {
      setLoading(false);
      setShowModal(false);
      setSelectedGasId(null);
    }
  };

  const cancelDelete = () => {
    setShowModal(false);
    setSelectedGasId(null);
  };

  return (
    <>
      <ToastContainer position="top-right" />
      <h4 className="text-white m-4">List Of Consumables</h4>
      <hr className="text-white" />

      {/* 🔍 Search Input */}
      <div className="d-flex justify-content-center mb-3">
        <input
          type="text"
          className="form-control w-25"
          placeholder="Search by Consumable Name..."
          value={searchCas}
          onChange={(e) => {
            setSearchCas(e.target.value);
            handleSearch(e.target.value);
          }}
        />
      </div>

      {/* ❌ No Results */}
      {filteredConsumables.length === 0 && consumableList.length > 0 ? (
        <h5 className="text-white text-center">No matching consumables found.</h5>
      ) : null}

      {/* 📋 Data Grid */}
      {!filteredConsumables || filteredConsumables.length === 0 ? (
        <h4 className="text-white m-3">
          No consumables to show <PiSmileySadThin />
        </h4>
      ) : (
        <Paper sx={{ height: "80%", width: "70%", margin: "auto" }}>
          <DataGrid
            rows={filteredConsumables.map((singleConsumable, i) => (
              {
              id: i,
              consumable_name: singleConsumable.consumable_name,
              consumable_location: singleConsumable.consumable_location,
              consumables_vender_name: singleConsumable.consumables_vender_name,
              consumables_id: singleConsumable.consumables_id,
              delivery_date: new Date(singleConsumable.created_at).toLocaleDateString(),
              consumable_bill_path: singleConsumable.picture_location,
              consumable_id: singleConsumable.consumables_id,
            }
          
          ))}
            columns={[
              { field: "consumable_name", headerName: "Consumable name", width: 140 },
              { field: "consumable_location", headerName: "Consumable location", width: 250 },
              { field: "consumables_vender_name", headerName: "Vendor name", width: 200 },
              { field: "delivery_date", headerName: "Delivered on", width: 100 },
              {
                field: "Recept",
                headerName: "Recept",
                width: 110,
                renderCell: (params) => (
                  <Link
                    to={`${baseUrl}/${params.row.consumable_bill_path?.replace(/\\/g, "/")}`}
                    target="__blank"
                  >
                    View recept
                  </Link>
                ),
              },
              {
                field: "action",
                headerName: "Action",
                width: 110,
                renderCell: (params) =>
                  auth.userRole === "1" && (
                    <Button
                      style={{ margin: "5px" }}
                      onClick={() => handleDeleteClick(params.row.consumable_id)}
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

      {/* 🗑️ Delete Confirmation Modal */}
      <Modal show={showModal} onHide={cancelDelete} centered>
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
      </Modal>
    </>
  );
}

export default ListConsumables;
