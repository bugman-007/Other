import React, { useState, useEffect } from 'react';
import { Button, Form, Input, Card, message, Tabs, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import HtmlEditor from './HtmlEditor';

const { TextArea } = Input;

const AboutPageEdit = ({ initialContent, onSave }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  
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
      message.success('About page content updated successfully');
    } catch (error) {
      message.error('Failed to update content');
      console.error('Error updating about page content:', error);
    } finally {
      setLoading(false);
    }
  };

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  return (
    <Card title="Edit About Page Content" className="mb-6">
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={initialContent || {}}
      >
        <Tabs defaultActiveKey="hero" items={[
          {
            key: 'hero',
            label: 'Hero Section',
            children: (
              <>
                <Form.Item
                  name={['hero', 'heading']}
                  label="Main Heading"
                  rules={[{ required: true, message: 'Please enter a main heading' }]}
                >
                  <Input placeholder="Welcome to Kokomatto" />
                </Form.Item>
                
                <Form.Item
                  name={['hero', 'subheading']}
                  label="Subheading"
                >
                  <Input placeholder="Revolutionizing the way you shop for clothes" />
                </Form.Item>

                <Form.Item
                  name={['hero', 'htmlContent']}
                  label="HTML Content"
                >
                  <HtmlEditor />
                </Form.Item>
              </>
            )
          },
          {
            key: 'story',
            label: 'Our Story',
            children: (
              <>
                <Form.Item
                  name={['story', 'heading']}
                  label="Section Heading"
                  rules={[{ required: true }]}
                >
                  <Input placeholder="Our Story" />
                </Form.Item>
                
                <Form.Item
                  name={['story', 'content']}
                  label="Section Content (Plain Text)"
                >
                  <TextArea rows={4} placeholder="Describe your company's story..." />
                </Form.Item>

                <Form.Item
                  name={['story', 'htmlContent']}
                  label="Section Content (HTML)"
                >
                  <HtmlEditor height="250px" />
                </Form.Item>
                
                <Form.Item
                  name={['story', 'image']}
                  label="Section Image URL"
                  rules={[{ required: true }]}
                >
                  <Input placeholder="https://example.com/image.jpg" />
                </Form.Item>
              </>
            )
          },
          {
            key: 'mission',
            label: 'Our Mission',
            children: (
              <>
                <Form.Item
                  name={['mission', 'heading']}
                  label="Section Heading"
                  rules={[{ required: true }]}
                >
                  <Input placeholder="Our Mission" />
                </Form.Item>
                
                <Form.Item
                  name={['mission', 'content']}
                  label="Section Content (Plain Text)"
                >
                  <TextArea rows={4} placeholder="Describe your company's mission..." />
                </Form.Item>

                <Form.Item
                  name={['mission', 'htmlContent']}
                  label="Section Content (HTML)"
                >
                  <HtmlEditor height="250px" />
                </Form.Item>
                
                <Form.Item
                  name={['mission', 'image']}
                  label="Section Image URL"
                  rules={[{ required: true }]}
                >
                  <Input placeholder="https://example.com/image.jpg" />
                </Form.Item>
              </>
            )
          },
          {
            key: 'technology',
            label: 'Technology',
            children: (
              <>
                <Form.Item
                  name={['technology', 'heading']}
                  label="Section Heading"
                  rules={[{ required: true }]}
                >
                  <Input placeholder="Our Technology" />
                </Form.Item>
                
                <Form.Item
                  name={['technology', 'content']}
                  label="Section Content (Plain Text)"
                >
                  <TextArea rows={4} placeholder="Describe your technology..." />
                </Form.Item>

                <Form.Item
                  name={['technology', 'htmlContent']}
                  label="Section Content (HTML)"
                >
                  <HtmlEditor height="250px" />
                </Form.Item>
                
                <Form.Item label="Features">
                  <Form.List name={['technology', 'features']}>
                    {(fields, { add, remove }) => (
                      <>
                        {fields.map(({ key, name, ...restField }) => (
                          <Card size="small" key={key} className="mb-3" extra={
                            <Button danger onClick={() => remove(name)}>
                              Remove
                            </Button>
                          }>
                            <Form.Item
                              {...restField}
                              name={[name, 'title']}
                              label="Feature Title"
                              rules={[{ required: true, message: 'Please enter feature title' }]}
                            >
                              <Input placeholder="Feature Title" />
                            </Form.Item>
                            
                            <Form.Item
                              {...restField}
                              name={[name, 'description']}
                              label="Feature Description"
                              rules={[{ required: true, message: 'Please enter feature description' }]}
                            >
                              <TextArea rows={2} placeholder="Feature description" />
                            </Form.Item>

                            <Form.Item
                              {...restField}
                              name={[name, 'htmlDescription']}
                              label="Feature HTML Description"
                            >
                              <HtmlEditor height="150px" />
                            </Form.Item>
                          </Card>
                        ))}
                        
                        <Button type="dashed" onClick={() => add()} block>
                          + Add Feature
                        </Button>
                      </>
                    )}
                  </Form.List>
                </Form.Item>
              </>
            )
          },
          {
            key: 'custom',
            label: 'Custom HTML',
            children: (
              <>
                <Form.Item
                  name={['custom', 'title']}
                  label="Section Title"
                >
                  <Input placeholder="Custom Section" />
                </Form.Item>
                
                <Form.Item
                  name={['custom', 'htmlContent']}
                  label="Full HTML Content"
                  help="Use this section to add any custom HTML content to the page"
                >
                  <HtmlEditor height="400px" />
                </Form.Item>
              </>
            )
          }
        ]} />
        
        <div className="flex justify-end mt-6">
          <Button type="primary" htmlType="submit" loading={loading}>
            Save Changes
          </Button>
        </div>
      </Form>
    </Card>
  );
};

export default AboutPageEdit; 