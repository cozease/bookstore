import React, { useState, useEffect } from 'react';
import { Layout, Menu, Space, Button } from 'antd';
import {
  HomeOutlined,
  ShoppingCartOutlined,
  FileTextOutlined,
  UserOutlined,
  SmileOutlined,
  BookOutlined,
  LoginOutlined,
  LogoutOutlined,
  EditOutlined,
  TeamOutlined
} from '@ant-design/icons';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import '../css/Layout.css';

const { Header, Sider, Content, Footer } = Layout;

const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    navigate('/login');
  };

  // 根据当前路径确定菜单选中项
  const getSelectedKey = () => {
    const path = location.pathname;
    if (path === '/') return '1';
    if (path === '/cart') return '2';
    if (path === '/orders') return '3';
    if (path === '/profile') return '4';
    if (path === '/book-manage') return '5';
    if (path === '/user-manage') return '6';
    return '1';
  };

  return (
    <Layout className="main-layout">
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={setCollapsed}
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'sticky',
          insetInlineStart: 0,
          top: 0,
          bottom: 0,
          scrollbarWidth: 'thin',
          scrollbarGutter: 'stable',
        }}
      >
        <div className="logo">
          <BookOutlined /> {!collapsed && <span>在线书店</span>}
        </div>
        <Menu theme="dark" selectedKeys={[getSelectedKey()]} mode="inline">
          <Menu.Item key="1" icon={<HomeOutlined />}>
            <Link to="/">首页</Link>
          </Menu.Item>
          {user && (
            <>
              <Menu.Item key="2" icon={<ShoppingCartOutlined />}>
                <Link to="/cart">购物车</Link>
              </Menu.Item>
              <Menu.Item key="3" icon={<FileTextOutlined />}>
                <Link to="/orders">订单</Link>
              </Menu.Item>
              <Menu.Item key="4" icon={<UserOutlined />}>
                <Link to="/profile">个人信息</Link>
              </Menu.Item>
              {user.isAdmin && (
                <>
                  <Menu.Item key="5" icon={<EditOutlined />}>
                    <Link to="/book-manage">图书管理</Link>
                  </Menu.Item>
                  <Menu.Item key="6" icon={<TeamOutlined />}>
                    <Link to="/user-manage">用户管理</Link>
                  </Menu.Item>
                </>
              )}
            </>
          )}
        </Menu>
      </Sider>
      <Layout>
        <Header className="header">
          <Space>
            {user ? (
              <>
                <span>欢迎, {user.username}! {user.isAdmin && <span>(管理员)</span>} <SmileOutlined /></span>
                <Button 
                  type="link" 
                  icon={<LogoutOutlined />}
                  onClick={handleLogout}
                >
                  退出登录
                </Button>
              </>
            ) : (
              <Link to="/login">
                <Button type="link" icon={<LoginOutlined />}>点此登录</Button>
              </Link>
            )}
          </Space>
        </Header>
        <Content className="content-container">
          <div className="site-layout-content">
            <Outlet />
          </div>
        </Content>
        <Footer className="footer">
          SJTU-SE ©{new Date().getFullYear()} Created by cozease
        </Footer>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
