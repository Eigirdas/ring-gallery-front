import EditRingForm from './EditRingForm';
import axios from '../../../AxiosConfig';
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import '../../../components/admin/rings/EditRing.css';

function EditRingUser() {
  const { id } = useParams();
  const [ringData, setRingData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRingData = async () => {
      try {
        const response = await axios.get(`/rings/${id}`);
        setRingData(response.data);
      } catch (error) {
        console.error('Error fetching ring details:', error);
      }
    };
    fetchRingData();
  }, [id]);

    const handleEdit = async (updatedData, newImages) => {
    try {
        const formData = new FormData();

        // Append ring JSON as a Blob, named "ring"
        formData.append(
        "ring",
        new Blob([JSON.stringify(updatedData)], { type: "application/json" })
        );

        // Append all new images, named "images"
        newImages.forEach((file) => formData.append("images", file));

        // Send multipart/form-data PUT request to update ring and images together
        await axios.put(`/user/rings/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        });

        alert("Ring edited successfully");
        navigate("/rings");
    } catch (error) {
        console.error("Error editing ring:", error);
    }
    };

  return (
    <EditRingForm isEdit={true} onSubmit={handleEdit} initialData={ringData} />
  );
}

export default EditRingUser;
