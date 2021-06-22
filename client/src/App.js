import React,{useEffect} from 'react';
import {BrowserRouter,Switch,Route,Redirect} from 'react-router-dom';
import {ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import {auth} from './firebase';
import {useDispatch,useSelector} from 'react-redux';

import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Home from './pages/Home';
import UserRoute from './components/routes/UserRoute'

import 'antd/dist/antd.css';
import CompleteSignUp from './pages/auth/CompleteRegistration';
import ForgotPassword from './pages/auth/ForgotPassword';
import axios from 'axios';
import History  from './pages/user/History';
import LoginRoute from './components/routes/LoginRoute';
import UpdatePassword from './pages/user/UpdatePassword';
import AdminRoute from './components/routes/AdminRoute';
import AdminDashboard from './pages/admin/Dashboard';
import CategoryCreate from './pages/admin/category/CategoryCreate';
import CategoryUpdate from './pages/admin/category/CategoryUpdate';
import SubCreate from './pages/admin/sub/SubCreate';
import SubUpdate from './pages/admin/sub/SubUpdate';
import ProductCreate from './pages/admin/products/ProductCreate';
import ConnectorCreate from './pages/admin/connector/ConnectorCreate';
import ForwardRules from './pages/admin/connector/ForwardRules';


const currentUser = async(authToken) =>{

  return await axios.post(process.env.REACT_APP_CURRENT_USER_API,{
    authToken:authToken
  })

}


const App= () => {

  const dispatch = useDispatch();
  let {user} = useSelector((state)=>({...state}));

  useEffect(()=> {

    const unsubscribe = auth.onAuthStateChanged(async(user)=>{

      if(user){
        const idTokenResult= await user.getIdTokenResult();
        const token = idTokenResult.token
        console.log("User:",idTokenResult.token);
        currentUser(token)
        .then((res)=>{
          dispatch({
            type: "LOGGED_IN_USER",
            payload:{
                name: res.data.name,
                email: res.data.email,
                role: res.data.role,
                token: token,
            },
        });
        })
        .catch((err)=>{console.log(err)})

    }
  });

    return () => unsubscribe();

  },[]);



  return (
    <div>
      <ToastContainer/>
     <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home}/>
        <LoginRoute path="/login" exact component={Login}/>
        <Route path="/register" exact component={user?() =><Redirect to="/"/>:Register}/>
        <Route path = "/register/complete" exact component={CompleteSignUp}/>
        <Route path = "/forgotPassword" exact component={ForgotPassword}/>
        <UserRoute path = "/user/history" exact component={History}/>
        <UserRoute path = "/user/updatepassword" exact component={UpdatePassword}/>
        <AdminRoute path = "/admin/dashboard" exact component={AdminDashboard}/>
        <AdminRoute path = "/admin/category" exact component={CategoryCreate}/>
        <AdminRoute path = "/admin/category/:slug" exact component={CategoryUpdate}/>
        <AdminRoute path = "/admin/sub" exact component={SubCreate}/>
        <AdminRoute path = "/admin/subcategory/:slug" exact component={SubUpdate}/>
        <AdminRoute path = "/admin/product" exact component={ProductCreate}/>
        <AdminRoute path = "/admin/destination" exact component={ConnectorCreate}/>
        <AdminRoute path = "/admin/forwardrules" exact component={ForwardRules}/>
      </Switch>
     </BrowserRouter>
    </div>
  );
}

export default App;
