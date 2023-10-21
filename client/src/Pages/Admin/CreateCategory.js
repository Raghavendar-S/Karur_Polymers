import React, { useEffect, useState } from "react";
import "./AdminDashboard.css";
import Layout from "../../Components/Layout/Layout";
import AdminMenu from "./AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import "./CreateCategory.css";
import CategoryForm from "../../Components/Form/CategoryForm";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

export default function CreateCategory() {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);
  const [updatedName,setUpdatedName] = useState("");
  const [selected,setSelected] = useState(null);

  //handle form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:3001/category/create-category",
        { name }
      );
      if (data?.success) {
        toast.success(`${name} category is created`);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in input form");
    }
  };

  //get all categories
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:3001/category/get-category"
      );
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while getting categories");
    }
  };

  const handleUpdate = async(e) => {
    e.preventDefault();
    try{
      const { data } = await axios.put(
        `http://localhost:3001/category/update-category/${selected._id}`, {name:updatedName})
      if(data.success){
        toast.success(`${updatedName} is updated`);
        setSelected(null);
        setUpdatedName("");
        handleClose();
      }else{
        toast.error(data.message);
      }
    }catch(error){
      toast.error('Something went wrong while updating')
    }
  }

  const handleDelete = async(pId) => {
    try{
      const { data } = await axios.delete(
        `http://localhost:3001/category/delete-category/${pId}`);
      if(data.success){
        toast.success("Category is deleted");
      }else{
        toast.error(data.message);
      }
    }catch(error){
      toast.error('Something went wrong while deleting')
    }
  }

  useEffect(() => {
    getAllCategory();
  });

  return (
    <Layout>
      <div className="admin_container">
        <div className="row">
          <div className="col" style={{ width: "40%" }}>
            <AdminMenu />
          </div>
          <div className="col" style={{ width: "60%" }}>
            <div className="card">
              <h1>Manage Category</h1>
              <div style={{ margin: "10px 0px" }}>
                <CategoryForm
                  handleSubmit={handleSubmit}
                  value={name}
                  setValue={setName}
                />
              </div>
              <table>
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {categories?.map((c) => (
                    <tr key={c._id}>
                        <td>{c.name}</td>
                        <td>
                          <button className="btn" onClick={() => {setOpen(true);setUpdatedName(c.name);setSelected(c);}} >
                            Edit
                          </button>
                          <button className="btn" onClick={() => {handleDelete(c._id);}}>Delete</button>
                        </td>
                      </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Modal open={open}>
              <Box
                sx={{
                  position: "fixed",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  backgroundColor: "white",
                  padding: "20px",
                }}
              >
                <CategoryForm
                  handleSubmit={handleUpdate}
                  value={updatedName}
                  setValue={setUpdatedName}
                />
              </Box>
            </Modal>
          </div>
        </div>
      </div>
    </Layout>
  );
}
