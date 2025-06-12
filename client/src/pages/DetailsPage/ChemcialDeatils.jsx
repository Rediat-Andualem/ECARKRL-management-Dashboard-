import  React ,{useState,useEffect} from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import Typography from '@mui/joy/Typography';
import ChemicalCard from '../../components/ChemicalCard/ChemicalCard'
import { axiosInstance } from '../../Utility/urlInstance';
import {useParams} from 'react-router-dom'

export default function FAQCard() {

const {chemicalId} = useParams()
const [chemicalList, setChemicalList] = useState([]);
  const [loading, setLoading] = useState(false);

  // Define the function before useEffect
  async function getAllChemicals() {
    try {
      setLoading(true);
      const response = await axiosInstance.get(`/singleChemical/${chemicalId}`);   
      if (response.data) {
        setChemicalList(response.data);
      } else {
        setChemicalList([]);
      }
    } catch (error) {
      console.error('Error fetching chemicals:', error.message);
      setChemicalList([]);
    } finally {
      setLoading(false);
    }
  }

  React.useEffect(() => {
    getAllChemicals();
  }, []);




  return (
  
 <ChemicalCard chemical={chemicalList}/>
  );
}
