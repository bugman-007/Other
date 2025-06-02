import React, { useState, useEffect } from 'react';
import { 
  Table, Input, Button, Tabs, Form, Select, Modal, Tag, Tooltip, 
  message, Card, Space, Typography, Divider, Row, Col, Popconfirm,
  Menu, Dropdown, Input as AntInput
} from 'antd';
import { 
  EditOutlined, CopyOutlined, DeleteOutlined, EyeOutlined, 
  PlusOutlined, SearchOutlined, SettingOutlined,
  FileTextOutlined, GlobalOutlined, BarsOutlined,
  DownOutlined, SaveOutlined, DragOutlined, AppstoreOutlined
} from '@ant-design/icons';

const { TabPane } = Tabs;
const { Option } = Select;
const { Title, Text } = Typography;
const { TextArea } = AntInput;

// Template data for the page templates
const pageTemplates = [
  { id: 'blank', name: 'Blank Page', description: 'Start with a clean slate' },
  { id: 'about', name: 'About Us', description: 'Company information and history' },
  { id: 'contact', name: 'Contact Page', description: 'Contact form and information' },
  { id: 'pricing', name: 'Pricing Page', description: 'Product/service pricing details' },
  { id: 'gallery', name: 'Gallery/Showcase', description: 'Image or video gallery' },
  { id: 'terms', name: 'Terms & Conditions', description: 'Legal terms and conditions' },
  { id: 'privacy', name: 'Privacy Policy', description: 'Privacy policy details' },
  { id: 'faq', name: 'FAQ Page', description: 'Frequently asked questions' },
  { id: 'video', name: 'Video Page', description: 'Video content and listings' },
];

// Menu locations for page placement
const menuLocations = [
  { id: 'main_menu', name: 'Main Navigation' },
  { id: 'footer_primary', name: 'Footer Primary' },
  { id: 'footer_secondary', name: 'Footer Secondary' }
];

// Initial pages data (this would normally come from an API)
const initialPages = [
  { 
    id: 1, 
    title: 'Home', 
    slug: '/home', 
    type: 'page', 
    status: 'published',
    locations: ['main_menu'],
    seo: {
      title: 'Home | Kokomatto',
      description: 'Virtual try-on experience for clothing',
      keywords: 'virtual try-on, 3D, clothing'
    },
    updatedAt: '2023-05-15T10:30:00'
  },
  { 
    id: 2, 
    title: 'About Us', 
    slug: '/about-us', 
    type: 'page', 
    status: 'published',
    locations: ['main_menu', 'footer_primary'],
    seo: {
      title: 'About Us | Kokomatto',
      description: 'Learn more about our company',
      keywords: 'about, company, history'
    },
    updatedAt: '2023-05-16T14:20:00'
  },
  { 
    id: 3, 
    title: 'Try On', 
    slug: '/try-on', 
    type: 'page', 
    status: 'published',
    locations: ['main_menu'],
    seo: {
      title: 'Try On Experience | Kokomatto',
      description: 'Try clothes virtually with our 3D technology',
      keywords: 'try on, virtual fitting, 3D'
    },
    updatedAt: '2023-05-17T09:45:00'
  },
  { 
    id: 4, 
    title: 'Categories', 
    slug: '/categories', 
    type: 'page', 
    status: 'published',
    locations: ['main_menu'],
    seo: {
      title: 'Categories | Kokomatto',
      description: 'Browse our clothing categories',
      keywords: 'categories, clothing, fashion'
    },
    updatedAt: '2023-05-18T16:10:00'
  },
  { 
    id: 5, 
    title: 'Privacy Policy', 
    slug: '/privacy-policy', 
    type: 'page', 
    status: 'published',
    locations: ['footer_secondary'],
    seo: {
      title: 'Privacy Policy | Kokomatto',
      description: 'Our privacy policy and data practices',
      keywords: 'privacy, policy, data'
    },
    updatedAt: '2023-05-19T11:00:00'
  },
  { 
    id: 6, 
    title: 'Terms & Conditions', 
    slug: '/terms-conditions', 
    type: 'page', 
    status: 'published',
    locations: ['footer_secondary'],
    seo: {
      title: 'Terms & Conditions | Kokomatto',
      description: 'Terms and conditions for using our services',
      keywords: 'terms, conditions, legal'
    },
    updatedAt: '2023-05-20T13:30:00'
  },
  { 
    id: 7, 
    title: 'Affiliate Program', 
    slug: '/affiliate-program', 
    type: 'page', 
    status: 'published',
    locations: ['footer_primary'],
    seo: {
      title: 'Affiliate Program | Kokomatto',
      description: 'Join our affiliate program',
      keywords: 'affiliate, program, partnership'
    },
    updatedAt: '2023-05-21T15:45:00'
  },
  { 
    id: 8, 
    title: 'Pricing', 
    slug: '/pricing', 
    type: 'page', 
    status: 'published',
    locations: ['main_menu', 'footer_primary'],
    seo: {
      title: 'Pricing | Kokomatto',
      description: 'Our pricing plans and options',
      keywords: 'pricing, plans, subscription'
    },
    updatedAt: '2023-05-22T10:15:00'
  }
];

