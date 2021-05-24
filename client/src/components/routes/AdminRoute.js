import React, { useEffect, useState } from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import LoadingToRedirect from "./LoadingToRedirect";
import axios from 'axios';

const currentAdmin = async(authToken) =>{

    return await axios.post(process.env.REACT_APP_CURRENT_ADMIN_API ,{
      authToken:authToken
    })
  
  }
  

const AdminRoute = ({ children, ...rest}) => {
  const { user } = useSelector((state) => ({ ...state }));
  const [ok,setOk] = useState(false);

  useEffect(()=>{
      if (user && user.token){
          console.log("Admin:",user.token.token);
          currentAdmin(user.token.token)
          .then((res)=>{
              console.log("current admin :",res)
              setOk(true)

          })
          .catch((err)=>{
              console.log("Admin error:",err)
              setOk(false)

          })
      }
  },[user])


  return ok ? (
    <Route {...rest} render={() => children} />
  ) : (
    <LoadingToRedirect name="Admin"/>
  );
};

export default AdminRoute;
