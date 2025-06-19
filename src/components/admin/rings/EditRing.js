import RingForm from './RingForm';
import axios from '../../../AxiosConfig';
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';


function EditRing() {
  const { id } = useParams();
  const [ringData, setRingData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRing = async () => {
      try {
        const response = await axios.get(`/rings/${id}`);
        setRingData(response.data);
      } catch (error) {
        console.error('error fetching ring data:', error);
      }
    };
    fetchRing();
  }, [id]);

  const handleEdit = async (ringData, newImages) => {
    try {
      const formData = new FormData();

      // Append JSON blob with key 'ring' exactly as expected by backend
      formData.append(
        "ring",
        new Blob([JSON.stringify(ringData)], { type: "application/json" })
      );

      // Append image files with key 'images' (backend expects this name)
      newImages.forEach((file) => {
        formData.append("images", file);
      });

      // Send as multipart PUT request
      await axios.put(`/admin/rings/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Ring edited successfully");
      navigate("/rings");
    } catch (error) {
      console.error("Error editing ring as admin:", error);
    }
  };

  if (!ringData) return <div>Loading...</div>;

  return <RingForm isEdit={true} onSubmit={handleEdit} initialData={ringData} />;
}

export default EditRing;
