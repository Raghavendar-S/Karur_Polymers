import React, { useState } from "react";
import "../Components/LoginRegister.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import axios from "axios";
import toast, {Toaster} from "react-hot-toast";
import { useAuth } from "../Context/Auth";

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const [showPassword, setShowPassword] = useState(false);

  const [auth, setAuth] = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

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
      const response = await axios.post("http://localhost:3001/login", {
        email,
        password,
      });
      // const response = await axios.post('https://karur-polymers-backend.onrender.com/login',{email,password})
      if (response && response.data.success) {
        setAuth({
          ...auth,
          user: response.data.user,
          token: response.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(response.data));
        toast.success("Login successfully");
        navigate(location.state || "/");
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
      <Toaster position="top-right" reverseOrder={false}/>
      <div className="container">
        <div className="left_container" id="login"></div>
        <div className="container_right">
          <div className="content">
            <p className="heading">Login Page</p>
            <div className="header_content">
              <p>
                Not a member yet? <Link to="/register">Register now</Link>
              </p>
            </div>
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
                type={showPassword ? "text" : "password"}
                label="Password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handlePasswordVisibility}
                        edge="end"
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <button className="submit_btn" type="submit">
                Login
              </button>
              <Link to="/forgot_password">
                <p className="forget_password">Forgot your password?</p>
              </Link>
            </form>
            <p className="social_login_header">Or sign in with</p>
            <div className="socials">
              <div className="social_login google_login">
                <i className="ri-google-fill"></i>
                <span>Google</span>
              </div>
            </div>
            <button
              className="back"
              onClick={() => {
                navigate(-1);
              }}
            >
              <i className="ri-arrow-left-s-line" /> Back
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
