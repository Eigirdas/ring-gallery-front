import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { isEmail } from "validator";
import AuthService from "../services/auth.service";
import './Register.css';
import { useNavigate } from 'react-router-dom';


const Register = () => {
    
    const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const [message, setMessage] = useState("");
  const [successful, setSuccessful] = useState(false);

  const firstPassword = watch("firstPassword", "");

  const onSubmit = (data) => {
    const { username, email, firstPassword,secondPassword } = data;

    setMessage("");
    setSuccessful(false);

    AuthService.register(username, email, firstPassword,secondPassword)
      .then((response) => {
        setMessage(response.data.message);
        setSuccessful(true);
        navigate("/rings");
      })
      .catch((error) => {
        const resMessage =
          (error.response?.data?.message) ||
          error.message ||
          error.toString();

        setMessage(resMessage);
        setSuccessful(false);
      });
  };

  return (
    <div className="register-container">
      <div className="card">
        <form onSubmit={handleSubmit(onSubmit)} className="register-form">
          {!successful && (
            <>
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input
                  id="username"
                  {...register("username", {
                    required: "Username is required",
                    minLength: { value: 3, message: "Min 3 characters" },
                    maxLength: { value: 20, message: "Max 20 characters" },
                  })}
                  className="form-input"
                />
                {errors.username && (
                  <p className="error-message">{errors.username.message}</p>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  {...register("email", {
                    required: "Email is required",
                    validate: (value) => isEmail(value) || "Invalid email",
                  })}
                  className="form-input"
                />
                {errors.email && (
                  <p className="error-message">{errors.email.message}</p>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="firstPassword">Password</label>
                <input
                  id="firstPassword"
                  type="password"
                  {...register("firstPassword", {
                    required: "Password is required",
                    minLength: { value: 6, message: "Min 6 characters" },
                    maxLength: { value: 40, message: "Max 40 characters" },
                  })}
                  className="form-input"
                />
                {errors.firstPassword && (
                  <p className="error-message">{errors.firstPassword.message}</p>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="secondPassword">Confirm Password</label>
                <input
                  id="secondPassword"
                  type="password"
                  {...register("secondPassword", {
                    required: "Please confirm your password",
                    validate: (value) =>
                      value === firstPassword || "Passwords do not match",
                  })}
                  className="form-input"
                />
                {errors.secondPassword && (
                  <p className="error-message">{errors.secondPassword.message}</p>
                )}
              </div>

              <button type="submit" className="submit-btn">
                Sign Up
              </button>
            </>
          )}

          {message && (
            <p className={successful ? "success-message" : "error-message"}>
              {message}
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default Register;
