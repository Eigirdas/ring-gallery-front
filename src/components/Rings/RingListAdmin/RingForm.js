import { useEffect, useState } from "react";

function RingForm({ isEdit, onSubmit, initialData }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]); // Empty because we have one to many and post pictures seperatly
  const [metalType, setMetalType] = useState("");
  const [size, setSize] = useState("");
  const [userId, setUserId] = useState("");
  const [users, setUsers] = useState([]);

  // pre-populate form fields on edit
  useEffect(() => {
    fetchUsers();

    if (isEdit && initialData) {
      setName(initialData.name || "");
      setDescription(initialData.description || "");
      setMetalType(initialData.metalType || "");
      setSize(initialData.size || "");
      setUserId(initialData.userId || ""); 
      setImages([]);
    }
  }, [initialData, isEdit]);

  const fetchUsers = async () => {
    try {
      const res = await fetch("http://localhost:8080/users");
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      console.error("Klaida gaunant naudotojus", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const ringData = { name, description,metalType,size,userId};

    try {
      await onSubmit(ringData,images); // ring data as strings + images to parent
      if(!isEdit){
        setName("");
        setDescription("");
        setMetalType("");
        setSize("");
        setUserId("");
        setImages([]);
      }
    } catch (error) {
      console.error("Klaida pateikiant forma", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="ring-form">
      <h2>{isEdit ? "Redaguoti žiedą" : "Pridėti žiedą"}</h2>
      <div className="form-group">
        <label htmlFor="ring-name">Žiedo pavadinimas</label>
        <input
          id="ring-name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <label htmlFor="ring-description">Žiedo aprašymas</label>
        <input
          id="ring-description"
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />

        <label htmlFor="ring-metalType">Žiedo medžiaga</label>
        <input
          id="ring-metalType"
          type="text"
          value={metalType}
          onChange={(e) => setMetalType(e.target.value)}
          required
        />

        <label htmlFor="ring-size">Žiedo dydis</label>
        <input
          id="ring-size"
          type="text"
          value={size}
          onChange={(e) => setSize(e.target.value)}
          required
        />

        <label htmlFor="ring-images">Žiedo nuotraukos</label>
        <input
          id="ring-images"
          type="file"
          accept="image/*"
          multiple
          onChange={(e) => setImages(Array.from(e.target.files))}
          required={!isEdit}
        />

        <label>Pasirinkti naudotoją:</label>
        <select value={userId} onChange={(e) => setUserId(e.target.value)} required>
          <option value="">--Pasirinkti--</option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
      </div>
      <button type="submit" className="submit-button">
        {isEdit ? "Redaguoti" : "Pridėti"}
      </button>
    </form>
  );
}

export default RingForm;
