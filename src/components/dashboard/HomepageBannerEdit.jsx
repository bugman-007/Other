import React, { useState, useEffect } from 'react';
import { 
  Form, Input, Button, Card, message, 
  Switch, Divider, Space, Typography 
} from 'antd';
import { SaveOutlined, UndoOutlined } from '@ant-design/icons';

const { TextArea } = Input;
const { Title } = Typography;

const HomepageBannerEdit = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [initialValues, setInitialValues] = useState({});

  useEffect(() => {
    fetchBannerContent();
  }, []);

  const fetchBannerContent = async () => {
    setLoading(true);
    try {
      // Simulate API call
      setTimeout(() => {
        const mockData = {
          mainHeading: "Try on clothes virtually before you buy",
          subHeading: "Our advanced 3D technology lets you see how clothes will look on you from the comfort of your home.",
          ctaButtonText: "Try Now",
          ctaButtonLink: "/try-on",
          isActive: true,
          backgroundColor: "#f0f2f5",
          textColor: "#333333",
          accentColor: "#1890ff",
          backgroundImage: "https://example.com/banner-bg.jpg",
          mobileBackgroundImage: "https://example.com/mobile-banner-bg.jpg"
        };
        
        form.setFieldsValue(mockData);
        setInitialValues(mockData);
        setLoading(false);
      }, 500);
    } catch (error) {
      console.error('Error fetching banner content:', error);
      message.error('Failed to load banner content');
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      setLoading(true);
      
      // Simulate API call
      setTimeout(() => {
        setInitialValues(values);
        setLoading(false);
        message.success('Banner content updated successfully');
      }, 500);
    } catch (error) {
      console.error('Validation error:', error);
    }
  };

  const resetForm = () => {
    form.setFieldsValue(initialValues);
    message.info('Form reset to last saved values');
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="mb-6">
        <Title level={4}>Homepage Banner</Title>
        <p className="text-gray-500">
          Customize the main banner that appears at the top of the homepage
        </p>
      </div>
      
      <Form
        form={form}
        layout="vertical"
        initialValues={initialValues}
      >
        <Card title="Content" className="mb-6">
          <Form.Item
            name="mainHeading"
            label="Main Heading"
            rules={[{ required: true, message: 'Please enter the main heading' }]}
          >
            <Input placeholder="Enter main heading" />
          </Form.Item>
          
          <Form.Item
            name="subHeading"
            label="Sub Heading"
            rules={[{ required: true, message: 'Please enter the sub heading' }]}
          >
            <TextArea 
              rows={3} 
              placeholder="Enter sub heading text" 
            />
          </Form.Item>
          
          <Form.Item
            name="ctaButtonText"
            label="CTA Button Text"
          >
            <Input placeholder="E.g., Try Now, Get Started" />
          </Form.Item>
          
          <Form.Item
            name="ctaButtonLink"
            label="CTA Button Link"
          >
            <Input placeholder="E.g., /try-on, /categories" />
          </Form.Item>
        </Card>
        
        <Card title="Styling" className="mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Form.Item
              name="backgroundColor"
              label="Background Color"
            >
              <Input type="color" />
            </Form.Item>
            
            <Form.Item
              name="textColor"
              label="Text Color"
            >
              <Input type="color" />
            </Form.Item>
            
            <Form.Item
              name="accentColor"
              label="Accent Color (for buttons)"
            >
              <Input type="color" />
            </Form.Item>
          </div>
          
          <Divider />
          
          <Form.Item
            name="backgroundImage"
            label="Background Image URL"
          >
            <Input placeholder="https://example.com/image.jpg" />
          </Form.Item>
          
          <Form.Item
            name="mobileBackgroundImage"
            label="Mobile Background Image URL (optional)"
          >
            <Input placeholder="https://example.com/mobile-image.jpg" />
          </Form.Item>
        </Card>
        
        <Card title="Settings" className="mb-6">
          <Form.Item
            name="isActive"
            valuePropName="checked"
            label="Display Banner"
          >
            <Switch checkedChildren="Active" unCheckedChildren="Hidden" />
          </Form.Item>
        </Card>
        
        <div className="flex justify-end">
          <Space>
            <Button 
              icon={<UndoOutlined />} 
              onClick={resetForm}
            >
              Reset
            </Button>
            <Button 
              type="primary" 
              icon={<SaveOutlined />} 
              onClick={handleSubmit}
              loading={loading}
            >
              Save Changes
            </Button>
          </Space>
        </div>
      </Form>
    </div>
  );
};

export default HomepageBannerEdit; 