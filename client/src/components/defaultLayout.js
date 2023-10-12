import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  HomeOutlined ,
  CopyOutlined ,
  UnorderedListOutlined ,
  LogoutOutlined ,
  ShoppingCartOutlined ,
} from '@ant-design/icons';
import { useEffect, useState } from 'react'
import { Props } from 'react';
import { Layout, Menu, Button, theme } from 'antd';
import { Link , useNavigate} from 'react-router-dom';
import { useSelector } from 'react-redux'
import '../resources/layout.css'
import { rootReducer,state } from '../redux/rootReducer';


const { Header, Sider, Content } = Layout;


const DefaultLayout = ({children}) => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const navigate = useNavigate(  );
  const {cartItems , loading} = useSelector(state=>state.rootReducer)
  const toggle = () =>{
    setCollapsed(!collapsed)
  }

  useEffect(() =>{
      localStorage.setItem('cartItems' , JSON.stringify(cartItems))
  },[cartItems])

  return (
    <Layout> 
      {loading &&(
        <div className='spinner'><div class="spinner-border" role="status"></div>
      </div>
      
      )}
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" ><h3 style={{color : 'white' , fontSize : 'auto'}}>{ collapsed ? "RP" : "RETAIL POS"}</h3></div> 
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}>
        
            <Menu.Item key="/home"  icon= {<HomeOutlined /> } >
            <Link to="/home" style={{ textDecoration: 'none' }}>Home</Link>
            </Menu.Item>

            <Menu.Item key="/cart"  icon= {<ShoppingCartOutlined /> } >
            <Link to="/cart" style={{ textDecoration: 'none' }}>Cart</Link>
            </Menu.Item>

            <Menu.Item key="/bills"  icon= {<CopyOutlined />} >
            <Link to="/bills" style={{ textDecoration: 'none' }}>Bills</Link>
            </Menu.Item>

            <Menu.Item key="/items"  icon= {<UnorderedListOutlined />} >
            <Link to="/items" style={{ textDecoration: 'none' }}>Items</Link>
            </Menu.Item>

            <Menu.Item key="/customers"  icon= {<UserOutlined />} >
            <Link to="/customers" style={{ textDecoration: 'none' }}>Customers</Link>
            </Menu.Item>

            <Menu.Item key="/logout"  icon= {<LogoutOutlined />} onClick={()=>{
              localStorage.removeItem('pos-user');
              navigate('/login')
            }} >
            Logout
            </Menu.Item>

          </Menu>
          
        
      </Sider>
      <Layout>
      <Header className='site-layout-background'
  style={{
    padding: 10,
    background: colorBgContainer,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center' // Align items vertically in the center
    
  }}
>
  <Button
    type="text"
    className='menubutton'
    icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
    onClick={() => setCollapsed(!collapsed)}
    style={{
      fontSize: '16px',
      width: 64,
      height: 64,
    }}
  />
  <div className='cart-count' style={{ marginLeft: 'auto', display:'flex'}} onClick={()=>{navigate('/cart')}}>
    <h4 className='cart-count-h4'>{cartItems.length}</h4>
    <ShoppingCartOutlined />
  </div>
</Header>

        <Content className='site-layout '
          style={{
            margin: '10px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};
export default DefaultLayout;
