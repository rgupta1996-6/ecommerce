import React, { useEffect, useState } from 'react';
import { Menu } from 'antd';
import { HomeOutlined,LoginOutlined,LogoutOutlined, MenuUnfoldOutlined, UserOutlined,MailOutlined, AlignRightOutlined, LeftOutlined } from '@ant-design/icons';
import {Link} from 'react-router-dom';
import firebase from 'firebase';
import {useDispatch,useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';
import { Drawer, Button,Avatar } from 'antd';
import { History } from '../pages/user/History';


const { SubMenu } = Menu;

const NavHeader =()=>{
    
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
               <Link to="/user/history"/> 
               History
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
             
             <Menu.ItemGroup key="g2" title="Item 2">
               <Menu.Item key="3">Option 3</Menu.Item>
               <Menu.Item key="4">Option 4</Menu.Item>
             </Menu.ItemGroup>
           </SubMenu>
           </Menu>
   
           )
         }
      </Drawer>
        
       </Menu.Item>
       

        <Menu.Item key="home" icon={<HomeOutlined />}>
          <Link to="/"/>
          Home
        </Menu.Item>

        {user&&(
                     <SubMenu key="SubMenu" icon={ <Avatar style={{ color: '#f56a00', backgroundColor: '#fde3cf' }}>RG</Avatar>} title={` Hi, ${userName}`} className="float-right">
                     <Menu.ItemGroup title="Item 1">
                       <Menu.Item key="setting:1">Option 1</Menu.Item>
                       <Menu.Item key="setting:2">Option 2</Menu.Item>
                     </Menu.ItemGroup>
                     <Menu.ItemGroup title="Item 2">
                       <Menu.Item key="setting:3">Option 3</Menu.Item>
                       <Menu.Item key="setting:4">Option 4</Menu.Item>
                     </Menu.ItemGroup>
                     <Menu.Item onClick={logout}>LogOut</Menu.Item>
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