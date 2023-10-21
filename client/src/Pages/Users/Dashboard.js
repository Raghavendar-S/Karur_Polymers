import React from "react";
import { Toaster } from "react-hot-toast";
import UserMenu from "./UserMenu";
import { useAuth } from "../../Context/Auth";
import "../Admin/AdminDashboard.css";
import Layout from "../../Components/Layout/Layout";

export function Dashboard() {
  const [auth] = useAuth();

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <Layout>
        <div className="admin_container">
          <div className="row">
            <div className="col" style={{ width: "40%" }}>
              <UserMenu />
            </div>
            <div className="col" style={{ width: "60%" }}>
              <div className="card">
                <h3>User Name: {auth?.user?.name}</h3>
                <h3>User Email: {auth?.user?.email}</h3>
                <h3>User Contact: {auth?.user?.phone}</h3>
              </div>
            </div>
          </div>
        </div>
        </Layout>
    </>
  );
}
