import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Card, Table, message, Space, Modal } from 'antd';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';

const ContactPageEdit = ({ initialContent, onSave }) => {
  const [form] = Form.useForm();
  const [countries, setCountries] = useState(initialContent?.countries || []);
  const [editingCountry, setEditingCountry] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [contactEmails, setContactEmails] = useState(initialContent?.contactEmails || {
    general: '',
    support: '',
    business: ''
  });
  const [mainWhatsAppNumber, setMainWhatsAppNumber] = useState(initialContent?.mainWhatsAppNumber || '');

  useEffect(() => {
    // Update the form when initialContent changes
    if (initialContent) {
      setCountries(initialContent.countries || []);
      setContactEmails(initialContent.contactEmails || {});
      setMainWhatsAppNumber(initialContent.mainWhatsAppNumber || '');
      form.setFieldsValue({
        contactEmails: initialContent.contactEmails,
        mainWhatsAppNumber: initialContent.mainWhatsAppNumber
      });
    }
  }, [initialContent, form]);

  const handleEmailChange = (field, value) => {
    setContactEmails(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleMainWhatsAppChange = (value) => {
    setMainWhatsAppNumber(value);
  };

  const showAddCountryModal = () => {
    setEditingCountry(null);
    form.resetFields(['countryCode', 'countryName', 'countryWhatsApp', 'countryPhone', 'countryAddress']);
    setIsModalVisible(true);
  };

  const showEditCountryModal = (country) => {
    setEditingCountry(country);
    form.setFieldsValue({
      countryCode: country.code,
      countryName: country.name,
      countryWhatsApp: country.whatsapp,
      countryPhone: country.phone || '',
      countryAddress: country.address || ''
    });
    setIsModalVisible(true);
  };

  const handleSaveCountry = () => {
    form.validateFields(['countryCode', 'countryName', 'countryWhatsApp', 'countryPhone', 'countryAddress'])
      .then(values => {
        const newCountry = {
          code: values.countryCode,
          name: values.countryName,
          whatsapp: values.countryWhatsApp,
          phone: values.countryPhone,
          address: values.countryAddress
        };

        if (editingCountry) {
          // Update existing country
          setCountries(prev => 
            prev.map(c => c.code === editingCountry.code ? newCountry : c)
          );
          message.success('Country updated successfully');
        } else {
          // Add new country
          if (countries.some(c => c.code === newCountry.code)) {
            message.error('Country code already exists');
            return;
          }
          
          setCountries(prev => [...prev, newCountry]);
          message.success('Country added successfully');
        }
        
        setIsModalVisible(false);
      })
      .catch(info => {
        console.log('Validate Failed:', info);
      });
  };

  const handleDeleteCountry = (code) => {
    Modal.confirm({
      title: 'Are you sure you want to remove this country?',
      content: 'This action cannot be undone.',
      okText: 'Yes, delete it',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        setCountries(prev => prev.filter(country => country.code !== code));
        message.success('Country removed successfully');
      }
    });
  };

  const handleSubmit = () => {
    form.validateFields(['generalEmail', 'supportEmail', 'businessEmail', 'mainWhatsApp'])
      .then(values => {
        const updatedContent = {
          countries,
          contactEmails: {
            general: values.generalEmail,
            support: values.supportEmail,
            business: values.businessEmail
          },
          mainWhatsAppNumber: values.mainWhatsApp
        };
        
        onSave(updatedContent);
      })
      .catch(info => {
        console.log('Validate Failed:', info);
      });
  };

  // Responsive columns configuration with adjustments for mobile
  const countryColumns = [
    {
      title: 'Country Code',
      dataIndex: 'code',
      key: 'code',
      responsive: ['md'],
    },
    {
      title: 'Country',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
      responsive: ['lg'],
      render: (text) => text || <span className="text-gray-400 italic">Not provided</span>
    },
    {
      title: 'WhatsApp',
      dataIndex: 'whatsapp',
      key: 'whatsapp',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space size="small">
          <Button 
            type="text" 
            icon={<EditOutlined />} 
            onClick={() => showEditCountryModal(record)} 
          />
          <Button 
            type="text" 
            danger 
            icon={<DeleteOutlined />} 
            onClick={() => handleDeleteCountry(record.code)} 
          />
        </Space>
      ),
    },
  ];

  return (
    <div className="w-full overflow-x-hidden">
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Card title="Email Addresses" className="mb-4 w-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Form.Item 
              name="generalEmail" 
              label="General Inquiries Email"
              initialValue={contactEmails.general}
              rules={[{ required: true, message: 'Please input an email', type: 'email' }]}
              className="w-full"
            >
              <Input 
                placeholder="contact@example.com" 
                onChange={(e) => handleEmailChange('general', e.target.value)}
              />
            </Form.Item>
            
            <Form.Item 
              name="supportEmail" 
              label="Support Email"
              initialValue={contactEmails.support}
              rules={[{ required: true, message: 'Please input an email', type: 'email' }]}
              className="w-full"
            >
              <Input 
                placeholder="support@example.com" 
                onChange={(e) => handleEmailChange('support', e.target.value)}
              />
            </Form.Item>
            
            <Form.Item 
              name="businessEmail" 
              label="Business Development Email"
              initialValue={contactEmails.business}
              rules={[{ required: true, message: 'Please input an email', type: 'email' }]}
              className="w-full sm:col-span-2 lg:col-span-1"
            >
              <Input 
                placeholder="business@example.com" 
                onChange={(e) => handleEmailChange('business', e.target.value)}
              />
            </Form.Item>
          </div>
        </Card>
        
        <Card title="Main WhatsApp Contact" className="mb-4 w-full">
          <Form.Item 
            name="mainWhatsApp" 
            label="Primary WhatsApp Number"
            initialValue={mainWhatsAppNumber}
            rules={[{ required: true, message: 'Please input the WhatsApp number' }]}
          >
            <Input 
              placeholder="+1 234 567 8900" 
              onChange={(e) => handleMainWhatsAppChange(e.target.value)}
            />
          </Form.Item>
        </Card>
        
        <Card 
          title="Country-specific Contact Information" 
          className="mb-4 w-full"
          extra={
            <Button 
              type="primary" 
              icon={<PlusOutlined />} 
              onClick={showAddCountryModal}
              className="flex items-center"
            >
              <span className="hidden xs:inline-block ml-1">Add Country</span>
            </Button>
          }
        >
          <div className="overflow-x-auto -mx-4 sm:mx-0">
            <Table 
              dataSource={countries} 
              columns={countryColumns} 
              rowKey="code"
              pagination={false}
              scroll={{ x: 'max-content' }}
              expandable={{
                expandedRowRender: record => (
                  <div className="py-2 px-4">
                    <p><strong>Code:</strong> {record.code}</p>
                    <p><strong>Phone:</strong> {record.phone || <span className="text-gray-400 italic">Not provided</span>}</p>
                    <p><strong>Address:</strong> {record.address || <span className="text-gray-400 italic">Not provided</span>}</p>
                  </div>
                ),
                expandRowByClick: true,
                expandIconColumnIndex: 5,
                rowExpandable: () => window.innerWidth < 768,
              }}
              className="w-full"
              size="small"
            />
          </div>
        </Card>
        
        <div className="flex justify-end mt-4">
          <Button type="primary" htmlType="submit" size="large">
            Save Changes
          </Button>
        </div>
      </Form>
      
      <Modal 
        title={editingCountry ? "Edit Country" : "Add Country"} 
        visible={isModalVisible}
        onOk={handleSaveCountry}
        onCancel={() => setIsModalVisible(false)}
        width={window.innerWidth < 640 ? "95%" : 520}
        destroyOnClose
      >
        <Form form={form} layout="vertical">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Form.Item
              name="countryCode"
              label="Country Code"
              rules={[{ required: true, message: 'Please input the country code' }]}
              className="w-full"
            >
              <Input placeholder="US" maxLength={2} />
            </Form.Item>
            
            <Form.Item
              name="countryName"
              label="Country Name"
              rules={[{ required: true, message: 'Please input the country name' }]}
              className="w-full"
            >
              <Input placeholder="United States" />
            </Form.Item>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Form.Item
              name="countryPhone"
              label="Phone Number"
              className="w-full"
            >
              <Input placeholder="+1 234 567 8900" />
            </Form.Item>
            
            <Form.Item
              name="countryWhatsApp"
              label="WhatsApp Number"
              rules={[{ required: true, message: 'Please input the WhatsApp number' }]}
              className="w-full"
            >
              <Input placeholder="+1 234 567 8901" />
            </Form.Item>
          </div>
          
          <Form.Item
            name="countryAddress"
            label="Office Address"
            className="w-full"
          >
            <Input.TextArea rows={3} placeholder="123 Main St, New York, NY 10001" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ContactPageEdit; 