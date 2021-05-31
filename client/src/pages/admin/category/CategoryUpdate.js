import { Divider } from 'antd';
import React,{useState,useEffect} from 'react';
import AdminNav from '../../../components/AdminNav';
import NavHeader from '../../../components/NavHeader';
import { category, updateCategory } from '../../../functions/category';
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const CategoryUpdate = ({history,match}) => {

    const { user } = useSelector((state) => ({ ...state }));

  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadCategory();
  }, []);

  const loadCategory = () =>
    category(match.params.slug).then((c) => setName(c.data.name));

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(name);
    setLoading(true);
    updateCategory(user.token,name,match.params.slug)
      .then((res) => {
        // console.log(res)
        setLoading(false);
        setName("");
        toast.success(`"${name}" is updated`);
        history.push("/admin/category");
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
            <h4>Update category</h4>
          )}
          <hr />
          {categoryForm()}
          <hr />
        </div>
        </div>
        </div>
        </>
    )

}

export default CategoryUpdate;