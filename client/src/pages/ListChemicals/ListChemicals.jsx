
import React,{ useState, useEffect } from 'react';
import {axiosInstance} from '../../Utility/urlInstance'
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import Button from "react-bootstrap/Button";
import { PiSmileySadThin } from "react-icons/pi";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);
function ListChemicals() {
const [chemicalList, setChemicalList]= useState([])
const [loading, setLoading]= useState(false)
useEffect(()=>{
 getASllChemical()
},[])

let getASllChemical = async ()=>{
  try {
       setLoading(true)
       let response = await axiosInstance.get('/getAllChemicals')
       if(response.data){
        setChemicalList(response.data)
       }else{
         setChemicalList([])
       }
       setLoading(false)
     } catch (error) {
         console.log(error.message)
         setChemicalList(false)
     }
}
 const paginationModel = { page: 0, pageSize: 3 };
  return (
    <>
    <h4 className='text-white m-3'>List Of Chemicals</h4>
    <hr className='text-white' />
  {!chemicalList || chemicalList.length === 0 ? (
          <h4>
            No Chemical to show <PiSmileySadThin />{" "}
          </h4>
        ) : (
      
          <Paper sx={{ height: "90%", width: "100%", margin: "2%" }}>
            <DataGrid
              rows={chemicalList?.map((singleChemical, i) => {        
                return {
                  id: i,
                  chemical_name: singleChemical.chemical_name,
                  chemical_formula: singleChemical.chemical_formula,
                  chemical_cas_number: singleChemical.chemical_cas_number,
                  chemical_location: singleChemical.chemical_location,
                  chemical_manufacturer: singleChemical.chemical_manufacturer,
                  chemical_ordered_by: singleChemical.chemical_ordered_by,
                  chemical_vender_name: singleChemical.chemical_vender_name,
                  chemical_purity: singleChemical.chemical_purity,
                  chemical_state: singleChemical.chemical_state,
                  chemical_packaging: singleChemical.chemical_packaging,
                  chemical_amount: `${singleChemical.chemical_amount} ${singleChemical.chemical_unit_of_measurement}`,
                  chemical_expire_date: singleChemical.chemical_expire_date,
                  chemical_delivered_date: dayjs(singleChemical.createdAt).format(
                  "DD/MM/YYYY"
                ),
                  chemical_id: singleChemical.chemical_id
                };
              })}
              columns={[
                {
                  field: "chemical_name",
                  headerName: "Chemical Name",
                  width: 140,
                },
                {
                  field: "chemical_formula",
                  headerName: "Chemical Formula",
                  width: 200,
                },
                {
                  field: "chemical_cas_number",
                  headerName: "CAS Number",
                  width: 200,
                },
                {
                  field: "chemical_location",
                  headerName: "Location",
                  width: 120,
                },
                {
                  field: "chemical_manufacturer",
                  headerName: "Manufacturer",
                  width: 100,
                },
                {
                  field: "chemical_ordered_by",
                  headerName: "Ordered By",
                  width: 100,
                },
                {
                  field: "chemical_vender_name",
                  headerName: "Vender Name",
                  width: 100,
                },
                {
                  field: "chemical_purity",
                  headerName: "Purity",
                  width: 100,
                },
                {
                  field: "chemical_state",
                  headerName: "State",
                  width: 100,
                },
                {
                  field: "chemical_packaging",
                  headerName: "State",
                  width: 100,
                },
                {
                  field: "chemical_amount",
                  headerName: "State",
                  width: 100,
                },
                {
                  field: "chemical_expire_date",
                  headerName: "Expire Date",
                  width: 100,
                },
                {
                  field: "chemical_delivered_date",
                  headerName: "Delivery Date",
                  width: 100,
                },
                {
                  field: "action",
                  headerName: "Action",
                  width: 100,
                  renderCell: (params) => (
                    <Button
                      style={{ margin: "5px" }}
                      onClick={() => deleteProject(params.row.projectId)}
                      variant="danger"
                    >
                      Delete
                    </Button>
                  ),
                },
                // {
                //   field: "showhide",
                //   headerName: "Show / Hide project for students",
                //   width: 170,
                //   renderCell: (params) => (
                //     <Button
                //       style={{ margin: "5px" }}
                //       onClick={() =>
                //         toggleShowHideProject(
                //           params.row.projectId,
                //           params.row.ProjectShowStatus
                //         )
                //       }
                //       variant={
                //         params.row.ProjectShowStatus ? "danger" : "success"
                //       } // red if shown (means clicking hides), green if hidden (means clicking shows)
                //     >
                //       {params.row.ProjectShowStatus ? "Hide" : "Show"}
                //     </Button>
                //   ),
                // },
                // {
                //   field: "updateStatus",
                //   headerName: "Allow link updating",
                //   width: 170,
                //   renderCell: (params) => (
                //     <Button
                //       style={{ margin: "5px" }}
                //       onClick={() =>
                //         toggleAllowLinkUpdate(
                //           params.row.projectId,
                //           params.row.allowLinkUpdate
                //         )
                //       }
                //       variant={
                //         params.row.allowLinkUpdate ? "danger" : "success"
                //       } // red means currently allowed, button says "Prevent"
                //     >
                //       {params.row.allowLinkUpdate ? "Prevent" : "Allow"}
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


    </>
  )
}

export default ListChemicals