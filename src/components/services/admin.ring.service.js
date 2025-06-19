import axios from "../../AxiosConfig";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/admin/rings";
const IMAGE_URL = "http://localhost:8080/images";

const getAllRings = () => axios.get(API_URL, { headers: authHeader() });

const getRingById = (id) => axios.get(`${API_URL}/${id}`, { headers: authHeader() });

const createRing = async (userId, data) => {
  const headers = authHeader();
  const response = await axios.post(`${API_URL}/${userId}`, data, { headers });
  console.log('Axios post response:', response);
  return response;
};

const updateRing = (id, data) =>
  axios.put(`${API_URL}/${id}`, data, { headers: authHeader() });

const deleteRing = (id) =>
  axios.delete(`${API_URL}/${id}`, { headers: authHeader() });

const uploadRingImages = (ringId, images) => {
  const formData = new FormData();
  images.forEach(file => formData.append("file", file));
  return axios.post(`${IMAGE_URL}/${ringId}`, formData, {
    headers: {
      ...authHeader(),
      "Content-Type": "multipart/form-data",
    },
  });
};


export default {
  getAllRings,
  getRingById,
  createRing,
  updateRing,
  deleteRing,
  uploadRingImages,
};