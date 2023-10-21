import { Link, useNavigate } from "react-router-dom";
import React from "react";
import "./NavbarFooter.css";
import toast from "react-hot-toast";
import { useAuth } from "../../Context/Auth";

export function Navbar() {
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    localStorage.removeItem("token");
    navigate("/");
    toast.success("Logout successfully");
  };

  return (
    <>
      <header className="navbar_header">
        <a href="/" className="logo">
          <img src="../assets/logo.png" alt="logo" />
        </a>
        <input type="checkbox" id="menu-bar" />
        <label htmlFor="menu-bar">
          <i className="ri-menu-line"></i>
        </label>
        <nav className="navbar">
          <ul>
            <li>
              <Link to="/">
                <i class="ri-home-4-line"></i> Home
              </Link>
            </li>
            <li>
              <Link to="/products">
                <i class="ri-box-3-line"></i> Products
              </Link>
            </li>
            <li>
              <a href="/#choose">
                <i class="ri-information-line"></i> About Us
              </a>
            </li>
            <li>
              <a href="/#contact">
                <i class="ri-contacts-book-line"></i> Contact
              </a>
            </li>
            {!auth.user ? (
              <>
                <li>
                  <Link to="#">
                    <i class="ri-user-line" /> Login / Register{" "}
                    <i class="ri-arrow-drop-down-line" />
                  </Link>
                  <ul>
                    <li>
                      <Link to="/login">
                        <i class="ri-login-box-line" /> Login
                      </Link>
                    </li>
                    <li>
                      <Link to="/register">
                        <i class="ri-user-add-line" /> Register
                      </Link>
                    </li>
                  </ul>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="#">
                    {auth?.user?.name === "Admin" ? (
                      <i class="ri-admin-line" />
                    ) : (
                      <i class="ri-user-line" />
                    )}{" "}
                    {auth?.user?.name}
                  </Link>
                  <ul>
                    <li>
                      <Link
                        to={`/dashboard/${
                          auth?.user?.role === 1 ? "admin" : "user"
                        }`}
                      >
                        <i class="ri-dashboard-line" /> Dashboard
                      </Link>
                    </li>
                    <li>
                      <button onClick={handleLogout}>
                        <i className="ri-logout-box-line" /> Logout
                      </button>
                    </li>
                  </ul>
                </li>
              </>
            )}
          </ul>
        </nav>
      </header>
    </>
  );
}
