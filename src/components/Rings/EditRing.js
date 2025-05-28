// src/components/Rings/EditRing.jsx
import RingForm from '../../components/Rings/RingListAdmin/RingForm';
import axios from '../../AxiosConfig';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function EditRing() {
  const { id } = useParams();
  const [ringData, setRingData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const prePopulateData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/rings/${id}`);
        setRingData(response.data);

        console.log('PrePopulated data');
      } catch (error) {
        console.error('Klaida prepopulating žiedą:', error);
      }
    };

    prePopulateData();
  }, [id]);

const handleEdit = async (ringData,images) => {
  try {
    // Update ring data (JSON)
    await axios.put(`http://localhost:8080/rings/${id}`, ringData)

    // upload images
    if(images.length > 0) {
      const formData = new FormData();
      images.forEach(file => formData.append('file',file));
      await axios.post(`http://localhost:8080/images/${id}`, formData, {
        headers: {"Content-Type" : "multipart/form-data"},
      });
    }
    console.log('Žiedas sėkmingai atnaujintas');
    alert("Žiedas sėkmingai atnaujintas");
    navigate("/rings");

  } catch (error) {
    console.error('Klaida redaguojant žiedą:', error);
  }
};

  return <RingForm isEdit={true} onSubmit={handleEdit} initialData={ringData} />;
}

export default EditRing;