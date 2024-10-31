// src/components/popup/QuestionInterview.jsx
import React from 'react';
import { Modal } from 'antd';

const QuestionInterview = ({ isVisible, onClose, interview }) => {
  return (
    <Modal
      title={<h2 className="text-2xl font-semibold text-primary">Interview Questions</h2>}
      open={isVisible}
      onCancel={onClose}
      footer={null}
      bodyStyle={{ padding: '20px', backgroundColor: '#f9f9f9' }} // Modal arka plan rengi
    >
      <h3 className="text-lg font-bold text-secondary mb-4">Questions:</h3>
      <ul className="space-y-3">
        {interview.selectedPackages.map((packageItem, index) => (
          <div key={index} className="mb-6">
            <h4 className="text-base font-semibold text-primary mb-3">{packageItem.title}</h4>
            <ul className="pl-6 list-disc text-gray-800 space-y-2">
              {packageItem.questions.map((question) => (
                <li key={question._id} className="border-b border-gray-300 py-2 text-gray-700">
                  {question.question}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </ul>
    </Modal>
  );
};

export default QuestionInterview;
  