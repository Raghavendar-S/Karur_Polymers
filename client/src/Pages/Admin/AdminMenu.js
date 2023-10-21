import React from "react";
import { NavLink } from "react-router-dom";
import './AdminMenu.css';
import { Toaster } from 'react-hot-toast';

export default function AdminMenu() {
  return (
    <>
      <Toaster position="top-right" reverseOrder={false}/>
      <div className="text-center">
        <div className="list-group">
          <h4>Admin Panel</h4>
          <NavLink
            to="/dashboard/admin/create-category"
            className="list-group-item list-group-item-action"
          >
            Create Category
          </NavLink>
          <NavLink
            to="/dashboard/admin/create-product"
            className="list-group-item list-group-item-action"
          >
            Create Product
          </NavLink>
          <NavLink
            to="/dashboard/admin/users"
            className="list-group-item list-group-item-action"
          >
            Users
          </NavLink>
        </div>
      </div>
    </>
  );
}
