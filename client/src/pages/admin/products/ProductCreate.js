import React, { useState, useEffect } from "react";
import AdminNav from "../../../components/AdminNav";
import NavHeader from "../../../components/NavHeader";
import { createProduct } from "../../../functions/product";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { getCategories } from "../../../functions/category";
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

const ProductCreate = () => {
  const [values, setValues] = useState(initialState);
  const [sub, setSub] = useState([]);
  const [loading, setLoading] = useState(false);

  // redux
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = () =>
    getCategories().then((c) => setValues({ ...values, categories: c.data }));

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
    createProduct(
      user.token,
      title,
      description,
      price,
      quantity,
      brand,
      shipping,
      color,
      category,
      subCategory,
      images
    )
      .then((res) => {
        console.log(res);
        toast.success("Product created successfully");
        setTimeout(function () {
          window.location.reload();
        }, 3000);
      })
      .catch((err) => {
        console.log(err);
        if (err.response.status === 400)
          toast.error(err.response.data.message.Message);
      });
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
    console.log(e.target.name, " ----- ", e.target.value);
    e.target.name === "category" && selected(e.target.value);
    console.log(sub);
  };

  const selected = (id) => {
    console.log("inside selected id:", id);
    categories
      .filter(function (el) {
        return el.ID == id;
      })
      .map((c) => {
        setSub(c.SubCategories);
      });
  };

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
            <h4>Product create</h4>
            <hr />

            <form onSubmit={handleSubmit} className="row g-3">
              <div className="col-md-6 form-group">
                <label>Title</label>
                <input
                  type="text"
                  name="title"
                  className="form-control"
                  value={title}
                  onChange={handleChange}
                  autoFocus
                />
              </div>
              <div className="col-md-6  form-group">
                <label>Price</label>
                <input
                  type="number"
                  name="price"
                  className="form-control"
                  value={price}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-12 form-group">
                <label>Description</label>
                <input
                  type="text"
                  name="description"
                  className="form-control"
                  value={description}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-6 form-group">
                <label>Shipping</label>
                <select
                  name="shipping"
                  className="form-control"
                  onChange={handleChange}
                >
                  <option>Please select</option>
                  <option value="No">No</option>
                  <option value="Yes">Yes</option>
                </select>
              </div>
              <div className="col-md-6 form-group">
                <label>Quantity</label>
                <input
                  type="number"
                  name="quantity"
                  className="form-control"
                  value={quantity}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-6  form-group">
                <label>Color</label>
                <select
                  name="color"
                  className="form-control"
                  onChange={handleChange}
                >
                  <option>Please select</option>
                  {colors.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-md-6 form-group">
                <label>Brand</label>
                <select
                  name="brand"
                  className="form-control"
                  onChange={handleChange}
                >
                  <option>Please select</option>
                  {brands.map((b) => (
                    <option key={b} value={b}>
                      {b}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-md-6 form-group">
                <label>Category</label>
                <select
                  name="category"
                  className="form-control"
                  onChange={handleChange}
                >
                  <option>Please select</option>
                  {categories.length > 0 &&
                    categories.map((c) => (
                      <option key={c.ID} value={c.ID}>
                        {c.name}
                      </option>
                    ))}
                </select>
              </div>
              <div className="col-md-6 form-group">
                <label>Sub Category</label>
                <select
                  name="subCategory"
                  className="form-control"
                  onChange={handleChange}
                >
                  <option>Please select</option>
                  {sub.map((c) => (
                    <option key={c.ID} value={c.ID}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-md-6 form-group">
              <button
                className="btn btn-primary"
                style={{ marginLeft: "0px" }}
              >
                Save
              </button>
              </div>
              <div className="col-md-6 form-group">
                <FileUpload
                  values={values}
                  setValues={setValues}
                  setLoading={setLoading}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCreate;
