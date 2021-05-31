import { Divider } from 'antd';
import React,{useState,useEffect} from 'react';
import AdminNav from '../../../components/AdminNav';
import NavHeader from '../../../components/NavHeader';
import { category, getCategories, updateCategory } from '../../../functions/category';
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { subCategory, updateSubCategory } from '../../../functions/sub';

const SubUpdate = ({history,match}) => {

const { user } = useSelector((state) => ({ ...state }));

  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [parent, setParent] = useState("");

  useEffect(() => {
    loadCategories();
    loadCategory();
  }, []);

  const loadCategories = () =>
  getCategories().then((c) => setCategories(c.data));

  const loadCategory = () =>
    subCategory(match.params.slug).then((s) => {
    setName(s.data.name);
    setParent(s.data.id);
     });

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(name);
    setLoading(true);
    updateSubCategory(user.token,name,parent,match.params.slug)
      .then((res) => {
        // console.log(res)
        setLoading(false);
        setName("");
        toast.success(`"${name}" is updated`);
        history.push("/admin/sub");
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        if (err.response.status === 400) toast.error(err.response.data);
      });
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
            <h4>Update Sub Category</h4>
          )}

            <hr />

           <div className="form-group">
            <label>Parent category</label>
            <select
              name="category"
              className="form-control"
              onChange={(e) => setParent(e.target.value)}
            >
              <option>Please select</option>
              {categories.length > 0 &&
                categories.map((c) => (
                  <option key={c.ID} value={c.ID} selected={c.ID === parent}>
                    {c.name}
                  </option>
                ))}
            </select>
          </div>

          {categoryForm()}
          <hr />
        </div>
        </div>
        </div>
        </>
    )

}

export default SubUpdate;