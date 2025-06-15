import React, { useState, useEffect } from "react";
import { axiosInstance } from "../../Utility/urlInstance";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { PiSmileySadThin } from "react-icons/pi";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";

dayjs.extend(customParseFormat);

function UserDisplay() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);

  const auth = useAuthUser();

  useEffect(() => {
    getAllUsers();
  }, []);

  const getAllUsers = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get("/getAllUsers");
      setUsers(response.data?.users || []);
    } catch (error) {
      console.error("Failed to fetch users:", error.message);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Updated with admin role check
  const handleDeleteClick = (userId, userRole) => {
    if (userRole === "1") {
      toast.warning("Admin users cannot be deleted.");
      return;
    }
    setSelectedUserId(userId);
    setShowModal(true);
  };

  const confirmDelete = async () => {
    if (!selectedUserId) return;

    try {
      setLoading(true);
      await axiosInstance.delete(`/deleteProfile/${selectedUserId}`);
      toast.success("User deleted successfully");
      await getAllUsers();
    } catch (error) {
      console.error("Error deleting user:", error.message);
      toast.error("Failed to delete user");
    } finally {
      setLoading(false);
      setShowModal(false);
      setSelectedUserId(null);
    }
  };

  const cancelDelete = () => {
    setShowModal(false);
    setSelectedUserId(null);
  };

  const paginationModel = { page: 0, pageSize: 3 };

  return (
    <>
      <ToastContainer position="top-right" />
      <h4 className="text-white m-4">List Of Users</h4>
      <hr className="text-white" />

      {!users || users.length === 0 ? (
        <h4 className="text-white m-3">
          No users to show <PiSmileySadThin />
        </h4>
      ) : (
        <Paper sx={{ height: "80%", width: "50%", margin: "auto" }}>
          <DataGrid
            rows={users.map((user, index) => ({
              id: index,
              user_first_name: user.user_first_name,
              user_last_name: user.user_last_name,
              user_email: user.user_email,
              user_id: user.user_id,
              user_role: user.user_role
            }))}
            columns={[
              { field: "user_first_name", headerName: "First name", width: 140 },
              { field: "user_last_name", headerName: "Last name", width: 200 },
              { field: "user_email", headerName: "Email", width: 200 },
              {
                field: "action",
                headerName: "Action",
                width: 110,
                renderCell: (params) =>
                  auth.userRole === "1" && (
                    <Button
                      style={{ margin: "5px" }}
                      onClick={() =>
                        handleDeleteClick(params.row.user_id, params.row.user_role)
                      }
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

      {/* Confirmation Modal */}
      <Modal show={showModal} onHide={cancelDelete} centered>
        <Modal.Header closeButton>
          <Modal.Title>Are you sure?</Modal.Title>
        </Modal.Header>
        <Modal.Body>This action will permanently delete the selected user.</Modal.Body>
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

export default UserDisplay;
