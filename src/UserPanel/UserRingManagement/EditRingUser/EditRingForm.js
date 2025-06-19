import { useEffect, useState } from "react";

const backendUrl = process.env.REACT_APP_BACKEND_URL || "http://localhost:8080";

function EditRingForm({ isEdit, onSubmit, initialData }) {
  const [formFields, setFormFields] = useState({
    name: '',
    description: '',
    metalType: '',
    size: '',
  });

  const [existingImages, setExistingImages] = useState([]);
  const [newImages, setNewImages] = useState([]);

  useEffect(() => {
    if (isEdit && initialData) {
      setFormFields({
        name: initialData.name || '',
        description: initialData.description || '',
        metalType: initialData.metalType || '',
        size: initialData.size || '',
      });
      setExistingImages(initialData.images || []);
      setNewImages([]);
    }
  }, [initialData, isEdit]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormFields((prev) => ({ ...prev, [name]: value }));
  };

  const handleNewImageChange = (e) => {
    const files = Array.from(e.target.files);
    setNewImages((prev) => [...prev, ...files]);
  };

  const handleRemoveExisting = (index) => {
    setExistingImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleRemoveNew = (index) => {
    setNewImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      ...formFields,
      remainingImages: existingImages,
    };

    try {
      await onSubmit(data, newImages);
      if (!isEdit) {
        setFormFields({ name: '', description: '', metalType: '', size: '' });
        setExistingImages([]);
        setNewImages([]);
      }
    } catch (err) {
      console.error("Error submiting form", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="ring-form">
      <h2>{isEdit ? "Edit ring" : "Add ring"}</h2>

      {['name', 'description', 'metalType', 'size'].map((field) => (
        <div className="form-group" key={field}>
          <label>{`Ring ${field === 'name' ? 'Name' : field}`}</label>
          <input
            type="text"
            name={field}
            value={formFields[field]}
            onChange={handleInputChange}
            required
          />
        </div>
      ))}

      <div className="image-section">
        {isEdit && existingImages.length > 0 && (
          <>
            <label>Current photos:</label>
            <div className="image-preview">
              {existingImages.map((url, index) => (
                <ImageThumb
                  key={index}
                  url={`${backendUrl}${url}`}
                  index={index}
                  onRemove={handleRemoveExisting}
                />
              ))}
            </div>
          </>
        )}

        <label>Add new photos:</label>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleNewImageChange}
        />

        {newImages.length > 0 && (
          <div className="image-preview">
            {newImages.map((file, index) => (
              <ImageThumb
                key={index}
                file={file}
                index={index}
                onRemove={handleRemoveNew}
                isNew
              />
            ))}
          </div>
        )}
      </div>

      <button type="submit" className="submit-button">
        {isEdit ? "Edit" : "Add"}
      </button>
    </form>
  );
}

function ImageThumb({ url, file, index, onRemove, isNew = false }) {
  return (
    <div className="image-thumb">
      <img
        src={isNew ? URL.createObjectURL(file) : url}
        alt={`Photo ${index}`}
        style={{ maxWidth: "200px", maxHeight: "200px" }}
        draggable={false}
      />
      <button
        type="button"
        className="remove-btn"
        onClick={() => onRemove(index)}
        aria-label={`Delete photo ${index}`}
      >
        &times;
      </button>
    </div>
  );
}

export default EditRingForm;
