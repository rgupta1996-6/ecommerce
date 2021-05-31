import React, { useEffect, useState } from 'react';
import { Menu } from 'antd';
import { HomeOutlined,LoginOutlined,LogoutOutlined, MenuUnfoldOutlined, UserOutlined,MailOutlined, AlignRightOutlined, LeftOutlined } from '@ant-design/icons';
import {Link} from 'react-router-dom';
import firebase from 'firebase';
import {useDispatch,useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';
import { Drawer, Button,Avatar } from 'antd';
import { History } from '../pages/user/History';
import Image from '../images/364-3642224_clarity-ecommerce-logo-logo-e-commerce-png.png'


const { SubMenu } = Menu;

const NavHeader =(props)=>{
    
    let dispatch=useDispatch();
    let history= useHistory();
    let {user} = useSelector((state)=>({...state}));
    const [userName,setUserName] = useState("");
    const [current,setCurrent] = useState("");
    const [visible, setVisible] = useState(false);

  useEffect(()=>{
    user&&setUserName(user.name)

  });

  const showDrawer = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };

  

  const handleClick = e => {
    console.log('click ', e);
    setCurrent(e.key);
  };

  const logout= e => {
      console.log("logout");
      firebase.auth().signOut();

      dispatch({
          type: "LOGOUT",
          payload:null,
      });
      setUserName("");
      history.push("/");

      
  };

  return (
    
      <Menu theme="light" onClick={handleClick} selectedKeys={[current]} mode="horizontal">
       
       {props.name !== "history" && (
         <Menu.Item key="sider" >
         <Button  onClick={showDrawer} icon={ <MenuUnfoldOutlined/>} />
         <Drawer
          title={`Hi, ${userName? userName :"SignIn"}`}
          placement="left"
          closable={true}
          onClose={onClose}
          visible={visible}
         >
           {
             user ? (
              <Menu
             style={{ width: 240,alignItems: 'stretch',marginLeft:'-20px' }}
             defaultSelectedKeys={['1']}
             defaultOpenKeys={['sub1']}
             mode="inline"
           >
              <SubMenu key="sub1" icon={<MailOutlined />} title="User Account">
               
                 <Menu.Item key="1" > 
                 {user && user.role === "subscriber" && (
                          
                            <Link to='/user/history'> Dashboard</Link>
              
                        )}
                        {user && user.role === "admin" && (
                          
                            <Link to='/admin/dashboard'> Dashboard</Link>
                          
                        )}
                 </Menu.Item>
                 <Menu.Item key="2">
                 <Link to="/user/updatepassword"/> 
                   Change/Update Password
                   </Menu.Item>
                 <Menu.Item key="3">WishList</Menu.Item>
                 <Menu.Item key="4">Cart</Menu.Item>
              
             </SubMenu>
             </Menu> ):
             (
               <Menu
             style={{ width: 240,alignItems: 'stretch',marginLeft:'-20px' }}
             defaultSelectedKeys={['1']}
             defaultOpenKeys={['sub1']}
             mode="inline"
           >
              <SubMenu key="sub1" icon={<MailOutlined />} title="Hi,SignIn">
               
                 <Menu.Item key="1">Sign In</Menu.Item>
                 <Menu.Item key="2">Register</Menu.Item>
               
             </SubMenu>
             </Menu>
     
             )
           }
        </Drawer>
          
         </Menu.Item>

       )}
        <Menu.Item key="home">
        <img className="ant-menu-item" src={Image} style={{height:"50px",width:"200px",padding:"5px"}}/>
          <Link to="/"/>
        </Menu.Item>

        {user&&(
                     <SubMenu key="SubMenu" icon={ <Avatar style={{ color: '#f56a00', backgroundColor: '#fde3cf' }}>RG</Avatar>} title={` Hi, ${userName}`} className="float-right">

                        {user && user.role === "subscriber" && (
                          <Menu.Item key="setting:3" icon={<UserOutlined/>}>
                            <Link to='/user/history'> Dashboard</Link>
                            </Menu.Item>
                        )}
                        {user && user.role === "admin" && (
                          <Menu.Item key="setting:3" icon={<UserOutlined/>}>
                            <Link to='/admin/dashboard'> Dashboard</Link>
                            </Menu.Item>
                        )}
                       
                     <Menu.Item onClick={logout} icon={<LogoutOutlined/>}>LogOut</Menu.Item>
                   </SubMenu>
        )}
   

        {!user &&( <Menu.Item key="register" icon={<LogoutOutlined />} className="float-right">
        <Link to="/register"/>
        Register
        </Menu.Item>)}
       
    {!user && (
        <Menu.Item key="login" icon={<LoginOutlined />} className="float-right">
        <Link to="/login"/>
        Login
        </Menu.Item>
    )}
      </Menu>
    );
  }

export default NavHeader;