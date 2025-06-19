import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import UserForm from "./UserForm.js";
import axios from "../../../AxiosConfig.js";

function EditUser(){
    const {id} = useParams();
    const [userData,setUserData] = useState(null);
    const navigate = useNavigate();

    useEffect( () => {
        const prePopulateData = async () => {
            try{
                const response = await axios.get(`http://localhost:8080/admin/users/${id}`);
                console.log("Fetched user data: " , response.data);
                setUserData(response.data);
            } catch(error){
                console.error("Error prepopulating user:", error)
            }
        };
        prePopulateData();
    },[id]); // update

    const handleEdit = async (userData) => {
        try{
            // Update User data
            await axios.put(`http://localhost:8080/admin/users/${id}`, userData)
            console.log("User edit complete")
            alert("Successfully edited user!")
            navigate("/admin/users");
        } catch (error){
            console.error("Error editing user",error)
            alert("Error editing user" , error)
        }
    };
    return <UserForm isEdit={true} onSubmit={handleEdit} initialData={userData} />;


}

export default EditUser;