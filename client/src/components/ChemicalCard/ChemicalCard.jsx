import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import Box from '@mui/joy/Box';
import { Button, Modal } from 'react-bootstrap';  
import { Link, useNavigate } from 'react-router-dom';
import { axiosInstance } from '../../Utility/urlInstance';
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const subscriptMap = {
  '0': '₀',
  '1': '₁',
  '2': '₂',
  '3': '₃',
  '4': '₄',
  '5': '₅',
  '6': '₆',
  '7': '₇',
  '8': '₈',
  '9': '₉',
};



function changeFormula(formula) {
  return formula?.replace(/\d/g, digit => subscriptMap[digit]) || '';
}

export default function ChemicalDetailCard({ chemical, onDelete }) {
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false); 

  const navigate = useNavigate();
const auth = useAuthUser()

  const {
    chemical_name,
    chemical_formula,
    chemical_cas_number,
    chemical_purity,
    chemical_state,
    chemical_amount,
    chemical_unit_of_measurement,
    chemical_manufacturer,
    chemical_location,
    chemical_packaging,
    chemical_priority,
    chemical_expire_date,
    chemical_ordered_by,
    chemical_vender_name,
    chemical_delivered_date,
    chemical_bill_path,
    chemical_id
  } = chemical;

  const formattedFormula = changeFormula(chemical_formula);
  const baseUrl = axiosInstance.defaults.baseURL;
  const billUrl = `${baseUrl}/${chemical_bill_path?.replace(/\\/g, '/')}`;


  const deleteChemicalImage = async () => {
    try {
      setLoading(true);
      await axiosInstance.delete(`/delete-chemical/${chemical_id}`);
      onDelete?.(chemical_id);
      navigate('/listChemicals');
    } catch (error) {
      console.error('Error deleting chemical:', error.message);
    } finally {
      setLoading(false);
      setShowModal(false); 
    }
  };

  return (
    <>
      <Card
        orientation="horizontal"
        variant="outlined"
        sx={{ width: '40%', display: 'flex', gap: 2, p: 2, margin: "5% auto" }}
      >
        {/* Chemical Info */}
        <CardContent
          sx={{
            margin: '40px auto',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-around',
            height: '100%',
          }}
        >
          <Typography level="title-lg"><b>Name of chemical : </b>{chemical_name}</Typography>
          <Typography><b>Formula:</b> {formattedFormula}</Typography>
          <Typography><b>CAS #:</b> {chemical_cas_number}</Typography>
          <Typography><b>Purity:</b> {chemical_purity}%</Typography>
          <Typography><b>State:</b> {chemical_state}</Typography>
          <Typography><b>Amount:</b> {chemical_amount} {chemical_unit_of_measurement}</Typography>
          <Typography><b>Manufacturer: </b>{chemical_manufacturer}</Typography>
          <Typography><b>Location:</b> {chemical_location}</Typography>
          <Typography><b>Packaging:</b> {chemical_packaging}</Typography>
          <Typography><b>Priority:</b> {chemical_priority}</Typography>
          <Typography><b>Expires: </b>{chemical_expire_date}</Typography>
          <Typography><b>Ordered By:</b> {chemical_ordered_by}</Typography>
          <Typography><b>Vendor:</b> {chemical_vender_name}</Typography>
          <Typography><b>Delivered: </b>{new Date(chemical_delivered_date).toLocaleDateString()}</Typography>
          {chemical_bill_path && (
            <Typography>
              <Link to={billUrl} target='__blank' rel="noopener noreferrer">Click To View Bill</Link>
            </Typography>
          )}
          {
           auth.userRole ==='1' &&  <Button
            style={{ width: "150px", margin: "5px" }}
            variant="danger"
            onClick={() => setShowModal(true)}  
            disabled={loading}
          >
            {loading ? 'Deleting...' : 'Delete'}
          </Button>
          }
         
        </CardContent>
      </Card>

      {/* Confirmation Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this chemical?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={deleteChemicalImage} disabled={loading}>
            {loading ? 'Deleting...' : 'Yes'}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
