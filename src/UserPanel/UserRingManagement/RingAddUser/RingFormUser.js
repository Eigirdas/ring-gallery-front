import { useState } from "react";

function RingForm({ onSubmit }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);
  const [metalType, setMetalType] = useState("");
  const [size, setSize] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const ringData = { name, description, metalType, size };

    // logs for debugging
    console.log("Sending ring data:", ringData);
    console.log("Sending images:", images);

    try {
      await onSubmit(ringData, images);
      // Reset form fields
      setName("");
      setDescription("");
      setMetalType("");
      setSize("");
      setImages([]);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="ring-form">
      <h2>Add ring</h2>
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

        <label htmlFor="ring-images">Ring photos</label>
        <input
          id="ring-images"
          type="file"
          accept="image/*"
          multiple
          onChange={(e) => setImages(Array.from(e.target.files))}
          required
        />
      </div>

      <button type="submit" className="submit-button">Add</button>
    </form>
  );
}

export default RingForm;
