import React, { useState, useEffect } from "react";
import { axiosInstance } from "../../Utility/urlInstance";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import Button from "react-bootstrap/Button";
import { PiSmileySadThin } from "react-icons/pi";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { useNavigate } from "react-router-dom";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

dayjs.extend(customParseFormat);

const subscriptMap = {
  "0": "₀",
  "1": "₁",
  "2": "₂",
  "3": "₃",
  "4": "₄",
  "5": "₅",
  "6": "₆",
  "7": "₇",
  "8": "₈",
  "9": "₉",
};

function ListChemicals() {
  const [chemicalList, setChemicalList] = useState([]);
  const [filteredChemicals, setFilteredChemicals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchCas, setSearchCas] = useState("");

  useEffect(() => {
    getASllChemical();
  }, []);

  const auth = useAuthUser();
  const navigate = useNavigate();
    const authHeader = useAuthHeader();

  let getASllChemical = async () => {
    try {
      setLoading(true);
      let response = await axiosInstance.get("/getAllChemicals");
      if (response.data) {
        setChemicalList(response.data);
        setFilteredChemicals(response.data);
      } else {
        setChemicalList([]);
        setFilteredChemicals([]);
      }
      setLoading(false);
    } catch (error) {
      console.log(error.message);
      setChemicalList([]);
      setFilteredChemicals([]);
      setLoading(false);
    }
  };

  const paginationModel = { page: 0, pageSize: 10};
  const detailPage = (chemicalId) => {
    navigate(`/chemicalDetails/${chemicalId}`);
    // navigate(`/chemicalDetails/${id}`, { state: { from: "/dashboard/listChemicals" } });
  };

  function changeFormula(formula) {
    return (
      formula?.replace(/\d/g, (digit) => subscriptMap[digit]) || ""
    );
  }

  // Handler for search input change
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchCas(value);

    // Validate input: only numbers and hyphens allowed
    const regex = /^[0-9-]*$/;
    if (!regex.test(value)) {
      toast.error("CAS number can contain only numbers and hyphens (-)");
      return;
    }

    // Filter chemical list by CAS number (case-insensitive)
    if (value.trim() === "") {
      // If search box is empty, show all
      setFilteredChemicals(chemicalList);
    } else {
      const filtered = chemicalList.filter((chem) =>
        chem.chemical_cas_number.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredChemicals(filtered);
    }
  };

  return (
    <>
      <ToastContainer position="top-right" />
      <h4 className="text-white m-4">List Of Chemicals</h4>
      <hr className="text-white" />

      {/* Search box aligned to right */}
      <div className="" style={{ display: "flex", justifyContent: "flex-start", margin: "0 20px 10px 45px" }}>
        <input
          type="text"
          placeholder="Search by CAS number"
          value={searchCas}
          onChange={handleSearchChange}
          style={{
            padding: "6px 12px",
            borderRadius: "4px",
            border: "1px solid #ccc",
            width: "250px",
          }}
        />
      </div>

      {!filteredChemicals || filteredChemicals.length === 0 ? (
        <h4 className="text-white m-3">
          No Chemical to show <PiSmileySadThin />{" "}
        </h4>
      ) : (
        <Paper sx={{ height: "80%", width: "95%", margin: "auto" }}>
          <DataGrid
            rows={filteredChemicals?.map((singleChemical, i) => {
              return {
                id: i,
                chemical_name: singleChemical.chemical_name,
                chemical_formula: changeFormula(singleChemical.chemical_formula),
                chemical_cas_number: singleChemical.chemical_cas_number,
                chemical_location: singleChemical.chemical_location,
                chemical_manufacturer: singleChemical.chemical_manufacturer,
                chemical_ordered_by: singleChemical.chemical_ordered_by,
                chemical_vender_name: singleChemical.chemical_vender_name,
                chemical_purity: singleChemical.chemical_purity,
                chemical_expire_date: singleChemical.chemical_expire_date,
                chemical_id: singleChemical.chemical_id,
              };
            })}
            columns={[
              { field: "chemical_name", headerName: "Chemical Name", width: 140 },
              { field: "chemical_formula", headerName: "Chemical Formula", width: 200 },
              { field: "chemical_cas_number", headerName: "CAS Number", width: 200 },
              { field: "chemical_location", headerName: "Location", width: 120 },
              { field: "chemical_manufacturer", headerName: "Manufacturer", width: 100 },
              { field: "chemical_ordered_by", headerName: "Ordered By", width: 100 },
              { field: "chemical_vender_name", headerName: "Vender Name", width: 100 },
              { field: "chemical_purity", headerName: "Purity", width: 100 },
              {
                field: "chemical_expire_date",
                headerName: "Expire Date",
                width: 100,
              },
              {
                field: "action",
                headerName: "Action",
                width: 110,
                renderCell: (params) => (
                  <Button
                    style={{ margin: "5px" }}
                    onClick={() => detailPage(params.row.chemical_id)}
                    variant="success"
                  >
                    Full Detail
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
    </>
  );
}

export default ListChemicals;
