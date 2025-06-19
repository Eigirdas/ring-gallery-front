import RingFormUser from './RingFormUser';
import axios from '../../../AxiosConfig';
import { useNavigate } from 'react-router-dom';

function AddRingUser() {
  const navigate = useNavigate();
  const handleAdd = async (ringData, images) => {
    try {
      const userData = JSON.parse(localStorage.getItem("user"));
      const token = userData?.jwt;

      if (!token) {
        alert("User not logged in");
        return;
      }

      console.log("Sending ring data:", ringData);

      // add ring
      const response = await axios.post(`http://localhost:8080/user/rings`, ringData, {
        headers: { Authorization: `Bearer ${token}` }
      });

      const newRing = response.data;
      const newRingId = newRing.id;

      // add images
      if (images.length > 0) {
        const formData = new FormData();
        images.forEach((file) => formData.append("file", file));

        try {
          await axios.post(`http://localhost:8080/images/${newRingId}`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: `Bearer ${token}`,
            },
          });
        } catch (imageError) {
          console.error('Error adding photos:', imageError);
          alert("Ring added, but could not add photos");
          navigate("/user/rings");
          return;
        }
      }

      alert("Ring added");
      navigate("/rings");
    } catch (error) {
      console.error('Error adding ring:', error);
      alert("Could not add ring");
    }
  };
  return <RingFormUser isEdit={false} onSubmit={handleAdd} />;
}

export default AddRingUser;
