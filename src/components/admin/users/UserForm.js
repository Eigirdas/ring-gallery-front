import { useEffect, useState } from "react";

function UserForm({ isEdit, onSubmit, initialData }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("USER"); // default role

  useEffect(() => {
    if (isEdit && initialData) {
      setName(initialData.name || "");   
      setEmail(initialData.email || "");
      setPassword(""); // keep blank on edit for password
      setRole(initialData.role || "USER");
    }
  }, [initialData, isEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = { name, email, password, role };
    try {
      await onSubmit(userData);
      if (!isEdit) {
        setName("");
        setEmail("");
        setPassword("");
        setRole("USER");
      }
    } catch (error) {
      console.error("Error submitting form", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="user-form">
      <h2>{isEdit ? "Update User" : "Add User"}</h2>

      <div className="form-group">
        <label htmlFor="name">Username</label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="password">
          Password {isEdit && "(leave blank to keep current)"}
        </label>
        <input
          id="password"
          type="text"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required={!isEdit}
        />
      </div>

      <div className="form-group">
        <label htmlFor="role">Role</label>
        <select
          id="role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          required
        >
          <option value="USER">USER</option>
          <option value="ADMIN">ADMIN</option>
        </select>
      </div>

      <button type="submit" className="submit-button">
        {isEdit ? "Update" : "Add"}
      </button>
    </form>
  );
}

export default UserForm;
