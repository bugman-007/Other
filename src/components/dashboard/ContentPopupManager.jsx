import React, { useState, useEffect } from 'react';
import { 
  Table, Button, Modal, Form, Input, Select, 
  Switch, Popconfirm, message, Tabs, Space, 
  Tooltip, Tag, Card, Typography, Divider 
} from 'antd';
import { 
  PlusOutlined, EditOutlined, DeleteOutlined, 
  EyeOutlined, InfoCircleOutlined, 
  QuestionCircleOutlined
} from '@ant-design/icons';

const { TextArea } = Input;
const { Option } = Select;
const { Title, Text } = Typography;
const { TabPane } = Tabs;

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
  { label: 'Information', value: 'info' },
  { label: 'Success', value: 'success' },
  { label: 'Warning', value: 'warning' },
  { label: 'Tutorial', value: 'tutorial' }
];

const TRIGGER_TYPES = [
  { label: 'Page Load', value: 'pageLoad' },
  { label: 'After Delay', value: 'delay' },
  { label: 'Element Interaction', value: 'interaction' },
  { label: 'Exit Intent', value: 'exitIntent' }
];

const PAGES = [
  { label: 'Homepage', value: '/' },
  { label: 'Try-on Page', value: '/try-on' },
  { label: 'Categories', value: '/categories' },
  { label: 'Product Details', value: '/product/:id' },
  { label: 'Cart', value: '/cart' },
  { label: 'Checkout', value: '/checkout' }
];

