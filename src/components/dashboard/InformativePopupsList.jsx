import React, { useState, useEffect } from 'react';
import { 
  Table, Button, Modal, Form, Input, Select, Switch, 
  Popconfirm, message, Tooltip, Tabs, Space, Tag
} from 'antd';
import { 
  PlusOutlined, EditOutlined, DeleteOutlined, 
  EyeOutlined, InfoCircleOutlined, CloseCircleOutlined 
} from '@ant-design/icons';

const { TextArea } = Input;
const { Option } = Select;
const { TabPane } = Tabs;

const InformativePopupsList = () => {
  const [popups, setPopups] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingPopup, setEditingPopup] = useState(null);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewPopup, setPreviewPopup] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchPopups();
  }, []);

  const fetchPopups = async () => {
    setLoading(true);
    try {
      // Simulate API call
      setTimeout(() => {
        const mockData = [
          {
            id: 1,
            title: 'How to Position',
            content: 'Stand 2-3 feet away from your camera with your arms slightly away from your body for the best scanning results.',
            pageUrl: '/try-on',
            position: 'center',
            timing: 'onLoad',
            delaySeconds: 1,
            showOnce: true,
            isActive: true,
            dismissible: true,
            style: {
              backgroundColor: '#f0f8ff',
              textColor: '#333333',
              borderColor: '#1890ff',
              width: '400px'
            },
            createdAt: '2023-08-15T14:30:00Z',
            updatedAt: '2023-08-15T14:30:00Z'
          },
          {
            id: 2,
            title: 'New Features Available',
            content: 'Check out our new collection of summer clothes now available for virtual try-on!',
            pageUrl: '/categories',
            position: 'bottomRight',
            timing: 'afterDelay',
            delaySeconds: 5,
            showOnce: false,
            isActive: true,
            dismissible: true,
            style: {
              backgroundColor: '#fff2e8',
              textColor: '#d46b08',
              borderColor: '#ffbb96',
              width: '350px'
            },
            createdAt: '2023-08-10T09:15:00Z',
            updatedAt: '2023-08-10T09:15:00Z'
          }
        ];
        setPopups(mockData);
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
        backgroundColor: popup.style.backgroundColor,
        textColor: popup.style.textColor,
        borderColor: popup.style.borderColor,
        width: popup.style.width
      });
    } else {
      form.resetFields();
      // Set defaults
      form.setFieldsValue({
        position: 'center',
        timing: 'onLoad',
        delaySeconds: 0,
        showOnce: false,
        isActive: true,
        dismissible: true,
        backgroundColor: '#ffffff',
        textColor: '#333333',
        borderColor: '#d9d9d9',
        width: '400px'
      });
    }
    setModalVisible(true);
  };

  const handleCancel = () => {
    setModalVisible(false);
    form.resetFields();
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      const popupData = {
        ...values,
        style: {
          backgroundColor: values.backgroundColor,
          textColor: values.textColor,
          borderColor: values.borderColor,
          width: values.width
        }
      };
      
      // Remove style fields from root object
      delete popupData.backgroundColor;
      delete popupData.textColor;
      delete popupData.borderColor;
      delete popupData.width;
      
      setLoading(true);
      
      if (editingPopup) {
        // Update existing popup
        const updatedPopups = popups.map(p => 
          p.id === editingPopup.id ? { ...popupData, id: p.id, updatedAt: new Date().toISOString() } : p
        );
        setPopups(updatedPopups);
        message.success('Popup updated successfully');
      } else {
        // Create new popup
        const newPopup = {
          ...popupData,
          id: Date.now(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
        setPopups([...popups, newPopup]);
        message.success('Popup created successfully');
      }
      
      setLoading(false);
      setModalVisible(false);
      form.resetFields();
    } catch (error) {
      console.error('Form validation error:', error);
    }
  };

  const handleDelete = (id) => {
    setPopups(popups.filter(popup => popup.id !== id));
    message.success('Popup deleted successfully');
  };

  const showPreview = (popup) => {
    setPreviewPopup(popup);
    setPreviewVisible(true);
  };

  const formatPageUrl = (url) => {
    if (url === '*') return 'All Pages';
    return url;
  };

  const formatPosition = (position) => {
    const positions = {
      'topLeft': 'Top Left',
      'topRight': 'Top Right',
      'bottomLeft': 'Bottom Left',
      'bottomRight': 'Bottom Right',
      'center': 'Center'
    };
    return positions[position] || position;
  };

  const formatTiming = (timing, delay) => {
    if (timing === 'onLoad') return 'On Page Load';
    if (timing === 'afterDelay') return `After ${delay} seconds`;
    if (timing === 'onExit') return 'On Exit Intent';
    return timing;
  };

  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      render: (text, record) => (
        <div>
          <div className="font-medium">{text}</div>
          <div className="text-xs text-gray-500">{record.pageUrl ? formatPageUrl(record.pageUrl) : 'All Pages'}</div>
        </div>
      ),
    },
    {
      title: 'Position',
      dataIndex: 'position',
      key: 'position',
      render: (position) => formatPosition(position),
    },
    {
      title: 'Timing',
      dataIndex: 'timing',
      key: 'timing',
      render: (timing, record) => formatTiming(timing, record.delaySeconds),
    },
    {
      title: 'Status',
      key: 'status',
      render: (_, record) => (
        <Tag color={record.isActive ? 'success' : 'default'}>
          {record.isActive ? 'Active' : 'Inactive'}
        </Tag>
      ),
    },
    {
      title: 'Last Updated',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      render: (date) => new Date(date).toLocaleDateString(),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Tooltip title="Preview">
            <Button 
              icon={<EyeOutlined />} 
              onClick={() => showPreview(record)}
              size="small"
            />
          </Tooltip>
          <Tooltip title="Edit">
            <Button 
              icon={<EditOutlined />} 
              onClick={() => showModal(record)}
              size="small"
            />
          </Tooltip>
          <Tooltip title="Delete">
            <Popconfirm
              title="Are you sure you want to delete this popup?"
              onConfirm={() => handleDelete(record.id)}
              okText="Yes"
              cancelText="No"
            >
              <Button 
                icon={<DeleteOutlined />} 
                danger
                size="small"
              />
            </Popconfirm>
          </Tooltip>
        </Space>
      ),
    },
  ];

  const PopupPreview = ({ popup }) => {
    if (!popup) return null;
    
    const getPositionStyles = (position) => {
      const baseStyles = {
        position: 'absolute',
        maxWidth: '100%',
        maxHeight: '100%',
        overflow: 'auto'
      };
      
      switch (position) {
        case 'topLeft':
          return { ...baseStyles, top: '10px', left: '10px' };
        case 'topRight':
          return { ...baseStyles, top: '10px', right: '10px' };
        case 'bottomLeft':
          return { ...baseStyles, bottom: '10px', left: '10px' };
        case 'bottomRight':
          return { ...baseStyles, bottom: '10px', right: '10px' };
        case 'center':
        default:
          return {
            ...baseStyles,
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)'
          };
      }
    };
    
    return (
      <div className="relative w-full h-96 border rounded bg-gray-100 overflow-hidden">
        <div 
          style={{
            ...getPositionStyles(popup.position),
            backgroundColor: popup.style.backgroundColor,
            color: popup.style.textColor,
            border: `1px solid ${popup.style.borderColor}`,
            width: popup.style.width,
            padding: '16px',
            borderRadius: '4px',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)'
          }}
        >
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-bold text-lg m-0">{popup.title}</h3>
            {popup.dismissible && (
              <Button 
                type="text" 
                icon={<CloseCircleOutlined />} 
                size="small"
                style={{ marginRight: '-8px', marginTop: '-4px' }}
              />
            )}
          </div>
          <div>{popup.content}</div>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Informative Popups</h2>
        <Button 
          type="primary" 
          icon={<PlusOutlined />} 
          onClick={() => showModal()}
        >
          Create New Popup
        </Button>
      </div>
      
      <Table 
        columns={columns} 
        dataSource={popups} 
        rowKey="id"
        loading={loading}
        pagination={{ pageSize: 10 }}
      />
      
      <Modal
        title={editingPopup ? "Edit Popup" : "Create New Popup"}
        open={modalVisible}
        onCancel={handleCancel}
        footer={[
          <Button key="cancel" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button 
            key="submit" 
            type="primary" 
            onClick={handleSubmit}
            loading={loading}
          >
            {editingPopup ? "Update" : "Create"}
          </Button>
        ]}
        width={700}
      >
        <Form
          form={form}
          layout="vertical"
        >
          <Tabs defaultActiveKey="content">
            <TabPane tab="Content" key="content">
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
                <TextArea 
                  rows={4} 
                  placeholder="Enter popup content" 
                />
              </Form.Item>
              
              <Form.Item
                name="pageUrl"
                label={
                  <span>
                    Page URL
                    <Tooltip title="Specify which page this popup should appear on. Use '*' for all pages or enter a specific URL path like '/try-on'">
                      <InfoCircleOutlined style={{ marginLeft: 8 }} />
                    </Tooltip>
                  </span>
                }
              >
                <Input placeholder="e.g. /try-on, /categories, or * for all pages" />
              </Form.Item>
              
              <Form.Item
                name="isActive"
                valuePropName="checked"
                label="Active"
              >
                <Switch checkedChildren="Active" unCheckedChildren="Inactive" />
              </Form.Item>
            </TabPane>
            
            <TabPane tab="Display" key="display">
              <Form.Item
                name="position"
                label="Position"
                rules={[{ required: true, message: 'Please select a position' }]}
              >
                <Select placeholder="Select position">
                  <Option value="center">Center</Option>
                  <Option value="topLeft">Top Left</Option>
                  <Option value="topRight">Top Right</Option>
                  <Option value="bottomLeft">Bottom Left</Option>
                  <Option value="bottomRight">Bottom Right</Option>
                </Select>
              </Form.Item>
              
              <Form.Item
                name="timing"
                label="Display Timing"
                rules={[{ required: true, message: 'Please select when to show the popup' }]}
              >
                <Select placeholder="Select timing">
                  <Option value="onLoad">On Page Load</Option>
                  <Option value="afterDelay">After Delay</Option>
                  <Option value="onExit">On Exit Intent</Option>
                </Select>
              </Form.Item>
              
              <Form.Item
                name="delaySeconds"
                label="Delay (seconds)"
                rules={[{ required: true, message: 'Please enter delay in seconds' }]}
                dependencies={['timing']}
              >
                <Input type="number" min={0} />
              </Form.Item>
              
              <Form.Item
                name="dismissible"
                valuePropName="checked"
                label="Dismissible"
              >
                <Switch checkedChildren="Yes" unCheckedChildren="No" defaultChecked />
              </Form.Item>
              
              <Form.Item
                name="showOnce"
                valuePropName="checked"
                label="Show Only Once Per User"
              >
                <Switch checkedChildren="Yes" unCheckedChildren="No" />
              </Form.Item>
            </TabPane>
            
            <TabPane tab="Style" key="style">
              <Form.Item
                name="backgroundColor"
                label="Background Color"
              >
                <Input type="color" className="w-full" />
              </Form.Item>
              
              <Form.Item
                name="textColor"
                label="Text Color"
              >
                <Input type="color" className="w-full" />
              </Form.Item>
              
              <Form.Item
                name="borderColor"
                label="Border Color"
              >
                <Input type="color" className="w-full" />
              </Form.Item>
              
              <Form.Item
                name="width"
                label="Width"
              >
                <Input placeholder="e.g. 400px, 50%" />
              </Form.Item>
            </TabPane>
          </Tabs>
        </Form>
      </Modal>
      
      <Modal
        title="Popup Preview"
        open={previewVisible}
        onCancel={() => setPreviewVisible(false)}
        footer={[
          <Button key="close" onClick={() => setPreviewVisible(false)}>
            Close
          </Button>
        ]}
        width={800}
      >
        <PopupPreview popup={previewPopup} />
      </Modal>
    </div>
  );
};

export default InformativePopupsList; 