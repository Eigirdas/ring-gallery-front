import RingForm from './RingForm';
import ringService from '../../services/admin.ring.service'
import { useNavigate } from 'react-router-dom';

function AddRing() {
  const navigate = useNavigate();

  const handleAdd = async (ringData, images) => {
    try {
      console.log("Creating ring for userId:", ringData.userId);
      const response = await ringService.createRing(ringData.userId, ringData);
      console.log('createRing response:', response);
      
      const newRingId = response?.data?.id ?? response?.id;
      
      if (!newRingId) {
        throw new Error('No ID returned from backend');
      }

      if (images.length > 0) {
        await ringService.uploadRingImages(newRingId, images);
      }

      alert("Ring added successfully");
      navigate("/admin/rings");
    } catch (error) {
      console.error('Klaida pridedant žiedą:', error);
      alert("could not add ring");
    }
  };

  return <RingForm isEdit={false} onSubmit={handleAdd} />;
}

export default AddRing;
