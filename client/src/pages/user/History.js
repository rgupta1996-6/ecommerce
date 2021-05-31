import React from "react";
import UserNav from "../../components/userNav";
import NavHeader from '../../components/NavHeader';
import { Divider } from 'antd';


const History = () => (
  <div className="container-fluid">
      <NavHeader name="history"/>
    <div className="row">
      <div className="col-md-2">
        <UserNav />
      </div>
      <Divider type="vertical"  style={{ height: "600px"}}/>
      <div className="col">user history page</div>
    </div>
  </div>
);

export default History;
