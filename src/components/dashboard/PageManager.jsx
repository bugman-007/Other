import React, { useState, useEffect, useCallback } from 'react';
import { 
  Input, Button, Tag, Tooltip, Popconfirm, message, Modal, Form, Select, Tabs, Card
} from 'antd';
import { 
  EditOutlined, CopyOutlined, DeleteOutlined, EyeOutlined, 
  PlusOutlined, SearchOutlined, SaveOutlined, CloseOutlined
} from '@ant-design/icons';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import '../../pages/OwnerDashboardPage.css';
import './PageManager.css';

const { Option } = Select;
const { TabPane } = Tabs;

// Initial sample data - matches what was shown in the screenshot
const initialPages = [
  { 
    id: '1',
    title: 'Homepage',
    slug: '/home',
    placement: ['Main Navigation'],
    lastUpdated: '5/15/2023 10:30 AM',
  },
  { 
    id: '2',
    title: 'About Us',
    slug: '/about-us',
    placement: ['Main Navigation', 'Footer Primary'],
    lastUpdated: '5/16/2023 02:20 PM',
  },
  { 
    id: '3',
    title: 'Try On',
    slug: '/try-on',
    placement: ['Main Navigation'],
    lastUpdated: '5/17/2023 09:45 AM',
  },
  { 
    id: '4',
    title: 'Categories',
    slug: '/categories',
    placement: ['Main Navigation'],
    lastUpdated: '5/18/2023 04:10 PM',
  },
  { 
    id: '5',
    title: 'Privacy Policy',
    slug: '/privacy-policy',
    placement: ['Footer Secondary'],
    lastUpdated: '5/19/2023 11:00 AM',
  },
  { 
    id: '6',
    title: 'Terms & Conditions',
    slug: '/terms-conditions',
    placement: ['Footer Secondary'],
    lastUpdated: '5/20/2023 01:30 PM',
  },
  { 
    id: '7',
    title: 'Affiliate Program',
    slug: '/affiliate-program',
    placement: ['Footer Primary'],
    lastUpdated: '5/21/2023 03:45 PM',
  }
];

