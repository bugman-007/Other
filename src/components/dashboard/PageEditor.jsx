import React, { useState, useEffect } from 'react';
import { Button, Form, Input, Card, message, Tabs, Select } from 'antd';
import HtmlEditor from './HtmlEditor';

const { TextArea } = Input;
const { TabPane } = Tabs;
const { Option } = Select;

const PageEditor = ({ initialContent, onSave, pageName }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('metaData');
  
  // Initialize form with content from props
  useEffect(() => {
    if (initialContent) {
      form.setFieldsValue(initialContent);
    }
  }, [initialContent, form]);

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      // Simulate API call with timeout
      await new Promise(resolve => setTimeout(resolve, 800));
      onSave(values);
      message.success(`${pageName} page content updated successfully`);
    } catch (error) {
      message.error('Failed to update content');
      console.error(`Error updating ${pageName} page content:`, error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card title={`Edit ${pageName} Page Content`} className="mb-6">
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={initialContent || {
          metaData: {
            title: '',
            description: '',
            keywords: ''
          },
          sections: []
        }}
      >
        <Tabs activeKey={activeTab} onChange={setActiveTab}>
          <TabPane tab="Meta Data" key="metaData">
            <Form.Item
              name={['metaData', 'title']}
              label="Page Title (SEO)"
              rules={[{ required: true, message: 'Please enter a page title' }]}
            >
              <Input placeholder="Page Title" />
            </Form.Item>
            
            <Form.Item
              name={['metaData', 'description']}
              label="Meta Description"
              rules={[{ required: true }]}
            >
              <TextArea rows={3} placeholder="Meta description for search engines..." />
            </Form.Item>
            
            <Form.Item
              name={['metaData', 'keywords']}
              label="Meta Keywords"
            >
              <TextArea rows={2} placeholder="keyword1, keyword2, keyword3..." />
            </Form.Item>
          </TabPane>
          
          <TabPane tab="Main Content" key="mainContent">
            <Form.Item
              name={['mainContent', 'heading']}
              label="Main Heading"
              rules={[{ required: true }]}
            >
              <Input placeholder="Main Heading" />
            </Form.Item>
            
            <Form.Item
              name={['mainContent', 'subheading']}
              label="Subheading"
            >
              <Input placeholder="Subheading" />
            </Form.Item>
            
            <Form.Item
              name={['mainContent', 'htmlContent']}
              label="Main Content (HTML)"
            >
              <HtmlEditor height="400px" />
            </Form.Item>
          </TabPane>
          
          <TabPane tab="Sections" key="sections">
            <Form.List name="sections">
              {(fields, { add, remove, move }) => (
                <>
                  {fields.map((field, index) => (
                    <Card 
                      key={field.key} 
                      title={`Section ${index + 1}`}
                      className="mb-6"
                      extra={
                        <div className="flex space-x-2">
                          {index > 0 && (
                            <Button onClick={() => move(index, index - 1)} size="small">
                              Move Up
                            </Button>
                          )}
                          {index < fields.length - 1 && (
                            <Button onClick={() => move(index, index + 1)} size="small">
                              Move Down
                            </Button>
                          )}
                          <Button danger onClick={() => remove(field.name)} size="small">
                            Remove
                          </Button>
                        </div>
                      }
                    >
                      <Form.Item
                        {...field}
                        name={[field.name, 'type']}
                        label="Section Type"
                        rules={[{ required: true }]}
                      >
                        <Select placeholder="Select section type">
                          <Option value="content">Content Section</Option>
                          <Option value="hero">Hero Section</Option>
                          <Option value="features">Features List</Option>
                          <Option value="gallery">Image Gallery</Option>
                          <Option value="cta">Call to Action</Option>
                          <Option value="faq">FAQ</Option>
                          <Option value="custom">Custom HTML</Option>
                        </Select>
                      </Form.Item>
                      
                      <Form.Item
                        {...field}
                        name={[field.name, 'title']}
                        label="Section Title"
                      >
                        <Input placeholder="Section Title" />
                      </Form.Item>
                      
                      <Form.Item
                        {...field}
                        name={[field.name, 'htmlContent']}
                        label="Section HTML Content"
                      >
                        <HtmlEditor height="300px" />
                      </Form.Item>
                    </Card>
                  ))}
                  
                  <Button 
                    type="dashed" 
                    onClick={() => add({ type: 'content', title: '', htmlContent: '' })} 
                    block
                  >
                    + Add Section
                  </Button>
                </>
              )}
            </Form.List>
          </TabPane>
          
          <TabPane tab="Full HTML Editor" key="fullHtml">
            <div className="mb-4 text-yellow-600 bg-yellow-50 p-3 rounded-md">
              Warning: This mode allows you to edit the entire page HTML directly. Improper HTML can break the page layout.
              Use with caution and ensure your HTML is valid.
            </div>
            <Form.Item
              name="fullHtmlContent"
              label="Full Page HTML"
            >
              <HtmlEditor height="600px" />
            </Form.Item>
          </TabPane>
        </Tabs>
        
        <div className="flex justify-end mt-6">
          <Button type="primary" htmlType="submit" loading={loading}>
            Save {pageName} Page
          </Button>
        </div>
      </Form>
    </Card>
  );
};

export default PageEditor; 