const ContentPopupManager = ({ initialPopups = [], onUpdatePopups }) => {
  const [popups, setPopups] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [editingPopup, setEditingPopup] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    if (initialPopups && initialPopups.length > 0) {
      setPopups(initialPopups);
    } else {
      fetchPopups();
    }
  }, [initialPopups]);

  const fetchPopups = async () => {
    setLoading(true);
    try {
      // Simulate API call
      setTimeout(() => {
        const mockPopups = [
          {
            id: 1,
            title: 'Welcome to Virtual Try-On',
            content: 'Position yourself in front of the camera to get the best experience.',
            pages: ['/try-on'],
            position: 'center',
            trigger: 'pageLoad',
            delay: 0,
            type: 'info',
            isActive: true,
            hasCloseButton: true,
            showOnce: true,
            createdAt: '2023-05-15T10:30:00Z',
            updatedAt: '2023-05-15T10:30:00Z'
          },
          {
            id: 2,
            title: 'Special Discount',
            content: 'Use code VIRTUAL20 for 20% off your first order after trying on clothes.',
            pages: ['/', '/categories', '/product/:id'],
            position: 'bottomRight',
            trigger: 'delay',
            delay: 30,
            type: 'success',
            isActive: true,
            hasCloseButton: true,
            showOnce: false,
            createdAt: '2023-05-10T14:15:00Z',
            updatedAt: '2023-05-14T09:20:00Z'
          },
          {
            id: 3,
            title: 'How to Use Measurements',
            content: 'Click on the measurement tool and follow the on-screen instructions to get your perfect size.',
            pages: ['/try-on'],
            position: 'topRight',
            trigger: 'interaction',
            delay: 0,
            type: 'tutorial',
            isActive: false,
            hasCloseButton: true,
            showOnce: true,
            createdAt: '2023-05-08T16:45:00Z',
            updatedAt: '2023-05-12T11:30:00Z'
          }
        ];
        setPopups(mockPopups);
        setLoading(false);
      }, 500);
    } catch (error) {
      console.error('Error fetching popups:', error);
      message.error('Failed to load popups');
      setLoading(false);
    }
  };

  const handleCreate = () => {
    setEditingPopup(null);
    form.resetFields();
    form.setFieldsValue({
      position: 'center',
      trigger: 'pageLoad',
      delay: 0,
      type: 'info',
      isActive: true,
      hasCloseButton: true,
      showOnce: true
    });
    setModalVisible(true);
  };

  const handleEdit = (popup) => {
    setEditingPopup(popup);
    form.setFieldsValue({
      ...popup
    });
    setModalVisible(true);
  };

  const handleDelete = async (id) => {
    try {
      // Simulate API call
      setLoading(true);
      setTimeout(() => {
        const updatedPopups = popups.filter(popup => popup.id !== id);
        setPopups(updatedPopups);
        if (onUpdatePopups) onUpdatePopups(updatedPopups);
        setLoading(false);
        message.success('Popup deleted successfully');
      }, 500);
    } catch (error) {
      console.error('Error deleting popup:', error);
      message.error('Failed to delete popup');
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      setLoading(true);
      
      // Simulate API call
      setTimeout(() => {
        if (editingPopup) {
          // Update existing popup
          const updatedPopup = {
            ...editingPopup,
            ...values,
            updatedAt: new Date().toISOString()
          };
          const updatedPopups = popups.map(p => p.id === editingPopup.id ? updatedPopup : p);
          setPopups(updatedPopups);
          if (onUpdatePopups) onUpdatePopups(updatedPopups);
          message.success('Popup updated successfully');
        } else {
          // Create new popup
          const newPopup = {
            ...values,
            id: Math.max(0, ...popups.map(p => p.id)) + 1,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          };
          const updatedPopups = [...popups, newPopup];
          setPopups(updatedPopups);
          if (onUpdatePopups) onUpdatePopups(updatedPopups);
          message.success('Popup created successfully');
        }
        
        setLoading(false);
        setModalVisible(false);
      }, 500);
    } catch (error) {
      console.error('Validation error:', error);
    }
  };

  const handlePreview = (popup) => {
    setEditingPopup(popup);
    setPreviewVisible(true);
  };

  const PopupPreview = ({ popup }) => {
    if (!popup) return null;
    
    const getPositionStyle = (position) => {
      switch (position) {
        case 'center':
          return { top: '50%', left: '50%', transform: 'translate(-50%, -50%)' };
        case 'top':
          return { top: '20px', left: '50%', transform: 'translateX(-50%)' };
        case 'bottom':
          return { bottom: '20px', left: '50%', transform: 'translateX(-50%)' };
        case 'topLeft':
          return { top: '20px', left: '20px' };
        case 'topRight':
          return { top: '20px', right: '20px' };
        case 'bottomLeft':
          return { bottom: '20px', left: '20px' };
        case 'bottomRight':
          return { bottom: '20px', right: '20px' };
        default:
          return { top: '50%', left: '50%', transform: 'translate(-50%, -50%)' };
      }
    };
    
    const getTypeStyle = (type) => {
      switch (type) {
        case 'info':
          return { borderTop: '4px solid #1890ff' };
        case 'success':
          return { borderTop: '4px solid #52c41a' };
        case 'warning':
          return { borderTop: '4px solid #faad14' };
        case 'tutorial':
          return { borderTop: '4px solid #722ed1' };
        default:
          return { borderTop: '4px solid #1890ff' };
      }
    };
    
    return (
      <div className="relative bg-gray-200 border border-gray-300 w-full h-96 overflow-hidden">
        <div 
          className="absolute bg-white rounded-lg shadow-lg p-4 max-w-xs"
          style={{
            ...getPositionStyle(popup.position),
            ...getTypeStyle(popup.type),
            zIndex: 1000
          }}
        >
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-lg font-semibold">{popup.title}</h3>
            {popup.hasCloseButton && (
              <button className="text-gray-500 hover:text-gray-700">✕</button>
            )}
          </div>
          <div className="mb-3">
            <p>{popup.content}</p>
          </div>
          {popup.buttonText && (
            <div className="mt-2">
              <button className="px-4 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">
                {popup.buttonText}
              </button>
            </div>
          )}
        </div>
        <div className="absolute inset-0 flex items-center justify-center text-gray-400 z-0">
          Preview of page content
        </div>
      </div>
    );
  };

  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      render: (text, record) => (
        <div>
          <div className="font-medium">{text}</div>
          <div className="text-xs text-gray-500 mt-1">
            {record.pages.map(page => {
              const pageLabel = PAGES.find(p => p.value === page)?.label || page;
              return (
                <Tag key={page} className="mr-1 mb-1">
                  {pageLabel}
                </Tag>
              );
            })}
          </div>
        </div>
      )
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      render: (type) => {
        const typeObj = POPUP_TYPES.find(t => t.value === type);
        let color;
        switch (type) {
          case 'info': color = 'blue'; break;
          case 'success': color = 'green'; break;
          case 'warning': color = 'orange'; break;
          case 'tutorial': color = 'purple'; break;
          default: color = 'default';
        }
        return <Tag color={color}>{typeObj?.label || type}</Tag>;
      }
    },
    {
      title: 'Position',
      dataIndex: 'position',
      key: 'position',
      render: (position) => {
        const posObj = POPUP_POSITIONS.find(p => p.value === position);
        return posObj?.label || position;
      }
    },
    {
      title: 'Trigger',
      dataIndex: 'trigger',
      key: 'trigger',
      render: (trigger, record) => {
        const triggerObj = TRIGGER_TYPES.find(t => t.value === trigger);
        let triggerText = triggerObj?.label || trigger;
        
        if (trigger === 'delay' && record.delay) {
          triggerText += ` (${record.delay}s)`;
        }
        
        return triggerText;
      }
    },
    {
      title: 'Status',
      dataIndex: 'isActive',
      key: 'isActive',
      render: (isActive) => (
        <Tag color={isActive ? 'green' : 'default'}>
          {isActive ? 'Active' : 'Inactive'}
        </Tag>
      )
    },
    {
      title: 'Last Updated',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      render: (date) => new Date(date).toLocaleDateString()
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Tooltip title="Preview">
            <Button 
              type="text" 
              icon={<EyeOutlined />} 
              onClick={() => handlePreview(record)}
            />
          </Tooltip>
          <Tooltip title="Edit">
            <Button 
              type="text" 
              icon={<EditOutlined />} 
              onClick={() => handleEdit(record)}
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
                type="text" 
                danger
                icon={<DeleteOutlined />} 
              />
            </Popconfirm>
          </Tooltip>
        </Space>
      )
    }
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="flex justify-between items-center mb-6">
        <div>
          <Title level={4}>Content Popups</Title>
          <Text type="secondary">
            Create and manage popups that appear on different pages of your store
          </Text>
        </div>
        <Button 
          type="primary" 
          icon={<PlusOutlined />} 
          onClick={handleCreate}
        >
          Create Popup
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
        title={editingPopup ? 'Edit Popup' : 'Create Popup'}
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        onOk={handleSubmit}
        confirmLoading={loading}
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
                name="buttonText"
                label="Button Text (Optional)"
              >
                <Input placeholder="E.g., Learn More, Get Started" />
              </Form.Item>
              
              <Form.Item
                name="buttonLink"
                label="Button Link (Optional)"
              >
                <Input placeholder="E.g., /help, /tutorial" />
              </Form.Item>
            </TabPane>
            
            <TabPane tab="Display Settings" key="display">
              <Form.Item
                name="type"
                label="Popup Type"
                rules={[{ required: true }]}
              >
                <Select>
                  {POPUP_TYPES.map(type => (
                    <Option key={type.value} value={type.value}>{type.label}</Option>
                  ))}
                </Select>
              </Form.Item>
              
              <Form.Item
                name="position"
                label="Position"
                rules={[{ required: true }]}
              >
                <Select>
                  {POPUP_POSITIONS.map(position => (
                    <Option key={position.value} value={position.value}>{position.label}</Option>
                  ))}
                </Select>
              </Form.Item>
              
              <Form.Item
                name="pages"
                label="Display on Pages"
                rules={[{ required: true, message: 'Please select at least one page' }]}
              >
                <Select 
                  mode="multiple" 
                  placeholder="Select pages to display this popup"
                >
                  {PAGES.map(page => (
                    <Option key={page.value} value={page.value}>{page.label}</Option>
                  ))}
                </Select>
              </Form.Item>
            </TabPane>
            
            <TabPane tab="Timing" key="timing">
              <Form.Item
                name="trigger"
                label="Trigger"
                rules={[{ required: true }]}
              >
                <Select>
                  {TRIGGER_TYPES.map(trigger => (
                    <Option key={trigger.value} value={trigger.value}>{trigger.label}</Option>
                  ))}
                </Select>
              </Form.Item>
              
              <Form.Item
                name="delay"
                label="Delay (seconds)"
                tooltip="Time to wait before showing the popup"
                dependencies={['trigger']}
                rules={[{ 
                  required: form.getFieldValue('trigger') === 'delay', 
                  message: 'Please enter delay in seconds' 
                }]}
              >
                <Input 
                  type="number" 
                  min={0} 
                  disabled={form.getFieldValue('trigger') !== 'delay'}
                />
              </Form.Item>
              
              <Divider />
              
              <Form.Item
                name="showOnce"
                valuePropName="checked"
                label="Show Only Once"
                tooltip="If enabled, the popup will only show once per user"
              >
                <Switch />
              </Form.Item>
            </TabPane>
            
            <TabPane tab="Appearance" key="appearance">
              <Form.Item
                name="hasCloseButton"
                valuePropName="checked"
                label="Show Close Button"
              >
                <Switch defaultChecked />
              </Form.Item>
              
              <Form.Item
                name="maxWidth"
                label="Maximum Width (px)"
              >
                <Input type="number" min={200} max={800} placeholder="Default: 400" />
              </Form.Item>
              
              <Form.Item
                name="backgroundColor"
                label="Background Color"
              >
                <Input type="color" defaultValue="#ffffff" />
              </Form.Item>
              
              <Form.Item
                name="textColor"
                label="Text Color"
              >
                <Input type="color" defaultValue="#000000" />
              </Form.Item>
              
              <Form.Item
                name="overlayOpacity"
                label="Background Overlay Opacity"
                tooltip="0 means no overlay, 1 means fully opaque"
              >
                <Input 
                  type="number" 
                  min={0} 
                  max={1} 
                  step={0.1} 
                  placeholder="Default: 0.5" 
                />
              </Form.Item>
            </TabPane>
          </Tabs>
          
          <Divider />
          
          <Form.Item
            name="isActive"
            valuePropName="checked"
            label="Active"
          >
            <Switch checkedChildren="Active" unCheckedChildren="Inactive" />
          </Form.Item>
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
        <PopupPreview popup={editingPopup} />
        <div className="mt-4">
          <Divider orientation="left">Preview Notes</Divider>
          <ul className="text-gray-600 pl-6 list-disc">
            <li>This is a static preview and may appear differently on your actual site</li>
            <li>Certain interactions (like animations) aren't represented in this preview</li>
            <li>The appearance may vary slightly based on your site's theme settings</li>
          </ul>
        </div>
      </Modal>
    </div>
  );
};

export default ContentPopupManager; 