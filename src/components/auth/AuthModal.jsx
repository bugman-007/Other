import React, { useState } from 'react';
import { Modal, Form, Input, Button, Divider, Tabs, message } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined, GoogleOutlined, AppleOutlined, FacebookOutlined } from '@ant-design/icons';
import { FaInstagram } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const { TabPane } = Tabs;

const AuthModal = ({ open, onCancel, defaultTab = 'login', redirectPath }) => {
  const [form] = Form.useForm();
  const [activeTab, setActiveTab] = useState(defaultTab);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleAuth = (values) => {
    setLoading(true);
    
    // Check for fixed credentials
    if (activeTab === 'login') {
      if (values.email === 'user' && values.password === 'password') {
        // Correct credentials
        setTimeout(() => {
          setLoading(false);
          
          // Store authentication in localStorage
          localStorage.setItem('isAuthenticated', 'true');
          localStorage.setItem('userRole', 'user');
          
          // Dispatch auth-change event to update app state
          window.dispatchEvent(new Event('auth-change'));
          
          message.success('Logged in successfully!');
          
          // Close modal
          onCancel();
          
          // Only redirect if redirectPath is explicitly provided
          if (redirectPath) {
            navigate(redirectPath);
          }
        }, 1500);
      } else {
        // Invalid credentials
        setTimeout(() => {
          setLoading(false);
          message.error('Invalid credentials. Use email "user" and password "password"');
        }, 1000);
      }
    } else {
      // For registration, just simulate success
      setTimeout(() => {
        setLoading(false);
        
        // Store authentication in localStorage
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('userRole', 'user');
        
        // Dispatch auth-change event to update app state
        window.dispatchEvent(new Event('auth-change'));
        
        message.success('Registered successfully!');
        
        // Close modal
        onCancel();
        
        // Only redirect if redirectPath is explicitly provided
        if (redirectPath) {
          navigate(redirectPath);
        }
      }, 1500);
    }
  };

  const handleSocialLogin = (provider) => {
    setLoading(true);
    
    // Simulate social login with fixed credentials
    setTimeout(() => {
      setLoading(false);
      
      // Store authentication in localStorage
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('userRole', 'user');
      
      // Dispatch auth-change event to update app state
      window.dispatchEvent(new Event('auth-change'));
      
      message.success(`Logged in with ${provider} successfully!`);
      
      // Close modal
      onCancel();
      
      // Only redirect if redirectPath is explicitly provided
      if (redirectPath) {
        navigate(redirectPath);
      }
    }, 1500);
  };

  return (
    <Modal
      open={open}
      onCancel={onCancel}
      footer={null}
      width={400}
      className="auth-modal"
      title={null}
      centered
      closeIcon={
        <button className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors">
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      }
      maskClosable={true}
    >
      <div className="text-center mb-6">
        <div className="h-16 w-16 bg-[#464996] rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
          <img 
            className="h-10 w-10" 
            src="https://i.ibb.co/KjrQ65br/logo.png" 
            alt="KOKOMATTO" 
            onError={(e) => {
              e.target.onerror = null;
              e.target.alt = "K";
              e.target.className = "font-bold text-white text-xl";
            }}
          />
        </div>
        <h2 className="text-2xl font-bold">{activeTab === 'login' ? 'Welcome back' : 'Create an account'}</h2>
        <p className="text-gray-500 text-sm mt-1">
          {activeTab === 'login' 
            ? 'Sign in to continue to your account' 
            : 'Sign up to start shopping with virtual try-on'}
        </p>
      </div>

      <Tabs 
        activeKey={activeTab} 
        onChange={setActiveTab}
        centered
        className="auth-tabs"
      >
        <TabPane tab="Login" key="login">
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <Button 
                icon={<GoogleOutlined />} 
                block 
                className="flex items-center justify-center h-10 border border-gray-300 hover:bg-gray-50 hover:border-gray-400 transition-colors shadow-sm"
                onClick={() => handleSocialLogin('Google')}
                disabled={loading}
              >
                Google
              </Button>
              <Button 
                icon={<AppleOutlined />} 
                block 
                className="flex items-center justify-center h-10 bg-black text-white border border-black hover:bg-gray-900 transition-colors shadow-sm"
                onClick={() => handleSocialLogin('Apple')}
                disabled={loading}
              >
                Apple
              </Button>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <Button 
                icon={<FacebookOutlined />} 
                block 
                className="flex items-center justify-center h-10 bg-[#1877F2] text-white border border-[#1877F2] hover:bg-[#0a66c2] transition-colors shadow-sm"
                onClick={() => handleSocialLogin('Facebook')}
                disabled={loading}
              >
                Facebook
              </Button>
              <Button 
                icon={<FaInstagram className="mr-1" />} 
                block 
                className="flex items-center justify-center h-10 bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#FCAF45] text-white border-none hover:opacity-90 transition-opacity shadow-sm"
                onClick={() => handleSocialLogin('Instagram')}
                disabled={loading}
              >
                Instagram
              </Button>
            </div>
            
            <Divider plain>or</Divider>
            
            <Form
              form={form}
              layout="vertical"
              onFinish={handleAuth}
            >
              <Form.Item
                name="email"
                rules={[
                  { required: true, message: 'Please enter your email or username' },
                ]}
              >
                <Input 
                  prefix={<UserOutlined />} 
                  placeholder="Email or Username" 
                  size="large" 
                  disabled={loading}
                />
              </Form.Item>
              
              <Form.Item
                name="password"
                rules={[{ required: true, message: 'Please enter your password' }]}
              >
                <Input.Password 
                  prefix={<LockOutlined />} 
                  placeholder="Password" 
                  size="large" 
                  disabled={loading}
                />
              </Form.Item>
              
              <Form.Item className="mb-0">
                <div className="flex justify-between mb-4">
                  <Form.Item name="remember" valuePropName="checked" noStyle>
                    <div className="flex items-center">
                      <input type="checkbox" id="remember" className="mr-2" />
                      <label htmlFor="remember" className="text-sm text-gray-600">Remember me</label>
                    </div>
                  </Form.Item>
                  <a className="text-sm text-[#464996]" href="/forgot-password">
                    Forgot password?
                  </a>
                </div>
                
                <Button 
                  type="primary" 
                  htmlType="submit" 
                  block 
                  loading={loading}
                  className="h-10 bg-[#464996] hover:bg-[#3D3E7A]"
                >
                  Sign In
                </Button>

                <div className="mt-3 text-center">
                  <div className="text-xs text-gray-500 bg-gray-50 p-2 rounded border border-gray-200">
                    <strong>Demo credentials:</strong> username: "user", password: "password"
                  </div>
                </div>
              </Form.Item>
            </Form>
            
            <div className="text-center mt-4">
              <p className="text-sm text-gray-600">
                Don't have an account?{' '}
                <a 
                  className="text-[#464996] font-medium"
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveTab('register');
                  }}
                >
                  Sign up now
                </a>
              </p>
            </div>
          </div>
        </TabPane>
        <TabPane tab="Register" key="register">
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <Button 
                icon={<GoogleOutlined />} 
                block 
                className="flex items-center justify-center h-10 border border-gray-300 hover:bg-gray-50 hover:border-gray-400 transition-colors shadow-sm"
                onClick={() => handleSocialLogin('Google')}
                disabled={loading}
              >
                Google
              </Button>
              <Button 
                icon={<AppleOutlined />} 
                block 
                className="flex items-center justify-center h-10 bg-black text-white border border-black hover:bg-gray-900 transition-colors shadow-sm"
                onClick={() => handleSocialLogin('Apple')}
                disabled={loading}
              >
                Apple
              </Button>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <Button 
                icon={<FacebookOutlined />} 
                block 
                className="flex items-center justify-center h-10 bg-[#1877F2] text-white border border-[#1877F2] hover:bg-[#0a66c2] transition-colors shadow-sm"
                onClick={() => handleSocialLogin('Facebook')}
                disabled={loading}
              >
                Facebook
              </Button>
              <Button 
                icon={<FaInstagram className="mr-1" />} 
                block 
                className="flex items-center justify-center h-10 bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#FCAF45] text-white border-none hover:opacity-90 transition-opacity shadow-sm"
                onClick={() => handleSocialLogin('Instagram')}
                disabled={loading}
              >
                Instagram
              </Button>
            </div>
            
            <Divider plain>or</Divider>
            
            <Form
              form={form}
              layout="vertical"
              onFinish={handleAuth}
            >
              <Form.Item
                name="name"
                rules={[{ required: true, message: 'Please enter your name' }]}
              >
                <Input 
                  prefix={<UserOutlined />} 
                  placeholder="Full Name" 
                  size="large" 
                  disabled={loading}
                />
              </Form.Item>
              
              <Form.Item
                name="email"
                rules={[
                  { required: true, message: 'Please enter your email or username' },
                ]}
              >
                <Input 
                  prefix={<UserOutlined />} 
                  placeholder="Email or Username" 
                  size="large" 
                  disabled={loading}
                />
              </Form.Item>
              
              <Form.Item
                name="password"
                rules={[
                  { required: true, message: 'Please enter your password' },
                  { min: 8, message: 'Password must be at least 8 characters' }
                ]}
              >
                <Input.Password 
                  prefix={<LockOutlined />} 
                  placeholder="Password (min. 8 characters)" 
                  size="large" 
                  disabled={loading}
                />
              </Form.Item>
              
              <Form.Item className="mb-0">
                <div className="flex items-center mb-4">
                  <input type="checkbox" id="terms" className="mr-2" required />
                  <label htmlFor="terms" className="text-sm text-gray-600">
                    I agree to the <a className="text-[#464996]" href="/terms">Terms of Service</a> and <a className="text-[#464996]" href="/privacy">Privacy Policy</a>
                  </label>
                </div>
                
                <Button 
                  type="primary" 
                  htmlType="submit" 
                  block 
                  loading={loading}
                  className="h-10 bg-[#464996] hover:bg-[#3D3E7A]"
                >
                  Create Account
                </Button>
              </Form.Item>
            </Form>
            
            <div className="text-center mt-4">
              <p className="text-sm text-gray-600">
                Already have an account?{' '}
                <a 
                  className="text-[#464996] font-medium"
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveTab('login');
                  }}
                >
                  Sign in
                </a>
              </p>
            </div>
          </div>
        </TabPane>
      </Tabs>
    </Modal>
  );
};

export default AuthModal; 