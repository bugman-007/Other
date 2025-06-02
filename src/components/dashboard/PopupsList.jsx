import React, { useState, useEffect } from 'react';
import { 
  Table, 
  Button, 
  Modal, 
  Form, 
  Input, 
  Select, 
  InputNumber, 
  Switch, 
  message,
  Popconfirm
} from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import Popup from '../Popup';

const { Option } = Select;
const { TextArea } = Input;

const PopupsList = () => {
  const [popups, setPopups] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isPreviewVisible, setIsPreviewVisible] = useState(false);
  const [editingPopup, setEditingPopup] = useState(null);
  const [previewPopup, setPreviewPopup] = useState(null);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Load popups from backend
    fetchPopups();
  }, []);

  const fetchPopups = async () => {
    setLoading(true);
    try {
      // Replace with actual API call
      // const response = await api.get('/popups');
      // setPopups(response.data);
      
      // Mock data for now
      setTimeout(() => {
        setPopups([
          {
            id: '1',
            title: 'Welcome to 3D Try On',
            content: 'Try on clothes virtually before you buy. Our advanced 3D technology lets you see how clothes will look on you.',
            position: 'center',
            pages: ['homepage'],
            imageUrl: 'https://example.com/popup-image.jpg',
            buttonText: 'Got it',
            buttonColor: 'blue',
            showSecondaryButton: true,
            secondaryButtonText: 'Learn More',
            secondaryButtonColor: 'gray',
            delay: 2,
            isActive: true
          },
          {
            id: '2',
            title: 'How to Position',
            content: 'Stand 2-3 feet away from your camera with your full body visible. Keep your arms slightly away from your body.',
            position: 'bottom-right',
            pages: ['try-on'],
            buttonText: 'OK',
            buttonColor: 'green',
            showSecondaryButton: false,
            delay: 1,
            isActive: true
          }
        ]);
        setLoading(false);
      }, 500);
    } catch (error) {
      console.error('Error fetching popups:', error);
      message.error('Failed to load popups');
      setLoading(false);
    }
  };

  const showModal = (popup = null) => {
    setEditingPopup(popup);
    if (popup) {
      form.setFieldsValue({
        ...popup,
        pages: popup.pages || []
      });
    } else {
      form.resetFields();
      form.setFieldsValue({
        position: 'center',
        buttonColor: 'blue',
        secondaryButtonColor: 'gray',
        delay: 0,
        isActive: true,
        showSecondaryButton: false,
        pages: ['all']
      });
    }
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setEditingPopup(null);
    form.resetFields();
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      setLoading(true);
      
      if (editingPopup) {
        // Update existing popup
        // await api.put(`/popups/${editingPopup.id}`, values);
        
        // Mock update
        const updatedPopups = popups.map(p => 
          p.id === editingPopup.id ? { ...p, ...values } : p
        );
        setPopups(updatedPopups);
        message.success('Popup updated successfully');
      } else {
        // Create new popup
        // const response = await api.post('/popups', values);
        
        // Mock create
        const newPopup = {
          id: Date.now().toString(),
          ...values
        };
        setPopups([...popups, newPopup]);
        message.success('Popup created successfully');
      }
      
      setIsModalVisible(false);
      setEditingPopup(null);
      form.resetFields();
    } catch (error) {
      console.error('Error saving popup:', error);
      message.error('Failed to save popup');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    setLoading(true);
    try {
      // await api.delete(`/popups/${id}`);
      
      // Mock delete
      const updatedPopups = popups.filter(p => p.id !== id);
      setPopups(updatedPopups);
      message.success('Popup deleted successfully');
    } catch (error) {
      console.error('Error deleting popup:', error);
      message.error('Failed to delete popup');
    } finally {
      setLoading(false);
    }
  };

  const handlePreview = (popup) => {
    setPreviewPopup(popup);
    setIsPreviewVisible(true);
  };

  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      render: (text) => <span className="font-medium">{text}</span>
    },
    {
      title: 'Position',
      dataIndex: 'position',
      key: 'position',
      render: (position) => {
        const positionMap = {
          'center': 'Center',
          'top-left': 'Top Left',
          'top-right': 'Top Right',
          'bottom-left': 'Bottom Left',
          'bottom-right': 'Bottom Right'
        };
        return positionMap[position] || position;
      }
    },
    {
      title: 'Pages',
      dataIndex: 'pages',
      key: 'pages',
      render: (pages) => {
        if (!pages || pages.includes('all')) return 'All Pages';
        return pages.join(', ');
      }
    },
    {
      title: 'Delay (seconds)',
      dataIndex: 'delay',
      key: 'delay'
    },
    {
      title: 'Status',
      dataIndex: 'isActive',
      key: 'isActive',
      render: (isActive) => (
        <span className={isActive ? 'text-green-600' : 'text-red-600'}>
          {isActive ? 'Active' : 'Inactive'}
        </span>
      )
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <div className="flex space-x-2">
          <Button 
            icon={<EyeOutlined />} 
            onClick={() => handlePreview(record)} 
            size="small"
          />
          <Button 
            icon={<EditOutlined />} 
            onClick={() => showModal(record)} 
            size="small"
          />
          <Popconfirm
            title="Are you sure you want to delete this popup?"
            onConfirm={() => handleDelete(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button icon={<DeleteOutlined />} danger size="small" />
          </Popconfirm>
        </div>
      )
    }
  ];

  const pageOptions = [
    { label: 'All Pages', value: 'all' },
    { label: 'Homepage', value: 'homepage' },
    { label: 'Categories', value: 'categories' },
    { label: 'Try-On', value: 'try-on' },
    { label: 'Product', value: 'product' },
    { label: 'Checkout', value: 'checkout' }
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Manage Popups</h2>
        <Button 
          type="primary" 
          icon={<PlusOutlined />} 
          onClick={() => showModal()}
        >
          Add New Popup
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={popups}
        rowKey="id"
        loading={loading}
        pagination={{ pageSize: 5 }}
      />

      <Modal
        title={editingPopup ? "Edit Popup" : "Create Popup"}
        open={isModalVisible}
        onOk={handleSubmit}
        onCancel={handleCancel}
        width={700}
        okText={editingPopup ? "Update" : "Create"}
        confirmLoading={loading}
      >
        <Form
          form={form}
          layout="vertical"
        >
          <Form.Item
            name="title"
            label="Title"
            rules={[{ required: true, message: 'Please enter a title' }]}
          >
            <Input placeholder="Enter popup title" />
          </Form.Item>

          <Form.Item
            name="content"
            label="Content"
            rules={[{ required: true, message: 'Please enter content' }]}
          >
            <TextArea rows={4} placeholder="Enter popup content" />
          </Form.Item>

          <Form.Item
            name="imageUrl"
            label="Image URL (optional)"
          >
            <Input placeholder="Enter image URL" />
          </Form.Item>

          <div className="grid grid-cols-2 gap-4">
            <Form.Item
              name="position"
              label="Position"
              rules={[{ required: true }]}
            >
              <Select placeholder="Select position">
                <Option value="center">Center</Option>
                <Option value="top-left">Top Left</Option>
                <Option value="top-right">Top Right</Option>
                <Option value="bottom-left">Bottom Left</Option>
                <Option value="bottom-right">Bottom Right</Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="delay"
              label="Delay (seconds)"
              rules={[{ required: true }]}
            >
              <InputNumber min={0} max={30} className="w-full" />
            </Form.Item>
          </div>

          <Form.Item
            name="pages"
            label="Show on Pages"
            rules={[{ required: true, message: 'Please select at least one page' }]}
          >
            <Select 
              mode="multiple" 
              placeholder="Select pages"
              options={pageOptions}
            />
          </Form.Item>

          <div className="grid grid-cols-2 gap-4">
            <Form.Item
              name="buttonText"
              label="Primary Button Text"
              rules={[{ required: true }]}
            >
              <Input placeholder="E.g., OK or Got it" />
            </Form.Item>

            <Form.Item
              name="buttonColor"
              label="Primary Button Color"
              rules={[{ required: true }]}
            >
              <Select placeholder="Select color">
                <Option value="blue">Blue</Option>
                <Option value="green">Green</Option>
                <Option value="red">Red</Option>
                <Option value="yellow">Yellow</Option>
                <Option value="purple">Purple</Option>
                <Option value="gray">Gray</Option>
              </Select>
            </Form.Item>
          </div>

          <Form.Item
            name="showSecondaryButton"
            label="Show Secondary Button"
            valuePropName="checked"
          >
            <Switch />
          </Form.Item>

          <Form.Item
            noStyle
            shouldUpdate={(prevValues, currentValues) => 
              prevValues.showSecondaryButton !== currentValues.showSecondaryButton
            }
          >
            {({ getFieldValue }) => 
              getFieldValue('showSecondaryButton') ? (
                <div className="grid grid-cols-2 gap-4">
                  <Form.Item
                    name="secondaryButtonText"
                    label="Secondary Button Text"
                    rules={[{ required: true, message: 'Please enter secondary button text' }]}
                  >
                    <Input placeholder="E.g., Cancel or Learn More" />
                  </Form.Item>

                  <Form.Item
                    name="secondaryButtonColor"
                    label="Secondary Button Color"
                    rules={[{ required: true }]}
                  >
                    <Select placeholder="Select color">
                      <Option value="blue">Blue</Option>
                      <Option value="green">Green</Option>
                      <Option value="red">Red</Option>
                      <Option value="yellow">Yellow</Option>
                      <Option value="purple">Purple</Option>
                      <Option value="gray">Gray</Option>
                    </Select>
                  </Form.Item>
                </div>
              ) : null
            }
          </Form.Item>

          <Form.Item
            name="isActive"
            label="Status"
            valuePropName="checked"
          >
            <Switch checkedChildren="Active" unCheckedChildren="Inactive" />
          </Form.Item>
        </Form>
      </Modal>

      {isPreviewVisible && previewPopup && (
        <Popup
          popup={previewPopup}
          onClose={() => setIsPreviewVisible(false)}
          onSecondaryAction={() => setIsPreviewVisible(false)}
        />
      )}
    </div>
  );
};

export default PopupsList; 