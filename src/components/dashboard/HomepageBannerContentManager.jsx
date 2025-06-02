import React, { useState, useEffect } from 'react';
import { 
  Form, Input, Button, Card, message, 
  Typography, Space, Divider, Upload, Switch,
  Row, Col
} from 'antd';
import { UploadOutlined, SaveOutlined, UndoOutlined } from '@ant-design/icons';

const { TextArea } = Input;
const { Title, Text } = Typography;

const HomepageBannerContentManager = ({ initialBannerData, onUpdateBanner }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [initialValues, setInitialValues] = useState({});
  const [isChanged, setIsChanged] = useState(false);

  useEffect(() => {
    if (initialBannerData) {
      form.setFieldsValue(initialBannerData);
      setInitialValues(initialBannerData);
    } else {
      fetchBannerContent();
    }
  }, [initialBannerData, form]);

  const fetchBannerContent = async () => {
    setLoading(true);
    try {
      // Simulate API call
      setTimeout(() => {
        const mockData = {
          mainHeading: "Try on clothes virtually before you buy",
          subHeading: "Our advanced 3D technology lets you see how clothes will look on you from the comfort of your home.",
          ctaButtonText: "Start Now",
          ctaButtonLink: "/try-on",
          backgroundImage: "https://example.com/banner-bg.jpg",
          isActive: true,
          textColor: "#ffffff",
          backgroundColor: "#4a90e2",
          showGradient: true,
          gradientColor: "#2c3e50"
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

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      // Simulate API call
      setTimeout(() => {
        console.log('Saving banner content:', values);
        message.success('Banner content updated successfully');
        setInitialValues(values);
        setIsChanged(false);
        setLoading(false);
        if (onUpdateBanner) onUpdateBanner(values);
      }, 800);
    } catch (error) {
      console.error('Error saving banner content:', error);
      message.error('Failed to save banner content');
      setLoading(false);
    }
  };

  const handleReset = () => {
    form.setFieldsValue(initialValues);
    setIsChanged(false);
  };

  const handleValuesChange = () => {
    setIsChanged(true);
  };

  const beforeUpload = (file) => {
    const isImage = file.type.startsWith('image/');
    if (!isImage) {
      message.error('You can only upload image files!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must be smaller than 2MB!');
    }
    return isImage && isLt2M;
  };

  const customUploadRequest = ({ onSuccess }) => {
    // Simulate a successful upload after 1 second
    setTimeout(() => {
      onSuccess("https://example.com/uploaded-image.jpg");
      message.success('Image uploaded successfully');
      form.setFieldsValue({
        backgroundImage: "https://example.com/uploaded-image.jpg"
      });
      setIsChanged(true);
    }, 1000);
  };

  const BannerPreview = ({ values }) => {
    const gradientStyle = values.showGradient
      ? `linear-gradient(to right, ${values.backgroundColor}, ${values.gradientColor || '#000000'})`
      : values.backgroundColor;

    return (
      <div 
        className="w-full p-8 rounded-lg mb-6 relative overflow-hidden"
        style={{ 
          background: gradientStyle,
          color: values.textColor,
          minHeight: '200px'
        }}
      >
        {values.backgroundImage && (
          <div 
            className="absolute inset-0 bg-cover bg-center z-0 opacity-30"
            style={{ backgroundImage: `url(${values.backgroundImage})` }}
          ></div>
        )}
        <div className="relative z-10">
          <h2 className="text-2xl font-bold mb-2">{values.mainHeading}</h2>
          <p className="mb-4">{values.subHeading}</p>
          {values.ctaButtonText && (
            <button 
              className="px-4 py-2 rounded text-white"
              style={{ backgroundColor: '#1890ff' }}
            >
              {values.ctaButtonText}
            </button>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="mb-6">
        <Title level={4}>Homepage Banner Content</Title>
        <Text type="secondary">
          Customize the main banner that appears at the top of your homepage
        </Text>
      </div>

      <Card title="Live Preview" className="mb-6">
        <BannerPreview values={form.getFieldsValue(true)} />
        <Text type="secondary" className="block mt-2">
          This is a simplified preview. The actual banner may appear differently based on your site's theme and layout.
        </Text>
      </Card>

      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        onValuesChange={handleValuesChange}
      >
        <Divider orientation="left">Content</Divider>
        
        <Row gutter={16}>
          <Col xs={24} md={12}>
            <Form.Item
              name="mainHeading"
              label="Main Heading"
              rules={[{ required: true, message: 'Please enter the main heading' }]}
            >
              <Input placeholder="Enter main heading text" />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item
              name="isActive"
              label="Display Banner"
              valuePropName="checked"
            >
              <Switch checkedChildren="Visible" unCheckedChildren="Hidden" />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item
          name="subHeading"
          label="Sub-heading"
          rules={[{ required: true, message: 'Please enter the sub-heading' }]}
        >
          <TextArea 
            rows={3} 
            placeholder="Enter sub-heading text" 
          />
        </Form.Item>

        <Row gutter={16}>
          <Col xs={24} md={12}>
            <Form.Item
              name="ctaButtonText"
              label="Call-to-Action Button Text"
            >
              <Input placeholder="E.g., Get Started, Learn More" />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item
              name="ctaButtonLink"
              label="Button Link"
              rules={[{ type: 'url', message: 'Please enter a valid URL' }]}
            >
              <Input placeholder="E.g., /try-on, /categories" />
            </Form.Item>
          </Col>
        </Row>

        <Divider orientation="left">Appearance</Divider>

        <Row gutter={16}>
          <Col xs={24} md={12}>
            <Form.Item
              name="backgroundColor"
              label="Background Color"
            >
              <Input type="color" />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item
              name="textColor"
              label="Text Color"
            >
              <Input type="color" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col xs={24} md={12}>
            <Form.Item
              name="showGradient"
              valuePropName="checked"
              label="Use Gradient Background"
            >
              <Switch />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item
              name="gradientColor"
              label="Gradient End Color"
              dependencies={['showGradient']}
            >
              <Input 
                type="color" 
                disabled={!form.getFieldValue('showGradient')} 
              />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item
          name="backgroundImage"
          label="Background Image"
          extra="Recommended size: 1920x600 pixels. Max file size: 2MB."
        >
          <Input placeholder="Image URL" />
        </Form.Item>

        <Form.Item>
          <Upload
            name="backgroundImage"
            listType="picture"
            maxCount={1}
            beforeUpload={beforeUpload}
            customRequest={customUploadRequest}
            showUploadList={false}
          >
            <Button icon={<UploadOutlined />}>Upload New Background Image</Button>
          </Upload>
        </Form.Item>

        <Divider />

        <Form.Item>
          <Space>
            <Button 
              type="primary" 
              htmlType="submit" 
              loading={loading}
              icon={<SaveOutlined />}
              disabled={!isChanged}
            >
              Save Changes
            </Button>
            <Button 
              onClick={handleReset} 
              disabled={!isChanged || loading}
              icon={<UndoOutlined />}
            >
              Reset
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </div>
  );
};

export default HomepageBannerContentManager; 