import React, { useState, useEffect } from "react";
import AdminNav from "../../../components/AdminNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import {
  createCategory,
  getCategories,
  deleteCategory,
} from "../../../functions/category";
import NavHeader from "../../../components/NavHeader";
import { Divider } from 'antd';
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import {Link} from 'react-router-dom';
import { createSubCategory, deleteSubCategory, getSubCategories } from "../../../functions/sub";

const SubCreate = () => {
  const { user } = useSelector((state) => ({ ...state }));

  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [subCategories,setSubCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    loadCategories();
    loadSubCategories();
  }, []);

  const loadCategories = () =>
    getCategories().then((c) => setCategories(c.data));

    const loadSubCategories = () =>
    getSubCategories().then((s) => setSubCategories(s.data));

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(name);
    setLoading(true);
    createSubCategory(user.token,name,category)
      .then((res) => {
        // console.log(res)
        setLoading(false);
        setName("");
        toast.success(`"${res.data.name}" is created`);
        loadSubCategories();
       
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        if (err.response.status === 400) {
            toast.error(err.response.data.message.Message);
        }
      });
  };

  const handleRemove = async (slug) => {
    // let answer = window.confirm("Delete?");
    // console.log(answer, slug);
    if (window.confirm("Are you sure you want to delete this category?")) {
      setLoading(true);
      //console.log("delete:",user.token)
      deleteSubCategory(user.token,slug)
        .then((res) => {
          setLoading(false);
          toast.error(`${slug} deleted`);
          loadSubCategories();
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
            <h4>Create Sub Category</h4>
          )}

            <hr />

             <div className="form-group">
            <label>Parent category</label>
            <select
              name="category"
              className="form-control"
              onChange={(e) => setCategory(e.target.value)}
            >
              <option>Please select a parent category</option>
              {categories.length > 0 &&
                categories.map((c) => (
                  <option key={c.ID} value={c.ID}>
                    {c.name}
                  </option>
                ))}
            </select>
          </div>

          {categoryForm()}

           <input
            type="search"
            placeholder="Filter"
            value={keyword}
            onChange={handleSearchChange}
            className="form-control mb-4"
          />

          <hr />
          {subCategories.filter(searched(keyword)).map((s) => (
            <div class="alert alert-secondary" style={{borderRadius:"5px"}} key={s.ID}>
              {s.name}
              <span
                onClick={() => handleRemove(s.slug)}
                className="btn btn-sm float-right"
              >
                <DeleteOutlined className="text-danger" />
              </span>
              <Link to={`/admin/subcategory/${s.slug}`}>
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

export default SubCreate;