const PageManagerTab = () => {
  const [pages, setPages] = useState(initialPages);
  const [searchText, setSearchText] = useState('');
  const [editingPage, setEditingPage] = useState(null);
  const [isCreating, setIsCreating] = useState(false);
  const [showTemplateModal, setShowTemplateModal] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [activeTab, setActiveTab] = useState('1');
  const [editorContent, setEditorContent] = useState('');
  const [form] = Form.useForm();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // Update window width when resized
  useEffect(() => {
    const handleResize = () => {
      const newWidth = window.innerWidth;
      setWindowWidth(newWidth);
      setIsMobile(newWidth <= 768);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Filter pages based on search
  const filteredPages = pages.filter(page => 
    page.title.toLowerCase().includes(searchText.toLowerCase()) ||
    page.slug.toLowerCase().includes(searchText.toLowerCase())
  );

  // Reset form and editor when editing page changes
  useEffect(() => {
    if (editingPage) {
      form.setFieldsValue({
        title: editingPage.title,
        slug: editingPage.slug,
        status: editingPage.status,
        locations: editingPage.locations || [],
        seoTitle: editingPage.seo?.title || '',
        seoDescription: editingPage.seo?.description || '',
        seoKeywords: editingPage.seo?.keywords || '',
      });
      // In a real app, we would fetch the content from an API
      setEditorContent(editingPage.content || '');
    } else {
      form.resetFields();
      setEditorContent('');
    }
  }, [editingPage, form]);

  // Create a new page
  const handleCreatePage = () => {
    setShowTemplateModal(true);
    setIsCreating(true);
    setEditingPage(null);
  };

  // Edit existing page
  const handleEditPage = page => {
    setEditingPage(page);
    setIsCreating(false);
    
    // Set form values
    form.setFieldsValue({
      title: page.title,
      slug: page.slug,
      status: page.status,
      locations: page.locations,
      seoTitle: page.seo?.title,
      seoDescription: page.seo?.description,
      seoKeywords: page.seo?.keywords
    });
    
    setEditorContent(page.content || '');
  };

  // Duplicate page
  const handleDuplicatePage = page => {
    const newPage = {
      ...page,
      id: Date.now(),
      title: `${page.title} (Copy)`,
      slug: `${page.slug}-copy`,
      updatedAt: new Date().toISOString()
    };
    
    setPages([...pages, newPage]);
    message.success(`Duplicated page: ${page.title}`);
  };

  // Delete page
  const handleDeletePage = pageId => {
    setPages(pages.filter(page => page.id !== pageId));
    message.success('Page deleted successfully');
  };

  // Select template for new page
  const handleSelectTemplate = template => {
    setSelectedTemplate(template);
  };

  // Create page from template
  const handleCreateFromTemplate = () => {
    const newPage = {
      id: Date.now(),
      title: `New ${selectedTemplate ? selectedTemplate.name : 'Page'}`,
      slug: `/new-${selectedTemplate ? selectedTemplate.id : 'page'}-${Date.now()}`,
      type: 'page',
      status: 'draft',
      locations: [],
      seo: {
        title: '',
        description: '',
        keywords: ''
      },
      updatedAt: new Date().toISOString()
    };
    
    // Set default content based on template
    let templateContent = `<h1>${newPage.title}</h1>`;
    if (selectedTemplate) {
      switch (selectedTemplate.id) {
        case 'about':
          templateContent += `
<p>Welcome to our company page. We are dedicated to providing the best products and services.</p>

<h2>Our Mission</h2>
<p>Our mission is to deliver exceptional quality and value to our customers.</p>

<h2>Our Team</h2>
<p>We have a passionate team of experts dedicated to serving you.</p>
`;
          break;
        case 'contact':
          templateContent += `
<p>Get in touch with us using the information below:</p>

<h2>Contact Information</h2>
<p><strong>Email:</strong> info@example.com</p>
<p><strong>Phone:</strong> (123) 456-7890</p>
<p><strong>Address:</strong> 123 Street Name, City, Country</p>

<h2>Send us a message</h2>
<p>Please fill out the contact form on this page to get in touch with our team.</p>
`;
          break;
        case 'video':
          templateContent += `
<p>Explore our video collection:</p>

<h2>Featured Videos</h2>
<p>Check out our latest featured videos below.</p>

<div class="video-container">
  <!-- Replace with your video embed code -->
  <p>[Video embed placeholder]</p>
</div>

<h2>Video Gallery</h2>
<p>Browse our collection of videos.</p>
`;
          break;
        case 'privacy':
          templateContent += `
<p>This Privacy Policy describes how we collect, use, and share your personal information.</p>

<h2>Information We Collect</h2>
<p>We collect information you provide directly to us when using our services.</p>

<h2>How We Use Your Information</h2>
<p>We use the information we collect to provide and improve our services.</p>
`;
          break;
        case 'terms':
          templateContent += `
<h2>Terms and Conditions</h2>
<p>These Terms and Conditions govern your use of our website and services.</p>

<h2>Acceptance of Terms</h2>
<p>By accessing or using our services, you agree to be bound by these Terms.</p>

<h2>User Responsibilities</h2>
<p>You are responsible for maintaining the confidentiality of your account.</p>
`;
          break;
        default:
          templateContent += '<p>Start editing this page content...</p>';
      }
    }
    
    newPage.content = templateContent;
    setEditorContent(templateContent);
    setPages([...pages, newPage]);
    setEditingPage(newPage);
    setShowTemplateModal(false);
    setIsCreating(false);
    
    message.success('New page created');
  };

  // Save page after editing
  const handleSavePage = values => {
    const updatedPage = {
      ...(editingPage || {}),
      title: values.title,
      slug: values.slug,
      status: values.status,
      locations: values.locations || [],
      seo: {
        title: values.seoTitle,
        description: values.seoDescription,
        keywords: values.seoKeywords
      },
      updatedAt: new Date().toISOString()
    };

    if (editingPage) {
      // Update existing page
      setPages(pages.map(p => p.id === editingPage.id ? updatedPage : p));
      message.success(`Updated page: ${updatedPage.title}`);
    } else {
      // Create new page
      updatedPage.id = Date.now();
      setPages([...pages, updatedPage]);
      message.success(`Created page: ${updatedPage.title}`);
    }

    setEditingPage(null);
  };

  // Cancel editing
  const handleCancelEdit = () => {
    setEditingPage(null);
    setIsCreating(false);
    form.resetFields();
  };

  // Format date for display
  const formatDate = dateString => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Handle search input change
  const handleSearch = e => {
    setSearchText(e.target.value);
  };

  // Generate responsive table columns based on screen size
  const getColumns = () => {
    // Basic columns that always show
    const baseColumns = [
      {
        title: 'Title',
        dataIndex: 'title',
        key: 'title',
        render: (text, record) => (
          <div>
            <Text strong>{text}</Text>
            {record.status === 'draft' && (
              <Tag color="orange" style={{ marginLeft: 8 }}>DRAFT</Tag>
            )}
            {isMobile && (
              <div style={{ fontSize: '12px', color: '#666' }}>
                {record.slug}
              </div>
            )}
          </div>
        )
      },
      {
        title: 'Actions',
        key: 'actions',
        render: (_, record) => (
          <Space size="small">
            <Tooltip title="Edit">
              <Button 
                type="text" 
                icon={<EditOutlined />} 
                onClick={() => handleEditPage(record)} 
              />
            </Tooltip>
            <Tooltip title="Duplicate">
              <Button 
                type="text" 
                icon={<CopyOutlined />} 
                onClick={() => handleDuplicatePage(record)} 
              />
            </Tooltip>
            <Tooltip title="Delete">
              <Popconfirm
                title="Are you sure you want to delete this page?"
                onConfirm={() => handleDeletePage(record.id)}
                okText="Yes"
                cancelText="No"
              >
                <Button type="text" danger icon={<DeleteOutlined />} />
              </Popconfirm>
            </Tooltip>
            <Tooltip title="View">
              <Button 
                type="text" 
                icon={<EyeOutlined />} 
                onClick={() => window.open(record.slug, '_blank')} 
              />
            </Tooltip>
          </Space>
        )
      }
    ];

    // Add columns based on screen size
    if (!isMobile) {
      // Insert these columns before the Actions column
      baseColumns.splice(1, 0, 
        {
          title: 'URL Slug',
          dataIndex: 'slug',
          key: 'slug',
        },
        {
          title: 'Placement',
          key: 'locations',
          dataIndex: 'locations',
          render: (locations) => (
            <Space>
              {locations?.map(location => {
                const menuLocation = menuLocations.find(ml => ml.id === location);
                return menuLocation ? (
                  <Tag color="blue" key={location}>
                    {menuLocation.name}
                  </Tag>
                ) : null;
              })}
              {!locations?.length && <Text type="secondary">None</Text>}
            </Space>
          )
        },
        {
          title: 'Last Updated',
          dataIndex: 'updatedAt',
          key: 'updatedAt',
          render: updatedAt => formatDate(updatedAt)
        }
      );
    }

    return baseColumns;
  };

  // Table columns for the page list
  const columns = getColumns();

  // Render the page list
  const renderPageList = () => (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
        <h3 className="text-xl font-bold text-gray-900">Page Manager</h3>
        <Button 
          type="primary" 
          icon={<PlusOutlined />}
          onClick={handleCreatePage}
        >
          Create New Page
        </Button>
      </div>
      
      <div className="bg-white rounded-lg shadow p-4 sm:p-6">
        <div className="mb-6">
          <h4 className="text-lg font-medium mb-2">Manage Your Website Pages</h4>
          <p className="text-gray-500">Create, edit, duplicate, and manage pages. Connect them to SEO settings and add them to your site's navigation.</p>
        </div>
        
        <div className="page-actions-container mb-4">
          <Input 
            placeholder="Search pages" 
            value={searchText}
            onChange={handleSearch}
            prefix={<SearchOutlined />}
            className="page-filter-input w-full"
          />
        </div>
        
        {isMobile ? (
          // Mobile card view
          <div className="mobile-page-list">
            {filteredPages.length > 0 ? (
              filteredPages.map(page => (
                <Card key={page.id} className="mobile-page-card mb-3">
                  <div className="mobile-page-card-header">
                    <div className="mobile-page-card-title">
                      {page.title}
                      {page.status === 'draft' && (
                        <Tag color="orange" style={{ marginLeft: 8 }}>DRAFT</Tag>
                      )}
                    </div>
                    <div className="mobile-page-card-slug">{page.slug}</div>
                  </div>
                  
                  <div>
                    <strong>Placement:</strong> 
                    <div className="mobile-page-card-placements">
                      {page.locations?.map(location => {
                        const menuLocation = menuLocations.find(ml => ml.id === location);
                        return menuLocation ? (
                          <Tag color="blue" key={location}>
                            {menuLocation.name}
                          </Tag>
                        ) : null;
                      })}
                      {!page.locations?.length && <Text type="secondary">None</Text>}
                    </div>
                  </div>
                  
                  <div>
                    <strong>Last Updated:</strong> {formatDate(page.updatedAt)}
                  </div>
                  
                  <div className="mobile-page-card-actions">
                    <Button icon={<EyeOutlined />} size="small" onClick={() => window.open(page.slug, '_blank')} />
                    <Button icon={<EditOutlined />} size="small" onClick={() => handleEditPage(page)} />
                    <Button icon={<CopyOutlined />} size="small" onClick={() => handleDuplicatePage(page)} />
                    <Popconfirm
                      title="Are you sure you want to delete this page?"
                      onConfirm={() => handleDeletePage(page.id)}
                      okText="Yes"
                      cancelText="No"
                    >
                      <Button icon={<DeleteOutlined />} danger size="small" />
                    </Popconfirm>
                  </div>
                </Card>
              ))
            ) : (
              <div className="text-center py-8">
                <div className="text-gray-400 mb-2">
                  <SearchOutlined style={{ fontSize: '24px' }} />
                </div>
                <div className="text-gray-500">No pages found matching your search.</div>
              </div>
            )}
          </div>
        ) : (
          // Desktop table view
          <Table
            dataSource={filteredPages}
            columns={columns}
            rowKey="id"
            pagination={{ pageSize: 10 }}
            scroll={{ x: 'max-content' }}
            locale={{ emptyText: (
              <div className="text-center py-8">
                <div className="text-gray-400 mb-2">
                  <SearchOutlined style={{ fontSize: '24px' }} />
                </div>
                <div className="text-gray-500">No pages found matching your search.</div>
              </div>
            )}}
          />
        )}
      </div>
    </div>
  );

  // Render the page editor form
  const renderPageEditor = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold text-gray-900">
          {isCreating ? 'Create New Page' : `Edit Page: ${editingPage?.title}`}
        </h3>
        <Button onClick={handleCancelEdit}>
          Cancel
        </Button>
      </div>
      
      <div className="bg-white rounded-lg shadow p-6">
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSavePage}
        >
          <Tabs activeKey={activeTab} onChange={setActiveTab}>
            <TabPane tab={<span><FileTextOutlined /> Content</span>} key="1">
              <Row gutter={16}>
                <Col span={16}>
                  <Form.Item
                    name="title"
                    label="Page Title"
                    rules={[{ required: true, message: 'Please enter a title' }]}
                  >
                    <Input placeholder="Enter page title" />
                  </Form.Item>

                  <Form.Item
                    name="slug"
                    label="URL Slug"
                    rules={[{ required: true, message: 'Please enter a URL slug' }]}
                  >
                    <Input addonBefore="/" placeholder="page-url-slug" />
                  </Form.Item>

                  <Form.Item label="Page Content">
                    <TextArea
                      rows={12}
                      value={editorContent}
                      onChange={(e) => setEditorContent(e.target.value)}
                      placeholder="Enter page content here... You can use HTML tags for formatting."
                      className="page-content-editor"
                    />
                    <div className="mt-2 text-xs text-gray-500">
                      <p>Formatting tips:</p>
                      <ul className="pl-4 list-disc">
                        <li>&lt;h1&gt;Heading 1&lt;/h1&gt; - For main headings</li>
                        <li>&lt;h2&gt;Heading 2&lt;/h2&gt; - For section headings</li>
                        <li>&lt;p&gt;Paragraph text&lt;/p&gt; - For paragraphs</li>
                        <li>&lt;strong&gt;Bold text&lt;/strong&gt; - For emphasis</li>
                        <li>&lt;img src="image-url" alt="description"&gt; - For images</li>
                        <li>&lt;a href="url"&gt;Link text&lt;/a&gt; - For links</li>
                      </ul>
                    </div>
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Card title="Page Settings" size="small">
                    <Form.Item name="status" label="Status">
                      <Select>
                        <Option value="published">Published</Option>
                        <Option value="draft">Draft</Option>
                      </Select>
                    </Form.Item>
                    
                    <div className="mt-4">
                      <div className="text-sm font-medium mb-2">Content Preview</div>
                      <div 
                        className="border border-gray-200 p-3 rounded-md max-h-64 overflow-auto bg-gray-50"
                        dangerouslySetInnerHTML={{ __html: editorContent }}
                      />
                    </div>
                  </Card>
                </Col>
              </Row>
            </TabPane>

            <TabPane tab={<span><GlobalOutlined /> SEO</span>} key="2">
              <Form.Item
                name="seoTitle"
                label="SEO Title"
                extra="The title that appears in search engine results"
              >
                <Input placeholder="Enter SEO title" />
              </Form.Item>

              <Form.Item
                name="seoDescription"
                label="Meta Description"
                extra="A short description of the page for search engines"
              >
                <Input.TextArea 
                  rows={4} 
                  placeholder="Enter meta description" 
                  maxLength={160}
                  showCount
                />
              </Form.Item>

              <Form.Item
                name="seoKeywords"
                label="Meta Keywords"
                extra="Comma-separated keywords related to the page content"
              >
                <Input placeholder="keyword1, keyword2, keyword3" />
              </Form.Item>

              <div className="seo-preview-container">
                <Title level={5}>Search Preview</Title>
                <div style={{ marginTop: 8 }}>
                  <div style={{ color: '#1a0dab', fontSize: 18 }}>
                    {form.getFieldValue('seoTitle') || form.getFieldValue('title') || 'Page Title'}
                  </div>
                  <div style={{ color: '#006621', fontSize: 14 }}>
                    example.com{form.getFieldValue('slug') || '/page-url'}
                  </div>
                  <div style={{ color: '#545454', fontSize: 14 }}>
                    {form.getFieldValue('seoDescription') || 'This is a preview of how this page might appear in search engine results.'}
                  </div>
                </div>
              </div>
            </TabPane>

            <TabPane tab={<span><BarsOutlined /> Navigation</span>} key="3">
              <Form.Item
                name="locations"
                label="Menu Placement"
                extra="Select where this page should appear in the site navigation"
              >
                <Select
                  mode="multiple"
                  placeholder="Select menu locations"
                  style={{ width: '100%' }}
                >
                  {menuLocations.map(location => (
                    <Option key={location.id} value={location.id}>
                      {location.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>

              <div className="page-section-title">
                <h3>Navigation Preview</h3>
              </div>

              <div className="page-placement-container">
                {menuLocations.map(location => (
                  <div 
                    key={location.id}
                    className={`placement-option ${form.getFieldValue('locations')?.includes(location.id) ? 'active' : ''}`}
                    onClick={() => {
                      const locations = form.getFieldValue('locations') || [];
                      if (locations.includes(location.id)) {
                        form.setFieldsValue({
                          locations: locations.filter(l => l !== location.id)
                        });
                      } else {
                        form.setFieldsValue({
                          locations: [...locations, location.id]
                        });
                      }
                    }}
                  >
                    {location.name}
                  </div>
                ))}
              </div>
            </TabPane>
          </Tabs>

          <Divider />

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
            <Button onClick={handleCancelEdit}>
              Cancel
            </Button>
            <Button type="primary" htmlType="submit" icon={<SaveOutlined />}>
              Save Page
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );

  // Template selection modal
  const renderTemplateSelection = () => (
    <Modal
      title="Choose a Template"
      visible={showTemplateModal}
      onCancel={() => setShowTemplateModal(false)}
      footer={[
        <Button key="cancel" onClick={() => setShowTemplateModal(false)}>
          Cancel
        </Button>,
        <Button 
          key="create" 
          type="primary" 
          disabled={!selectedTemplate}
          onClick={handleCreateFromTemplate}
        >
          Create Page
        </Button>
      ]}
      width={700}
    >
      <div style={{ marginBottom: 16 }}>
        <Text>Select a template to start with or create a blank page</Text>
      </div>
      
      <Row gutter={[16, 16]}>
        {pageTemplates.map(template => (
          <Col span={8} key={template.id}>
            <div 
              className={`page-template-card ${selectedTemplate?.id === template.id ? 'selected' : ''}`}
              onClick={() => handleSelectTemplate(template)}
            >
              <Title level={5}>{template.name}</Title>
              <Text type="secondary">{template.description}</Text>
            </div>
          </Col>
        ))}
      </Row>
    </Modal>
  );

  return (
    <div className="page-manager-tab">
      {editingPage || isCreating ? renderPageEditor() : renderPageList()}
      {renderTemplateSelection()}
    </div>
  );
};

export default PageManagerTab; 