import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/admin/users";

const getAllUsers = () => axios.get(API_URL, { headers: authHeader() });

const getUserById = (id) => axios.get(`${API_URL}/${id}`, { headers: authHeader() });

const registerUser = (data) =>
  axios.post(`${API_URL}/auth/register`, data, { headers: authHeader() });

const updateUser = (id, data) =>
  axios.put(`${API_URL}/${id}`, data, { headers: authHeader() });

const deleteUser = (id) =>
  axios.delete(`${API_URL}/${id}`, { headers: authHeader() });

export default {
  getAllUsers,
  getUserById,
  registerUser,
  updateUser,
  deleteUser,
};