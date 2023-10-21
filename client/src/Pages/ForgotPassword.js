import React, { useState } from "react";
import "../Components/LoginRegister.css";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

export default function ForgotPassword() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    newPassword: "",
    answer: "",
  });

  const { email, newPassword, answer } = formData;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3001/forgot-password",
        { email, newPassword, answer }
      );
      // const response = await axios.post('https://karur-polymers-backend.onrender.com/login',{email,password})
      if (response && response.data.success) {
        toast.success("Password Reset successfully");
        navigate("/login");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.toString());
    }
  };

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <div className="container">
        <div className="forgot_container_left"></div>
        <div className="container_right">
          <div className="content">
            <p className="heading">Forgot Password Page</p>
            <form onSubmit={handleSubmit}>
              <TextField
                required
                className="input"
                type="email"
                label="Email "
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
              <TextField
                required
                className="input"
                type="text"
                label="New Password "
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
              />
              <TextField
                required
                className="input"
                type="text"
                label="Enter your favorite Sport "
                name="answer"
                value={formData.answer}
                onChange={handleChange}
              />

              <button className="submit_btn" type="submit">
                Submit
              </button>
              <button
                className="back"
                onClick={() => {
                  navigate(-1);
                }}
              >
                <i class="ri-arrow-left-s-line" /> Back
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