const PageManager = () => {
  const [pages] = useState(initialPages);
  const [searchText, setSearchText] = useState('');
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingPage, setEditingPage] = useState(null);
  const [form] = Form.useForm();
  const [selectedTemplate, setSelectedTemplate] = useState(null);
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

  // Determine if we're on a mobile device
  const isTablet = windowWidth >= 768 && windowWidth < 992;

  // Filter pages based on search text
  const filteredPages = pages.filter(page => {
    const searchLower = searchText.toLowerCase();
    return (
      page.title.toLowerCase().includes(searchLower) || 
      page.slug.toLowerCase().includes(searchLower)
    );
  });

  // Sort pages alphabetically by title
  const sortedPages = [...filteredPages].sort((a, b) => a.title.localeCompare(b.title));

  // Handle button actions (placeholders)
  const handleEditPage = (page) => message.info(`Editing page: ${page.title}`);
  const handleDuplicatePage = (page) => message.info(`Duplicating page: ${page.title}`);
  const handleDeletePage = (pageId) => message.info(`Deleting page with ID: ${pageId}`);
  const handleViewPage = (page) => message.info(`Viewing page: ${page.title}`);
  const handleCreatePage = () => message.info('Creating new page');

  // Open modal for creating a new page
  const handleAddPage = () => {
    setEditingPage(null);
    setModalVisible(true);
  };

  // Open modal for editing an existing page
  const handleEditPage = (page) => {
    setEditingPage(page);
    setModalVisible(true);
  };

  // Handle delete confirmation and action
  const handleDeletePage = (pageId) => {
    Modal.confirm({
      title: 'Are you sure you want to delete this page?',
      content: 'This action cannot be undone.',
      okText: 'Delete',
      okType: 'danger',
      cancelText: 'Cancel',
      onOk: () => {
        setPages(pages.filter(page => page.id !== pageId));
        message.success('Page deleted successfully');
      },
    });
  };

  // Handle page duplication
  const handleDuplicatePage = (page) => {
    const newPage = {
      ...page,
      id: Math.max(...pages.map(p => p.id)) + 1,
      title: `${page.title} (Copy)`,
      slug: `${page.slug}-copy`,
      lastUpdated: new Date().toISOString().split('T')[0]
    };
    setPages([...pages, newPage]);
    message.success('Page duplicated successfully');
  };

  // Form submission handler
  const handleFormSubmit = (values) => {
    if (editingPage) {
      // Update existing page
      setPages(pages.map(page => 
        page.id === editingPage.id 
          ? { ...page, ...values, lastUpdated: new Date().toISOString().split('T')[0] } 
          : page
      ));
      message.success('Page updated successfully');
    } else {
      // Create new page
      const newPage = {
        id: Math.max(...pages.map(p => p.id)) + 1,
        ...values,
        lastUpdated: new Date().toISOString().split('T')[0]
      };
      setPages([...pages, newPage]);
      message.success('Page created successfully');
    }
    setModalVisible(false);
  };

  // Handle template selection change
  const handleTemplateChange = (templateName) => {
    setSelectedTemplate(pages.find(p => p.title === templateName));
  };

  // Handle drag and drop reordering
  const handleDragEnd = (result) => {
    if (!result.destination) return;
    
    const items = Array.from(sortedPages);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    
    setPages(items);
  };

  // Find template name by id
  const getTemplateName = (templateId) => {
    const template = pages.find(p => p.title === templateId);
    return template ? template.title : 'Unknown';
  };

  // Get menu location names by ids
  const getMenuLocationNames = (locationIds) => {
    return locationIds.map(id => {
      const location = pages.find(p => p.title === id);
      return location ? location.title : '';
    }).filter(Boolean);
  };

  // Render placement tag
  const renderPlacementTag = (placement) => {
    let color = 'blue';
    if (placement === 'Footer Primary') color = 'green';
    if (placement === 'Footer Secondary') color = 'orange';
    
    return (
      <Tag 
        color={color} 
        key={placement}
        style={{
          margin: '2px',
          fontSize: isMobile ? '11px' : '12px',
          padding: isMobile ? '0 4px' : '0 7px',
          lineHeight: isMobile ? '18px' : '20px',
        }}
      >
        {placement}
      </Tag>
    );
  };

  // Render page list for mobile view
  const renderMobilePageList = () => (
    <div className="mobile-page-list">
      {sortedPages.map(page => (
        <Card key={page.id} className="mobile-page-card">
          <div className="mobile-page-card-header">
            <div className="mobile-page-card-title">{page.title}</div>
            <div className="mobile-page-card-slug">{page.slug}</div>
          </div>
          
          <div>
            <strong>Placement:</strong> 
            <div className="mobile-page-card-placements">
              {page.placement.map(placement => renderPlacementTag(placement))}
            </div>
          </div>
          
          <div>
            <strong>Last Updated:</strong> {page.lastUpdated}
          </div>
          
          <div className="mobile-page-card-actions">
            <Button icon={<EyeOutlined />} size="small" onClick={() => handleViewPage(page)} />
            <Button icon={<EditOutlined />} size="small" onClick={() => handleEditPage(page)} />
            <Button icon={<CopyOutlined />} size="small" onClick={() => handleDuplicatePage(page)} />
            <Button icon={<DeleteOutlined />} danger size="small" onClick={() => handleDeletePage(page.id)} />
          </div>
        </Card>
      ))}
    </div>
  );

  // Render page list for desktop view
  const renderDesktopPageList = () => (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="pages">
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="page-table-container"
          >
            <div className="page-table-header">
              <div className="page-table-cell">Title</div>
              <div className="page-table-cell">Slug</div>
              <div className="page-table-cell">Template</div>
              <div className="page-table-cell">Menu Placements</div>
              <div className="page-table-cell">Last Updated</div>
            </div>
            
            {sortedPages.map((page, index) => (
              <Draggable key={page.id} draggableId={page.id.toString()} index={index}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className="page-table-row"
                  >
                    <div className="page-table-cell title-cell">{page.title}</div>
                    <div className="page-table-cell url-cell">{page.slug}</div>
                    <div className="page-table-cell">{getTemplateName(page.template)}</div>
                    <div className="page-table-cell">
                      {getMenuLocationNames(page.placement).map(loc => (
                        <Tag key={loc}>{loc}</Tag>
                      ))}
                    </div>
                    <div className="page-table-cell updated-cell">{page.lastUpdated}</div>
                    <div className="page-table-cell actions-cell">
                      <Tooltip title="View">
                        <Button icon={<EyeOutlined />} size="small" onClick={() => handleViewPage(page)} />
                      </Tooltip>
                      <Tooltip title="Edit">
                        <Button icon={<EditOutlined />} size="small" onClick={() => handleEditPage(page)} />
                      </Tooltip>
                      <Tooltip title="Duplicate">
                        <Button icon={<CopyOutlined />} size="small" onClick={() => handleDuplicatePage(page)} />
                      </Tooltip>
                      <Tooltip title="Delete">
                        <Button icon={<DeleteOutlined />} danger size="small" onClick={() => handleDeletePage(page.id)} />
                      </Tooltip>
                    </div>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );

  return (
    <div className="page-manager-container">
      <div className="page-section-title">
        <h3>Manage Your Website Pages</h3>
        <p className="page-description">
          Create, edit, duplicate, and manage pages. Connect them to SEO settings 
          and add them to your site's navigation.
        </p>
      </div>
      
      <div className="page-actions-container">
        <div>
          <Input
            prefix={<SearchOutlined style={{ color: '#999' }} />}
            placeholder="Search pages"
            value={searchText}
            onChange={e => setSearchText(e.target.value)}
            className="page-filter-input"
            allowClear
          />
        </div>
        
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={handleAddPage}
        >
          Create New Page
        </Button>
      </div>
      
      {/* Table for desktop and tablet */}
      {!isMobile && (
        <div className="page-table-container">
          {renderDesktopPageList()}
        </div>
      )}
      
      {/* Cards for mobile */}
      {isMobile && (
        <div className="mobile-page-list">
          {renderMobilePageList()}
        </div>
      )}
      
      {/* No results message */}
      {filteredPages.length === 0 && (
        <div style={{ textAlign: 'center', padding: '40px 20px', color: '#666' }}>
          <p>No pages found matching your search.</p>
        </div>
      )}

      <Modal
        title={editingPage ? "Edit Page" : "Create New Page"}
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
        width={600}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleFormSubmit}
        >
          <Form.Item
            name="title"
            label="Page Title"
            rules={[{ required: true, message: 'Please enter a page title' }]}
          >
            <Input placeholder="Enter page title" />
          </Form.Item>
          
          <Form.Item
            name="slug"
            label="URL Slug"
            rules={[{ required: true, message: 'Please enter a URL slug' }]}
          >
            <Input placeholder="Enter URL slug" />
          </Form.Item>
          
          <Form.Item
            name="template"
            label="Page Template"
            rules={[{ required: true, message: 'Please select a template' }]}
          >
            <Select placeholder="Select template" onChange={handleTemplateChange}>
              {pages.map(p => (
                <Option key={p.title} value={p.title}>
                  {p.title}
                </Option>
              ))}
            </Select>
          </Form.Item>
          
          {selectedTemplate && (
            <div style={{ marginBottom: 16 }}>
              <p>Template description: {selectedTemplate.description}</p>
            </div>
          )}
          
          <Form.Item
            name="placement"
            label="Menu Placements"
          >
            <Select
              mode="multiple"
              placeholder="Select menu locations"
              style={{ width: '100%' }}
            >
              {pages.map(p => (
                <Option key={p.title} value={p.title}>
                  {p.title}
                </Option>
              ))}
            </Select>
          </Form.Item>
          
          <Form.Item>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <Button onClick={() => setModalVisible(false)}>
                Cancel
              </Button>
              <Button type="primary" htmlType="submit">
                {editingPage ? 'Update Page' : 'Create Page'}
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default PageManager; 