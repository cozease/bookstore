import React, { useState } from 'react';
import { Layout, Menu, Space } from 'antd';
import {
  HomeOutlined,
  ShoppingCartOutlined,
  FileTextOutlined,
  UserOutlined,
  SmileOutlined,
  BookOutlined
} from '@ant-design/icons';
import { Link, Outlet, useLocation } from 'react-router-dom';
import data from '../assets/data.json';

const { Header, Sider, Content, Footer } = Layout;

const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  // 根据当前路径确定菜单选中项
  const getSelectedKey = () => {
    const path = location.pathname;
    if (path === '/') return '1';
    if (path === '/cart') return '2';
    if (path === '/orders') return '3';
    if (path === '/profile') return '4';
    return '1';
  };

  return (
    <Layout>
      <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed}>
        <div className="logo">
          <BookOutlined/>
          {!collapsed && <span>在线书店</span>}
        </div>
        <Menu theme="dark" mode="inline" selectedKeys={[getSelectedKey()]}>
          <Menu.Item key="1" icon={<HomeOutlined />}>
            <Link to="/">主页</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<ShoppingCartOutlined />}>
            <Link to="/cart">购物车</Link>
          </Menu.Item>
          <Menu.Item key="3" icon={<FileTextOutlined />}>
            <Link to="/orders">我的订单</Link>
          </Menu.Item>
          <Menu.Item key="4" icon={<UserOutlined />}>
            <Link to="/profile">个人信息</Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header style={{ background: '#fff', textAlign: 'right' }}>
          <Space>Hi, {data.userInfo.username}! <SmileOutlined /></Space>
        </Header>
        <Content className="content-container">
          <div className="site-layout-content">
            <Outlet />
          </div>
        </Content>
        <Footer style={{ background: '#fff', textAlign: 'center' }}>
          SJTU-SE ©{new Date().getFullYear()} Created by cozease
        </Footer>
      </Layout>
    </Layout>
  );
};

export default MainLayout;

