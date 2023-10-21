import React,{useEffect,useState} from 'react'
import './AdminDashboard.css';
import Layout from '../../Components/Layout/Layout';
import AdminMenu from "./AdminMenu";
import axios from 'axios';
import toast from 'react-hot-toast';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function CreateProduct() {
  const [categories,setCategories] = useState([])
  const [category,setCategory] = useState("")
  const [photo,setPhoto] = useState("")
  const [name,setName] = useState("")
  const [description,setDescription] = useState("")
  const [price,setPrice] = useState("")
  const [quantity,setQuantity] = useState("")
  const [shipping,setShipping] = useState("")
  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);
  const [selected,setSelected] = useState(null);

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

  useEffect(() => {
    getAllCategory();
  });

  return (
    <Layout>
    <div className="admin_container">
      <div className="row">
        <div className="col" style={{ width: "40%" }}>
          <AdminMenu/>
        </div>
        <div className="col" style={{ width: "60%" }}>
          <div className="card">
            <h1>Manage product</h1>
            <div style={{marginTop:"10px",textAlign:"center"}}>
            <FormControl style={{ width: '80%' }}>
              <InputLabel id="demo-simple-select-label">Select a category</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Select a category"
                onChange={(value) => {setCategory(value)}}
              >
                {categories?.map((c) => (
                  <MenuItem key={c._id} value={c.name}>{c.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
            </div>
          </div>
        </div>
      </div>
    </div>
    </Layout>
  )
}
