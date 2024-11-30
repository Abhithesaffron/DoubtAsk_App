import React from "react";
import "./QuestionComponent.css";

const QuestionComponent = ({ question, isOpen, toggleDetails }) => {
  return (
    <div className={`question-card ${isOpen ? "hidden" : ""}`}>
      <p className="question-text" onClick={toggleDetails}>
        {question.questionText}
      </p>
      <div className="question-info">
        <span className="username">Posted by: {question.userId}</span>
        <span className="likes">Likes: {question.likes.size}</span>
      </div>
    </div>
  );
};

export default QuestionComponent;
