import React, { useState, useEffect } from "react";
import AdminNav from "../../../components/AdminNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import {
  deleteCategory,
  createDestination,
  getDestinations,
} from "../../../functions/category";
import NavHeader from "../../../components/NavHeader";
import { Divider } from 'antd';
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import {Link} from 'react-router-dom';

const ConnectorCreate = () => {
  const { user } = useSelector((state) => ({ ...state }));

  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [bucketValue, setBucketValue] = useState("");
 const bucket = ["DAY","WEEK","MONTH"]
  useEffect(() => {
    loadDestinations();
  }, []);

  const loadDestinations = () =>
    getDestinations().then((c) => {
      let obj = JSON.parse(c.data)
      console.log(obj)
      setCategories(obj.results);
    })

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(name);
    setLoading(true);
    createDestination(name,bucketValue)
      .then((res) => {
        console.log(res)
        setLoading(false);
        setName("");
        setBucketValue("");
        toast.success("Destination is created");
        loadDestinations();
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        if (err) {
            toast.error("oops cannot create a device");
        }
      });
  };

  const handleRemove = async (slug) => {
    // let answer = window.confirm("Delete?");
    // console.log(answer, slug);
    if (window.confirm("Are you sure you want to delete this category?")) {
      setLoading(true);
      //console.log("delete:",user.token)
      deleteCategory(user.token,slug)
        .then((res) => {
          setLoading(false);
          toast.error(`${slug} deleted`);
          loadDestinations();
        })
        .catch((err) => {
          if (err.response.status === 400) {
            setLoading(false);
            toast.error(err.response.data.message.Message);
          }
        });
    }
  };

  const categoryForm = () => (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Name</label>
        <input
          type="text"
          className="form-control"
          onChange={(e) => setName(e.target.value)}
          value={name}
          autoFocus
          required
        />
        <br />
        <label>Bucket Interval</label>
        <select
              name="category"
              className="form-control"
              onChange={(e) => setBucketValue(e.target.value)}
            >
              <option>Please select a parent category</option>
              {bucket.length > 0 &&
                bucket.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
            </select>
        <br/>
        <button className="btn btn-outline-primary">Save</button>
      </div>
    </form>
  );


  const handleSearchChange = (e) => {
    e.preventDefault();
    setKeyword(e.target.value.toLowerCase());
  };

  const searched = (keyword) => (c) => c.name.toLowerCase().includes(keyword);

  return (
      <>
    <header class="  sticky-top flex-md-nowrap p-0 shadow">
    <NavHeader name="history"/>
    </header>
    <div className="container-fluid">

      <div className="row">
       
      <div className="col-md-2">
          <AdminNav />
        </div>
  
        <div className="col col-lg-10" style={{padding:"20px"}}>
          {loading ? (
            <h4 className="text-danger">Loading..</h4>
          ) : (
            <h4>Add a Destination</h4>
          )}
          <hr />
          {categoryForm()}

           <input
            type="search"
            placeholder="Filter"
            value={keyword}
            onChange={handleSearchChange}
            className="form-control mb-4"
          />

          <hr />
          {categories.filter(searched(keyword)).map((c) => (
            <div class="alert alert-secondary" style={{borderRadius:"5px"}} key={c.name}>
              {c.name}
              <span
                onClick={() => handleRemove(c.slug)}
                className="btn btn-sm float-right"
              >
                <DeleteOutlined className="text-danger" />
              </span>
              <Link to={`/admin/category/${c.slug}`}>
                <span className="btn btn-sm float-right">
                  <EditOutlined className="text-warning" />
                </span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
    </>
  );
};

export default ConnectorCreate;
