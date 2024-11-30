import React from "react";
import QuestionParent from '../Question/QuestionParent'
import { FaTrashAlt, FaEdit } from "react-icons/fa";

const YourQuestionsComponent = ({ userQuestions }) => {
  return (
    <div className="question-list">
      <h2>Your Questions</h2>
      {userQuestions.length === 0 ? (
        <p>No questions pending approval.</p>
      ) : (
        userQuestions.map((question) => (
          <div key={question.questionId} className="pending-question-item">
            {/* Question Details */}
            <QuestionParent question={question} />

            {/* Action Icons */}
            <div className="question-actions">
              <FaEdit className="edit-icon" onClick={() => handleEdit(question.questionId)} />
              <FaTrashAlt className="delete-icon" onClick={() => handleDelete(question.questionId)} />
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default YourQuestionsComponent;
