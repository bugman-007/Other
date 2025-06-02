import React, { useState } from 'react';
import { Layout, Menu, Typography, Breadcrumb, Avatar, Dropdown, Button } from 'antd';
import {
  HomeOutlined,
  AppstoreOutlined,
  FileTextOutlined,
  SettingOutlined,
  UserOutlined,
  BellOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PictureOutlined,
  NotificationOutlined,
  TagsOutlined,
  ShoppingOutlined,
  DashboardOutlined
} from '@ant-design/icons';
import { useNavigate, Routes, Route, Link, useLocation } from 'react-router-dom';
import HomepageBannerContentManager from '../components/dashboard/HomepageBannerContentManager';
import ContentPopupManager from '../components/dashboard/ContentPopupManager';

const { Header, Content, Sider } = Layout;
const { Title, Text } = Typography;

const DashboardPage = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    // Remove auth token or user data from localStorage
    localStorage.removeItem('isAuthenticated');
    navigate('/login');
  };

  const userMenuItems = [
    {
      key: '1',
      label: 'Profile Settings',
      icon: <UserOutlined />,
    },
    {
      key: '2',
      label: 'Notifications',
      icon: <BellOutlined />,
    },
    {
      type: 'divider',
    },
    {
      key: '3',
      label: 'Logout',
      icon: <LogoutOutlined />,
      danger: true,
      onClick: handleLogout,
    },
  ];

  const getBreadcrumbItems = () => {
    const pathSnippets = location.pathname.split('/').filter(i => i);
    const breadcrumbItems = [
      {
        title: <Link to="/dashboard"><HomeOutlined /> Dashboard</Link>,
        key: 'dashboard'
      }
    ];

    if (pathSnippets.length > 1) {
      const title = pathSnippets[1].charAt(0).toUpperCase() + pathSnippets[1].slice(1).replace(/-/g, ' ');
      breadcrumbItems.push({
        title,
        key: pathSnippets[1]
      });
    }

    return breadcrumbItems;
  };

  const getCurrentContentComponent = () => {
    const path = location.pathname;
    
    if (path.includes('/banner')) {
      return <HomepageBannerContentManager />;
    } else if (path.includes('/popups')) {
      return <ContentPopupManager />;
    }
    
    // Default dashboard content
    return (
      <div className="bg-white p-6 rounded-lg shadow">
        <Title level={4}>Dashboard Overview</Title>
        <Text>Welcome to your content management dashboard. Select an option from the menu to manage your store content.</Text>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
          <Card 
            title="Homepage Banner" 
            icon={<PictureOutlined />}
            description="Edit your main homepage banner content"
            onClick={() => navigate('/dashboard/banner')}
          />
          <Card 
            title="Content Popups" 
            icon={<NotificationOutlined />}
            description="Manage promotional popups across your store"
            onClick={() => navigate('/dashboard/popups')}
          />
          <Card 
            title="Products" 
            icon={<ShoppingOutlined />}
            description="Manage your product catalog"
            onClick={() => navigate('/dashboard/products')}
          />
          <Card 
            title="Categories" 
            icon={<AppstoreOutlined />}
            description="Organize your product categories"
            onClick={() => navigate('/dashboard/categories')}
          />
          <Card 
            title="Analytics" 
            icon={<DashboardOutlined />}
            description="View store performance metrics"
            onClick={() => navigate('/dashboard/analytics')}
          />
          <Card 
            title="Settings" 
            icon={<SettingOutlined />}
            description="Configure store settings"
            onClick={() => navigate('/dashboard/settings')}
          />
        </div>
      </div>
    );
  };

  // Card component for dashboard menu
  const Card = ({ title, icon, description, onClick }) => (
    <div 
      className="border border-gray-200 rounded-lg p-5 cursor-pointer hover:shadow-md transition-shadow"
      onClick={onClick}
    >
      <div className="flex items-center mb-2">
        <div className="text-blue-500 text-xl mr-2">{icon}</div>
        <h3 className="text-lg font-medium">{title}</h3>
      </div>
      <p className="text-gray-600">{description}</p>
    </div>
  );

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider 
        collapsible 
        collapsed={collapsed} 
        onCollapse={(value) => setCollapsed(value)}
        width={240}
      >
        <div className="logo p-4 flex items-center justify-center">
          {!collapsed ? (
            <Text strong className="text-lg text-white">Virtual Try-On</Text>
          ) : (
            <Text strong className="text-lg text-white">VTO</Text>
          )}
        </div>
        <Menu
          theme="dark"
          defaultSelectedKeys={['1']}
          mode="inline"
          items={[
            {
              key: '1',
              icon: <HomeOutlined />,
              label: 'Dashboard',
              onClick: () => navigate('/dashboard')
            },
            {
              key: '2',
              icon: <FileTextOutlined />,
              label: 'Content',
              children: [
                {
                  key: '2-1',
                  icon: <PictureOutlined />,
                  label: 'Homepage Banner',
                  onClick: () => navigate('/dashboard/banner')
                },
                {
                  key: '2-2',
                  icon: <NotificationOutlined />,
                  label: 'Popups',
                  onClick: () => navigate('/dashboard/popups')
                }
              ]
            },
            {
              key: '3',
              icon: <ShoppingOutlined />,
              label: 'Products',
              children: [
                {
                  key: '3-1',
                  label: 'All Products',
                  onClick: () => navigate('/dashboard/products')
                },
                {
                  key: '3-2',
                  label: 'Categories',
                  onClick: () => navigate('/dashboard/categories')
                },
                {
                  key: '3-3',
                  label: 'Tags',
                  onClick: () => navigate('/dashboard/tags')
                }
              ]
            },
            {
              key: '4',
              icon: <SettingOutlined />,
              label: 'Settings',
              onClick: () => navigate('/dashboard/settings')
            }
          ]}
        />
      </Sider>
      <Layout>
        <Header className="flex justify-between items-center px-4 bg-white border-b border-gray-200">
          <div className="flex items-center">
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
            />
          </div>
          <div className="flex items-center space-x-4">
            <Button type="text" icon={<BellOutlined />} />
            <Dropdown menu={{ items: userMenuItems }} placement="bottomRight" arrow>
              <div className="cursor-pointer flex items-center">
                <Avatar icon={<UserOutlined />} />
                {!collapsed && (
                  <Text className="ml-2">Admin User</Text>
                )}
              </div>
            </Dropdown>
          </div>
        </Header>
        <Content className="m-4">
          <Breadcrumb items={getBreadcrumbItems()} className="mb-4" />
          {getCurrentContentComponent()}
        </Content>
      </Layout>
    </Layout>
  );
};

export default DashboardPage; 