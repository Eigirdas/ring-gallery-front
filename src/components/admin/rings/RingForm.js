import { useEffect, useState } from "react";
import axios from "../../../AxiosConfig";

function RingForm({ isEdit, onSubmit, initialData }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [metalType, setMetalType] = useState("");
  const [size, setSize] = useState("");
  const [userId, setUserId] = useState("");

  // Images from backend that remain (edit mode)
  const [existingImages, setExistingImages] = useState([]); 

  // New images selected for upload (Files)
  const [newImages, setNewImages] = useState([]); 

  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("/admin/users");
        setUsers(res.data);
      } catch (err) {
        console.error("Error fetching users", err);
      }
    };

    fetchUsers();

    if (isEdit && initialData) {
      setName(initialData.name || "");
      setDescription(initialData.description || "");
      setMetalType(initialData.metalType || "");
      setSize(initialData.size || "");
      setUserId(initialData.userId || "");

      // Set existing images from initial data (array of URLs or paths)
      setExistingImages(initialData.images || []);

      // Clear new images on edit load
      setNewImages([]);
    } else {
      // If adding new ring, clear all fields
      setExistingImages([]);
      setNewImages([]);
    }
  }, [initialData, isEdit]);

  // Handle selecting new images
  const handleNewImagesChange = (e) => {
    const files = Array.from(e.target.files);
    setNewImages((prev) => [...prev, ...files]);
  };

  // Remove existing image by index
  const handleRemoveExistingImage = (index) => {
    setExistingImages((prev) => prev.filter((_, i) => i !== index));
  };

  // Remove new image by index
  const handleRemoveNewImage = (index) => {
    setNewImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    
    const ringData = {
      name,
      description,
      metalType,
      size,
      userId,
      remainingImages: existingImages, // for keeping/ deleting images
    };

    try {
      await onSubmit(ringData, newImages);
      if (!isEdit) {
        setName("");
        setDescription("");
        setMetalType("");
        setSize("");
        setUserId("");
        setExistingImages([]);
        setNewImages([]);
      }
    } catch (error) {
      console.error("Error submiting form", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="ring-form">
      <h2>{isEdit ? "Edit ring" : "Add ring"}</h2>
      <div className="form-group">
        <label htmlFor="ring-name">Ring name</label>
        <input
          id="ring-name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <label htmlFor="ring-description">Ring description</label>
        <input
          id="ring-description"
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />

        <label htmlFor="ring-metalType">Metal type</label>
        <input
          id="ring-metalType"
          type="text"
          value={metalType}
          onChange={(e) => setMetalType(e.target.value)}
          required
        />

        <label htmlFor="ring-size">Ring size</label>
        <input
          id="ring-size"
          type="text"
          value={size}
          onChange={(e) => setSize(e.target.value)}
          required
        />

        {/* Existing images preview with remove buttons (edit mode only) */}
        {isEdit && existingImages.length > 0 && (
          <>
            <label>Current photos:</label>
            <div className="image-preview">
              {existingImages.map((url, index) => (
                <div key={index} className="image-thumb">
                  <img
                    src={`http://localhost:8080${url}`}
                    alt={`existing-${index}`}
                    style={{ width: "140px", height: "140px", objectFit: "cover" }}
                  />
                  <button
                    type="button"
                    className="remove-btn"
                    onClick={() => handleRemoveExistingImage(index)}
                    aria-label="Delete photo"
                  >
                    &times;
                  </button>
                </div>
              ))}
            </div>
          </>
        )}

        {/* New images upload */}
        <label htmlFor="ring-images">Add new images</label>
        <input
          id="ring-images"
          type="file"
          accept="image/*"
          multiple
          onChange={handleNewImagesChange}
          required={!isEdit && existingImages.length === 0}
        />

        {/* New images preview with remove buttons */}
        {newImages.length > 0 && (
          <div className="image-preview">
            {newImages.map((file, index) => (
              <div key={index} className="image-thumb">
                <img
                  src={URL.createObjectURL(file)}
                  alt={`new-${index}`}
                  style={{ width: "140px", height: "140px", objectFit: "cover" }}
                />
                <button
                  type="button"
                  className="remove-btn"
                  onClick={() => handleRemoveNewImage(index)}
                  aria-label="Remove new photo"
                >
                  &times;
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Dummy user checkbox */}
        <label>
          <input
            type="checkbox"
            checked={userId === "1"} // dummy user ID is "1"
            onChange={(e) => {
              if (e.target.checked) {
                setUserId("1");
              } else {
                setUserId("");
              }
            }}
          />
          No user (add to dummy user)
        </label>

        <label>chose user:</label>
        <select
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          required
          disabled={userId === "1"}
        >
          <option value="">--Options--</option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
      </div>

      <button type="submit" className="submit-button">
        {isEdit ? "Edit" : "Add"}
      </button>
    </form>
  );
}

export default RingForm;
