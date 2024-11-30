import React from "react";
import QuestionParent from "../Question/QuestionParent";
import { FaTrashAlt, FaEdit } from "react-icons/fa";
import "./UserHomePage.css";

const PendingApprovalsComponent = ({ pendingQuestions }) => {

  const handleEdit = (id) => {
    console.log("Editing question ID:", id);
  };
  
  const handleDelete = (id) => {
    console.log("Deleting question ID:", id);
  };

  return (
    <div className="question-list">
      <h2>Pending Approvals</h2>
      {pendingQuestions.length === 0 ? (
        <p>No questions pending approval.</p>
      ) : (
        pendingQuestions.map((question) => (
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

export default PendingApprovalsComponent;
