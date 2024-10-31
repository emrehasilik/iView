// src/components/popup/QuestionInterview.jsx
import React from 'react';
import { Modal } from 'antd';

const QuestionInterview = ({ isVisible, onClose, interview }) => {
  return (
    <Modal
      title="Interview Questions"
      open={isVisible}
      onCancel={onClose}
      footer={null}
    >
      <h3 className="font-bold">Questions:</h3>
      <ul>
        {interview.selectedPackages?.map((packageItem) => (
          packageItem.questions?.map((question) => (
            <li key={question._id}>{question.question}</li>
          ))
        ))}
      </ul>
    </Modal>
  );
};

export default QuestionInterview;
