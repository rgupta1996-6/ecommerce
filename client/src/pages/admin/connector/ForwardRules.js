import React, { useState, useEffect } from "react";
import AdminNav from "../../../components/AdminNav";
import NavHeader from "../../../components/NavHeader";
import { createForwardRule } from "../../../functions/category";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { getCategories, getDestinations, getDeviceType } from "../../../functions/category";
import FileUpload from "../../../images/FileUpload";

const initialState = {
  title: "",
  description: "",
  price: "",
  categories: [],
  category: "",
  subs: [],
  subCategory: "",
  shipping: "",
  quantity: "",
  images: [],
  colors: ["Black", "Brown", "Silver", "White", "Blue"],
  brands: ["Apple", "Samsung", "Microsoft", "Lenovo", "ASUS"],
  color: "",
  brand: "",
};

const ForwardRules = () => {
  const [values, setValues] = useState(initialState);
  const [sub, setSub] = useState([]);
  const [loading, setLoading] = useState(false);

  const [destinations,setDestinations]= useState([]);
  const [type,setType]= useState([]);
  const [destination,setDestination]= useState("");
  const [name,setName]= useState("");
  const [eventID,setEventID]= useState("");
  const [device,setDevice]= useState("");
  // redux
  //type.filter((c) => c.id.toLowerCase().includes(destination))
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadDestinations();
    loadCategories();
  }, []);

  const loadDestinations = () =>
    getDestinations().then((c) => {
      let obj = JSON.parse(c.data)
      console.log(obj)
      setDestinations(obj.results);
    })

    const loadCategories = () =>
    getDeviceType().then((c) => {
      let obj = JSON.parse(c.data)
      console.log(obj)
      setType(obj.results);
    })

  // destructure
  const {
    title,
    description,
    price,
    categories,
    category,
    subs,
    shipping,
    quantity,
    images,
    colors,
    brands,
    color,
    brand,
    subCategory,
  } = values;

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true)
    createForwardRule(name,destination,device,eventID)
      .then((res) => {
        console.log(res);
        setEventID("")
        setName("")
        setLoading(false)
        toast.success("Forward Rule created successfully");
      })
      .catch((err) => {
        console.log(err);
          toast.error(err);
      });
  };

  console.log(destination);

  return (
    <>
      <header class="  sticky-top flex-md-nowrap p-0 shadow">
        <NavHeader name="history" />
      </header>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-2">
            <AdminNav />
          </div>

          <div className="col-md-10" style={{ padding: "20px" }}>
          {loading ? (
            <h4 className="text-danger">Loading..</h4>
          ) : (
            <h4>Add Forward Rule</h4>
          )}
          <hr />

            <form onSubmit={handleSubmit} className="row g-3">
              <div className="col-md-6 form-group">
                <label>Name</label>
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  value={name}
                  onChange={(e)=>setName(e.target.value)}
                  autoFocus
                />
              </div>
              <div className="col-md-6 form-group">
                <label>Destination Name</label>
                <select
                  name="destination"
                  className="form-control"
                  onChange={(e)=>setDestination(e.target.value)}
                >
                  <option>Please select</option>
                  {destinations.map((c) => (
                    <option key={c.name} value={c.name}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
        
              <div className="col-md-6  form-group">
                <label>Device Type</label>
                <select
                  name="color"
                  className="form-control"
                  onChange={(e)=>setDevice(e.target.value)}
                >
                  <option>Please select</option>
                  {type.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.id}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-md-6 form-group">
                <label>Event ID</label>
                <input
                  type="text"
                  name="eventID"
                  className="form-control"
                  value={eventID}
                  onChange={(e)=>setEventID(e.target.value)}
                />
              </div>
              <div className="col-md-6 form-group">
              <button
                className="btn btn-primary"
                style={{ marginLeft: "0px" }}
              >
                Save
              </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForwardRules;
