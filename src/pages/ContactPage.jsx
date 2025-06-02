import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Select, message, Card, Spin } from 'antd';
import { MailOutlined, PhoneOutlined, WhatsAppOutlined, EnvironmentOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';

const { Option } = Select;
const { TextArea } = Input;

const ContactPage = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [contactInfo, setContactInfo] = useState({
    countries: [
      {
        code: 'us',
        name: 'United States',
        phone: '+1 (555) 123-4567',
        whatsapp: '+1 234 567 8901',
        address: '123 Business Avenue, Suite 100, New York, NY 10001'
      },
      {
        code: 'uk',
        name: 'United Kingdom',
        phone: '+44 20 1234 5678',
        whatsapp: '+44 7123 456789',
        address: '10 Oxford Street, London, W1D 1BS, UK'
      },
      {
        code: 'ca',
        name: 'Canada',
        phone: '+1 (416) 555-7890',
        whatsapp: '+1 (647) 555-1234',
        address: '789 Bay Street, Toronto, ON M5G 2N8, Canada'
      }
    ],
    contactEmails: {
      general: 'contact@virtualtry-on.com',
      support: 'support@virtualtry-on.com',
      business: 'business@virtualtry-on.com'
    },
    mainWhatsAppNumber: '+1 800 555 1234'
  });
  const [selectedLocation, setSelectedLocation] = useState('us');

  useEffect(() => {
    const fetchContactInfo = async () => {
      setLoading(true);
      try {
        // Simulate API call
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error fetching contact information:', error);
        message.error('Failed to load contact information');
        setLoading(false);
      }
    };

    fetchContactInfo();
  }, []);

  const handleSubmit = (values) => {
    setSubmitting(true);
    // Simulate sending data to server
    setTimeout(() => {
      console.log('Form submitted:', values);
      message.success('Your message has been sent successfully!');
      form.resetFields();
      setSubmitting(false);
    }, 1500);
  };

  const handleLocationChange = (value) => {
    setSelectedLocation(value);
  };

  const currentLocation = contactInfo.countries.find(country => country.code === selectedLocation) || contactInfo.countries[0];

  const quickHelpItems = [
    { title: 'How do I create an account?', link: '/faq#create-account' },
    { title: 'What payment methods do you accept?', link: '/faq#payment-methods' },
    { title: 'How do I reset my password?', link: '/faq#reset-password' },
    { title: 'How can I return an item?', link: '/faq#returns' }
  ];

  const commonQuestions = [
    { title: 'How accurate is the virtual try-on?', link: '/faq#try-on-accuracy' },
    { title: 'Can I try on clothes from any store?', link: '/faq#supported-stores' },
    { title: 'Is my body measurement data secure?', link: '/faq#data-security' },
    { title: 'Do you have a mobile app?', link: '/faq#mobile-app' },
    { title: 'How do I become a merchant partner?', link: '/faq#merchant-partner' }
  ];

  const categories = [
    { name: 'Women', link: '/categories/women' },
    { name: 'Men', link: '/categories/men' },
    { name: 'Kids', link: '/categories/kids' },
    { name: 'Accessories', link: '/categories/accessories' },
    { name: 'New Arrivals', link: '/new-arrivals' },
    { name: 'Sale', link: '/sale' }
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <Layout>
      {/* Blue Header Section */}
      <div className="bg-blue-600 text-white py-12 px-4 md:px-8 pt-24">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
          <p className="text-xl max-w-3xl">
            Have questions about our virtual try-on platform? We're here to help! Choose your location and reach out through your preferred method.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        {/* Location Selector */}
        <div className="mb-8">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Select Your Location:
          </label>
          <Select
            value={selectedLocation}
            onChange={handleLocationChange}
            className="w-full md:w-64"
          >
            {contactInfo.countries.map(country => (
              <Option key={country.code} value={country.code}>{country.name}</Option>
            ))}
          </Select>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {/* Contact Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {/* Email Card */}
              <Card className="shadow-md hover:shadow-lg transition-shadow">
                <div className="flex items-start">
                  <div className="p-3 bg-blue-100 rounded-full">
                    <MailOutlined className="text-blue-600 text-xl" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold mb-2">Email Us</h3>
                    <p className="text-gray-600 mb-1">General: {contactInfo.contactEmails.general}</p>
                    <p className="text-gray-600 mb-1">Support: {contactInfo.contactEmails.support}</p>
                    <p className="text-gray-600">Business: {contactInfo.contactEmails.business}</p>
                  </div>
                </div>
              </Card>

              {/* Call Card */}
              <Card className="shadow-md hover:shadow-lg transition-shadow">
                <div className="flex items-start">
                  <div className="p-3 bg-green-100 rounded-full">
                    <PhoneOutlined className="text-green-600 text-xl" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold mb-2">Call Us</h3>
                    <p className="text-gray-600 mb-1">
                      {currentLocation.name}: {currentLocation.phone}
                    </p>
                    <p className="text-gray-600">Available 24/7 for urgent requests</p>
                  </div>
                </div>
              </Card>

              {/* WhatsApp Card */}
              <Card className="shadow-md hover:shadow-lg transition-shadow">
                <div className="flex items-start">
                  <div className="p-3 bg-green-100 rounded-full">
                    <WhatsAppOutlined className="text-green-600 text-xl" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold mb-2">WhatsApp</h3>
                    <p className="text-gray-600 mb-1">
                      {currentLocation.name}: {currentLocation.whatsapp}
                    </p>
                    <p className="text-gray-600">Get quick responses via WhatsApp</p>
                  </div>
                </div>
              </Card>

              {/* Visit Card */}
              <Card className="shadow-md hover:shadow-lg transition-shadow">
                <div className="flex items-start">
                  <div className="p-3 bg-orange-100 rounded-full">
                    <EnvironmentOutlined className="text-orange-600 text-xl" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold mb-2">Visit Us</h3>
                    <p className="text-gray-600 mb-1">{currentLocation.address}</p>
                    <p className="text-gray-600">Mon-Fri: 9 AM - 6 PM</p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Contact Form */}
            <Card title="Send Us a Message" className="shadow-md mb-8">
              <Form
                form={form}
                layout="vertical"
                onFinish={handleSubmit}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Form.Item
                    name="name"
                    label="Full Name"
                    rules={[{ required: true, message: 'Please enter your name' }]}
                  >
                    <Input placeholder="John Doe" />
                  </Form.Item>

                  <Form.Item
                    name="email"
                    label="Email Address"
                    rules={[
                      { required: true, message: 'Please enter your email' },
                      { type: 'email', message: 'Please enter a valid email' }
                    ]}
                  >
                    <Input placeholder="john@example.com" />
                  </Form.Item>
                </div>

                <Form.Item
                  name="subject"
                  label="Subject"
                  rules={[{ required: true, message: 'Please enter a subject' }]}
                >
                  <Input placeholder="How can we help you?" />
                </Form.Item>

                <Form.Item
                  name="message"
                  label="Message"
                  rules={[{ required: true, message: 'Please enter your message' }]}
                >
                  <TextArea rows={5} placeholder="Please describe your inquiry in detail..." />
                </Form.Item>

                <Form.Item>
                  <Button 
                    type="primary" 
                    htmlType="submit" 
                    size="large"
                    loading={submitting}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    Send Message
                  </Button>
                </Form.Item>
              </Form>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Quick Help */}
            <Card title="Quick Help" className="shadow-md mb-6">
              <ul className="divide-y divide-gray-200">
                {quickHelpItems.map((item, index) => (
                  <li key={index} className="py-2">
                    <a 
                      href={item.link} 
                      className="text-blue-600 hover:text-blue-800 hover:underline block"
                    >
                      {item.title}
                    </a>
                  </li>
                ))}
              </ul>
              <div className="mt-4">
                <Button 
                  type="link" 
                  onClick={() => navigate('/faq')}
                  className="p-0 text-blue-600 hover:text-blue-800"
                >
                  View All FAQs →
                </Button>
              </div>
            </Card>

            {/* Common Questions */}
            <Card title="Common Questions" className="shadow-md">
              <ul className="divide-y divide-gray-200">
                {commonQuestions.map((question, index) => (
                  <li key={index} className="py-2">
                    <a 
                      href={question.link} 
                      className="text-blue-600 hover:text-blue-800 hover:underline block"
                    >
                      {question.title}
                    </a>
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ContactPage; 