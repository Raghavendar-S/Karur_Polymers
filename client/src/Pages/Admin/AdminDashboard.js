import React from "react";
import AdminMenu from "./AdminMenu";
import { useAuth } from "../../Context/Auth";
import './AdminDashboard.css';
import Layout from "../../Components/Layout/Layout";

export default function AdminDashboard() {
  const [auth] = useAuth();

  return (
    <Layout>
      <div className="admin_container">
        <div className="row">
          <div className="col" style={{ width: "40%" }}>
            <AdminMenu/>
          </div>
          <div className="col" style={{ width: "60%" }}>
            <div className="card">
              <h3>Admin Name: {auth?.user?.name}</h3>
              <h3>Admin Email: {auth?.user?.email}</h3>
              <h3>Admin Contact: {auth?.user?.phone}</h3>
            </div>
          </div>
        </div>
      </div>
      </Layout>
  );
}
