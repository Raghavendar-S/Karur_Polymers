import React from 'react'
import '../Admin/AdminDashboard.css';
import UserMenu from "./UserMenu";
import Layout from '../../Components/Layout/Layout';

export default function Profile() {
  return (
    <Layout>
    <div className="admin_container">
      <div className="row">
        <div className="col" style={{ width: "40%" }}>
          <UserMenu/>
        </div>
        <div className="col" style={{ width: "60%" }}>
          <div className="card">
            <h1>Your Profile</h1>
          </div>
        </div>
      </div>
    </div>
    </Layout>
  )
}
