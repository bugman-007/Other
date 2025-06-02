import React, { useState } from 'react';
import { Modal, Rate, Input, Button, Radio, Space } from 'antd';
import { SmileOutlined, MehOutlined, FrownOutlined } from '@ant-design/icons';

const { TextArea } = Input;

const ReviewPopup = ({ visible, onClose, onSubmit, type = 'customer' }) => {
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [reason, setReason] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const isLowRating = rating > 0 && rating <= 3;
  const title = type === 'customer' ? 'How was your try-on experience?' : 'How was your scanning experience?';

  const handleSubmit = () => {
    onSubmit({
      rating,
      feedback,
      reason: isLowRating ? reason : '',
      type,
      date: new Date().toISOString(),
    });
    setSubmitted(true);
  };

  const handleClose = () => {
    setRating(0);
    setFeedback('');
    setReason('');
    setSubmitted(false);
    onClose();
  };

  const renderContent = () => {
    if (submitted) {
      return (
        <div className="text-center py-6">
          <div className="text-5xl mb-4 text-green-500">
            <SmileOutlined />
          </div>
          <h3 className="text-xl font-semibold mb-2">Thank you for your feedback!</h3>
          <p className="text-gray-500 mb-6">Your feedback helps us improve our service.</p>
          <Button type="primary" onClick={handleClose}>
            Close
          </Button>
        </div>
      );
    }

    return (
      <div className="py-4">
        <div className="mb-6 text-center">
          <h3 className="text-lg font-medium mb-4">{title}</h3>
          <Rate
            allowHalf
            className="text-2xl"
            onChange={setRating}
            value={rating}
          />
          <div className="text-sm text-gray-500 mt-2">
            {rating > 0 ? `You rated ${rating} out of 5 stars` : 'Tap to rate'}
          </div>
        </div>

        {isLowRating && (
          <div className="mb-6">
            <h4 className="font-medium mb-2">What went wrong?</h4>
            <Radio.Group onChange={(e) => setReason(e.target.value)} value={reason}>
              <Space direction="vertical">
                <Radio value="usability">Difficult to use</Radio>
                <Radio value="performance">Slow performance</Radio>
                <Radio value="accuracy">Poor accuracy</Radio>
                <Radio value="technical">Technical issues</Radio>
                <Radio value="other">Other</Radio>
              </Space>
            </Radio.Group>
          </div>
        )}

        <div className="mb-6">
          <h4 className="font-medium mb-2">Additional feedback (optional)</h4>
          <TextArea
            rows={4}
            placeholder="Tell us more about your experience..."
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
          />
        </div>

        <div className="flex justify-end space-x-3">
          <Button onClick={handleClose}>Cancel</Button>
          <Button 
            type="primary" 
            onClick={handleSubmit}
            disabled={rating === 0}
          >
            Submit
          </Button>
        </div>
      </div>
    );
  };

  return (
    <Modal
      open={visible}
      footer={null}
      onCancel={handleClose}
      closable={submitted}
      maskClosable={submitted}
      width={400}
      centered
      className="review-popup"
    >
      {renderContent()}
    </Modal>
  );
};

export default ReviewPopup; 