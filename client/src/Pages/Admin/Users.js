import React from 'react'
import './AdminDashboard.css';
import Layout from '../../Components/Layout/Layout';
import AdminMenu from "./AdminMenu";

export default function Users() {
  return (
    <Layout>
    <div className="admin_container">
      <div className="row">
        <div className="col" style={{ width: "40%" }}>
          <AdminMenu/>
        </div>
        <div className="col" style={{ width: "60%" }}>
          <div className="card">
            <h1>All Users</h1>
          </div>
        </div>
      </div>
    </div>
    </Layout>
  )
}
