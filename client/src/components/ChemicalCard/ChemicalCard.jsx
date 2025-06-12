import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import Box from '@mui/joy/Box';
import { Button } from 'react-bootstrap';
import { Link,useNavigate} from 'react-router-dom';
import { axiosInstance } from '../../Utility/urlInstance';

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

  const navigate = useNavigate()

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

  const deleteChemicalImage = async (chemicalId) => {
    try {
      setLoading(true);
      await axiosInstance.get(`/delete-chemical/${chemicalId}`);
      onDelete?.(chemicalId); 
      navigate('/dashboard')
    } catch (error) {
      console.error('Error deleting chemical:', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card
      orientation="horizontal"
      variant="outlined"
      sx={{ width: '100%', display: 'flex', gap: 2, p: 2 }}
    >
      {/* Left: PDF Preview (optional) */}
      {/* <Box sx={{ width: '40%', minWidth: 200 }}>
        <Document file={billUrl} loading="Loading PDF...">
          <Page pageNumber={1} width={200} />
        </Document>
      </Box> */}

      {/* Right: Chemical Info */}
      <CardContent
        sx={{
          margin: '40px auto',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-around',
          height: '100%',
        }}
      >
        <Typography level="title-lg">{chemical_name}</Typography>
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
            <Link to={billUrl} target="_blank" rel="noopener noreferrer">Click To View Bill</Link>
          </Typography>
        )}
        <Button
          variant="danger"
          onClick={() => deleteChemicalImage(chemical_id)}
          disabled={loading}
        >
          {loading ? 'Deleting...' : 'Delete'}
        </Button>
      </CardContent>
    </Card>
  );
}
