import React, { useState, useEffect } from 'react';
import { 
  Form, 
  Input, 
  Select, 
  Switch, 
  Checkbox, 
  InputNumber, 
  Upload, 
  Button, 
  Divider, 
  Space, 
  message,
  Typography
} from 'antd';
import { UploadOutlined, InfoCircleOutlined } from '@ant-design/icons';

const { TextArea } = Input;
const { Option } = Select;
const { Title, Text } = Typography;

const PAGE_OPTIONS = [
  { label: 'Home', value: 'home' },
  { label: 'Categories', value: 'categories' },
  { label: 'Try-on', value: 'try-on' },
  { label: 'About', value: 'about' },
  { label: 'Contact', value: 'contact' }
];

const POPUP_POSITIONS = [
  { label: 'Center', value: 'center' },
  { label: 'Top', value: 'top' },
  { label: 'Bottom', value: 'bottom' },
  { label: 'Top Left', value: 'topLeft' },
  { label: 'Top Right', value: 'topRight' },
  { label: 'Bottom Left', value: 'bottomLeft' },
  { label: 'Bottom Right', value: 'bottomRight' }
];

const POPUP_TYPES = [
  { label: 'Info', value: 'info' },
  { label: 'Success', value: 'success' },
  { label: 'Warning', value: 'warning' },
  { label: 'Tutorial', value: 'tutorial' }
];

const POPUP_SIZES = [
  { label: 'Small', value: 'small' },
  { label: 'Medium', value: 'medium' },
  { label: 'Large', value: 'large' }
];

const PopupForm = ({ popup, onSave, onCancel }) => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  
  // Initialize form with popup data if editing
  useEffect(() => {
    if (popup) {
      form.setFieldsValue({
        ...popup,
        // Convert deviceTargeting object to boolean values for form fields
        desktopEnabled: popup.deviceTargeting?.desktop || false,
        tabletEnabled: popup.deviceTargeting?.tablet || false,
        mobileEnabled: popup.deviceTargeting?.mobile || false
      });
      
      // Set initial file list if there's an image URL
      if (popup.imageUrl) {
        setFileList([{
          uid: '-1',
          name: 'popup-image.jpg',
          status: 'done',
          url: popup.imageUrl,
        }]);
      }
    }
  }, [popup, form]);
  
  const handleFinish = (values) => {
    // Prepare device targeting from individual boolean fields
    const deviceTargeting = {
      desktop: values.desktopEnabled || false,
      tablet: values.tabletEnabled || false,
      mobile: values.mobileEnabled || false
    };
    
    // Build updated popup object
    const updatedPopup = {
      ...popup,
      ...values,
      deviceTargeting,
      // Use existing imageUrl if no new file uploaded
      imageUrl: fileList.length > 0 && fileList[0].url ? fileList[0].url : (popup ? popup.imageUrl : '')
    };
    
    // Remove form-specific fields
    delete updatedPopup.desktopEnabled;
    delete updatedPopup.tabletEnabled;
    delete updatedPopup.mobileEnabled;
    
    onSave(updatedPopup);
  };
  
  const handleUploadChange = ({ fileList }) => {
    setFileList(fileList);
    
    // Simulate image upload
    if (fileList.length > 0 && fileList[0].status === 'uploading') {
      setIsUploading(true);
    } else if (fileList.length > 0 && fileList[0].status === 'done') {
      setIsUploading(false);
      // In a real app, you would get the URL from response
      // For demo, we'll just use a placeholder URL
      fileList[0].url = 'https://via.placeholder.com/300x200';
    }
  };
  
  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleFinish}
      initialValues={{
        title: '',
        content: '',
        enabled: true,
        pages: ['home'],
        showOnce: true,
        position: 'center',
        size: 'medium',
        delay: 1,
        type: 'info',
        desktopEnabled: true,
        tabletEnabled: true,
        mobileEnabled: true
      }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Form.Item
            name="title"
            label="Popup Title"
            rules={[{ required: true, message: 'Please enter a title' }]}
          >
            <Input placeholder="Enter popup title" />
          </Form.Item>
          
          <Form.Item
            name="content"
            label="Popup Content"
            rules={[{ required: true, message: 'Please enter content' }]}
          >
            <TextArea
              placeholder="Enter the content for your popup"
              autoSize={{ minRows: 4, maxRows: 8 }}
            />
          </Form.Item>
          
          <Form.Item
            name="imageUrl"
            label="Popup Image"
          >
            <Upload
              listType="picture"
              fileList={fileList}
              onChange={handleUploadChange}
              beforeUpload={() => false}
              maxCount={1}
            >
              <Button icon={<UploadOutlined />} loading={isUploading}>
                Select Image
              </Button>
            </Upload>
            <Text type="secondary" className="block mt-2">
              <InfoCircleOutlined className="mr-1" />
              Recommended size: 800x600px. Max file size: 2MB.
            </Text>
          </Form.Item>
        </div>
        
        <div>
          <Form.Item
            name="type"
            label="Popup Type"
          >
            <Select>
              {POPUP_TYPES.map(type => (
                <Option key={type.value} value={type.value}>{type.label}</Option>
              ))}
            </Select>
          </Form.Item>
          
          <Form.Item
            name="pages"
            label="Display on Pages"
            rules={[{ required: true, message: 'Please select at least one page' }]}
          >
            <Select mode="multiple" placeholder="Select pages">
              {PAGE_OPTIONS.map(page => (
                <Option key={page.value} value={page.value}>{page.label}</Option>
              ))}
            </Select>
          </Form.Item>
          
          <div className="grid grid-cols-2 gap-4">
            <Form.Item
              name="position"
              label="Position"
            >
              <Select>
                {POPUP_POSITIONS.map(pos => (
                  <Option key={pos.value} value={pos.value}>{pos.label}</Option>
                ))}
              </Select>
            </Form.Item>
            
            <Form.Item
              name="size"
              label="Size"
            >
              <Select>
                {POPUP_SIZES.map(size => (
                  <Option key={size.value} value={size.value}>{size.label}</Option>
                ))}
              </Select>
            </Form.Item>
          </div>
          
          <Form.Item
            name="delay"
            label="Display Delay (seconds)"
          >
            <InputNumber min={0} max={60} />
          </Form.Item>
          
          <Divider orientation="left">Device Targeting</Divider>
          
          <div className="space-y-2">
            <Form.Item name="desktopEnabled" valuePropName="checked">
              <Checkbox>Desktop</Checkbox>
            </Form.Item>
            
            <Form.Item name="tabletEnabled" valuePropName="checked">
              <Checkbox>Tablet</Checkbox>
            </Form.Item>
            
            <Form.Item name="mobileEnabled" valuePropName="checked">
              <Checkbox>Mobile</Checkbox>
            </Form.Item>
          </div>
          
          <Divider />
          
          <div className="space-y-2">
            <Form.Item name="enabled" valuePropName="checked">
              <Switch checkedChildren="Active" unCheckedChildren="Inactive" />
              <Text className="ml-2">Display Status</Text>
            </Form.Item>
            
            <Form.Item name="showOnce" valuePropName="checked">
              <Switch />
              <Text className="ml-2">Show only once per user</Text>
            </Form.Item>
          </div>
        </div>
      </div>
    </Form>
  );
};

export default PopupForm; 