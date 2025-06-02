import React, { useState, useEffect } from 'react';
import { Button, Table, Tag, Modal, Form, Input, Upload, Select, DatePicker, message, Tabs } from 'antd';
import { UploadOutlined, DeleteOutlined, EditOutlined, EyeOutlined, PlusOutlined } from '@ant-design/icons';
import moment from 'moment';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const { TextArea } = Input;
const { Option } = Select;
const { TabPane } = Tabs;

const BlogsManagement = ({ initialBlogs, onSave }) => {
  const [blogs, setBlogs] = useState(initialBlogs || []);
  const [visible, setVisible] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);
  const [form] = Form.useForm();
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewBlog, setPreviewBlog] = useState(null);
  const [activeTab, setActiveTab] = useState('1');

  useEffect(() => {
    setBlogs(initialBlogs || []);
  }, [initialBlogs]);

  const showModal = (blog = null) => {
    setEditingBlog(blog);
    setVisible(true);
    form.resetFields();
    
    if (blog) {
      const formData = {
        ...blog,
        publishDate: blog.publishDate ? moment(blog.publishDate) : null,
      };
      form.setFieldsValue(formData);
    }
  };

  const handleCancel = () => {
    setVisible(false);
    form.resetFields();
  };

  const handlePreview = (blog) => {
    setPreviewBlog(blog);
    setPreviewVisible(true);
  };

  const handlePreviewCancel = () => {
    setPreviewVisible(false);
  };

  const handleDelete = (blogId) => {
    Modal.confirm({
      title: 'Are you sure you want to delete this blog post?',
      content: 'This action cannot be undone.',
      okText: 'Yes, Delete',
      okType: 'danger',
      cancelText: 'Cancel',
      onOk() {
        const updatedBlogs = blogs.filter(blog => blog.id !== blogId);
        setBlogs(updatedBlogs);
        onSave(updatedBlogs);
        message.success('Blog post deleted successfully');
      },
    });
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      setConfirmLoading(true);
      
      // Format the date to ISO string for storage
      if (values.publishDate) {
        values.publishDate = values.publishDate.format();
      }
      
      let updatedBlogs;
      
      if (editingBlog) {
        // Update existing blog
        updatedBlogs = blogs.map(blog =>
          blog.id === editingBlog.id ? { ...values, id: blog.id } : blog
        );
        message.success('Blog post updated successfully');
      } else {
        // Create new blog
        const newBlog = {
          ...values,
          id: Date.now().toString(),
          createdAt: new Date().toISOString(),
        };
        updatedBlogs = [...blogs, newBlog];
        message.success('Blog post created successfully');
      }
      
      setBlogs(updatedBlogs);
      onSave(updatedBlogs);
      setVisible(false);
      form.resetFields();
    } catch (error) {
      console.error('Validation failed:', error);
    } finally {
      setConfirmLoading(false);
    }
  };

  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      render: (text, record) => (
        <div className="flex flex-col">
          <span className="font-medium">{text}</span>
          <span className="text-xs text-gray-500">
            {record.slug}
          </span>
        </div>
      ),
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      render: category => <Tag color="blue">{category}</Tag>,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: status => {
        let color = 'green';
        if (status === 'Draft') {
          color = 'gold';
        } else if (status === 'Scheduled') {
          color = 'purple';
        }
        return <Tag color={color}>{status}</Tag>;
      },
    },
    {
      title: 'Publish Date',
      dataIndex: 'publishDate',
      key: 'publishDate',
      render: date => date ? moment(date).format('MMM D, YYYY') : 'Not published',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <div className="space-x-2">
          <Button 
            icon={<EyeOutlined />} 
            size="small"
            onClick={() => handlePreview(record)}
          />
          <Button 
            icon={<EditOutlined />} 
            size="small" 
            type="primary"
            onClick={() => showModal(record)}
          />
          <Button 
            icon={<DeleteOutlined />} 
            size="small" 
            danger
            onClick={() => handleDelete(record.id)}
          />
        </div>
      ),
    },
  ];

  const blogCategories = [
    'Fashion Trends',
    'Technology',
    'Style Tips',
    'Industry News',
    'Case Studies',
    'Product Updates',
    'Tutorials',
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold">Blog Posts Management</h3>
        <Button 
          type="primary" 
          icon={<PlusOutlined />}
          onClick={() => showModal()}
        >
          Add New Post
        </Button>
      </div>

      <Table 
        dataSource={blogs} 
        columns={columns}
        rowKey="id"
        pagination={{ pageSize: 10 }}
      />

      <Modal
        title={editingBlog ? "Edit Blog Post" : "Create New Blog Post"}
        visible={visible}
        onCancel={handleCancel}
        width={800}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button 
            key="submit" 
            type="primary" 
            loading={confirmLoading} 
            onClick={handleSubmit}
          >
            {editingBlog ? "Update" : "Create"}
          </Button>,
        ]}
      >
        <Form
          form={form}
          layout="vertical"
          initialValues={{
            status: 'Draft',
            publishDate: moment(),
          }}
        >
          <Tabs activeKey={activeTab} onChange={setActiveTab}>
            <TabPane tab="Basic Info" key="1">
              <Form.Item
                name="title"
                label="Title"
                rules={[{ required: true, message: 'Please enter the blog title' }]}
              >
                <Input placeholder="Enter blog title" />
              </Form.Item>

              <Form.Item
                name="slug"
                label="Slug"
                rules={[{ required: true, message: 'Please enter the blog slug' }]}
                help="Used for the URL (e.g., my-blog-post)"
              >
                <Input placeholder="my-blog-post" />
              </Form.Item>
              
              <Form.Item
                name="excerpt"
                label="Excerpt"
                rules={[{ required: true, message: 'Please enter a short excerpt' }]}
              >
                <TextArea 
                  placeholder="A short summary of the blog post" 
                  rows={3}
                  maxLength={300}
                  showCount
                />
              </Form.Item>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Form.Item
                  name="category"
                  label="Category"
                  rules={[{ required: true, message: 'Please select a category' }]}
                >
                  <Select placeholder="Select a category">
                    {blogCategories.map(category => (
                      <Option key={category} value={category}>{category}</Option>
                    ))}
                  </Select>
                </Form.Item>

                <Form.Item
                  name="status"
                  label="Status"
                  rules={[{ required: true, message: 'Please select a status' }]}
                >
                  <Select placeholder="Select status">
                    <Option value="Draft">Draft</Option>
                    <Option value="Published">Published</Option>
                    <Option value="Scheduled">Scheduled</Option>
                  </Select>
                </Form.Item>
              </div>

              <Form.Item
                name="publishDate"
                label="Publish Date"
                dependencies={['status']}
                rules={[
                  ({ getFieldValue }) => ({
                    required: getFieldValue('status') !== 'Draft',
                    message: 'Please select a publish date',
                  }),
                ]}
              >
                <DatePicker className="w-full" />
              </Form.Item>
            </TabPane>

            <TabPane tab="Content" key="2">
              <Form.Item
                name="content"
                label="Blog Content"
                rules={[{ required: true, message: 'Please enter the blog content' }]}
              >
                <ReactQuill 
                  theme="snow" 
                  style={{ height: '300px', marginBottom: '50px' }}
                />
              </Form.Item>
            </TabPane>

            <TabPane tab="Featured Image" key="3">
              <Form.Item
                name="featuredImage"
                label="Featured Image URL"
                rules={[{ required: true, message: 'Please provide a featured image URL' }]}
              >
                <Input placeholder="https://example.com/image.jpg" />
              </Form.Item>
              
              <Form.Item
                name="imageAlt"
                label="Image Alt Text"
                rules={[{ required: true, message: 'Please provide alt text for accessibility' }]}
              >
                <Input placeholder="Descriptive text for the image" />
              </Form.Item>
            </TabPane>

            <TabPane tab="SEO" key="4">
              <Form.Item
                name="metaTitle"
                label="Meta Title"
                rules={[{ required: true, message: 'Please enter a meta title for SEO' }]}
              >
                <Input placeholder="SEO title (may differ from blog title)" />
              </Form.Item>
              
              <Form.Item
                name="metaDescription"
                label="Meta Description"
                rules={[{ required: true, message: 'Please enter a meta description' }]}
              >
                <TextArea 
                  placeholder="Description for search engine results" 
                  rows={3}
                  maxLength={160}
                  showCount
                />
              </Form.Item>
              
              <Form.Item
                name="tags"
                label="Tags"
                rules={[{ required: true, message: 'Please enter at least one tag' }]}
              >
                <Select
                  mode="tags"
                  placeholder="Add tags"
                  style={{ width: '100%' }}
                >
                  {['Virtual Try-On', '3D Technology', 'Fashion', 'E-commerce', 'Retail'].map(tag => (
                    <Option key={tag} value={tag}>{tag}</Option>
                  ))}
                </Select>
              </Form.Item>
            </TabPane>
          </Tabs>
        </Form>
      </Modal>

      <Modal
        title="Blog Preview"
        visible={previewVisible}
        onCancel={handlePreviewCancel}
        width={800}
        footer={[
          <Button key="close" onClick={handlePreviewCancel}>
            Close
          </Button>,
          <Button 
            key="edit" 
            type="primary" 
            onClick={() => {
              handlePreviewCancel();
              showModal(previewBlog);
            }}
          >
            Edit this post
          </Button>,
        ]}
      >
        {previewBlog && (
          <div className="blog-preview">
            <div className="mb-6">
              <img 
                src={previewBlog.featuredImage} 
                alt={previewBlog.imageAlt} 
                className="w-full h-64 object-cover rounded-lg"
              />
            </div>
            
            <div className="mb-4">
              <h1 className="text-2xl font-bold mb-2">{previewBlog.title}</h1>
              <div className="flex items-center text-sm text-gray-500 mb-4">
                <span>{moment(previewBlog.publishDate).format('MMMM D, YYYY')}</span>
                <span className="mx-2">•</span>
                <Tag color="blue">{previewBlog.category}</Tag>
              </div>
              <p className="text-gray-700">{previewBlog.excerpt}</p>
            </div>
            
            <div 
              className="blog-content"
              dangerouslySetInnerHTML={{ __html: previewBlog.content }}
            />
            
            <div className="mt-6 pt-4 border-t border-gray-200">
              <div className="flex flex-wrap gap-2">
                {previewBlog.tags && previewBlog.tags.map(tag => (
                  <Tag key={tag}>{tag}</Tag>
                ))}
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default BlogsManagement; 