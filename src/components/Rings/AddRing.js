import RingForm from '../../components/Rings/RingListAdmin/RingForm';
import axios from '../../AxiosConfig';
import { useNavigate } from 'react-router-dom';

function AddRing() {
  const navigate = useNavigate();

  const handleAdd = async (ringData, images) => {
    try {
      // prideda nauja zieda per JSON
      const response = await axios.post(`http://localhost:8080/rings/${ringData.userId}`, ringData); // postina i /rings pagal selected useri @Post
      const newRing = response.data; // sudeda naujo ziedo info i newRing
      const newRingId = newRing.id; // paima is newRing ID

      // Nuotrauku pridejimas
      if (images.length > 0) {
        const formData = new FormData();
        images.forEach((file) => formData.append("file", file));

        await axios.post(`http://localhost:8080/images/${newRingId}`, formData, { // prideda prie newRing id nuotraukas
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      }

      alert("Žiedas sėkmingai pridėtas");
      navigate("/rings");
    } catch (error) {
      console.error('Klaida pridedant žiedą:', error);
      alert("Nepavyko pridėti žiedo");
    }
  };

  return <RingForm isEdit={false} onSubmit={handleAdd} />;
}

export default AddRing;