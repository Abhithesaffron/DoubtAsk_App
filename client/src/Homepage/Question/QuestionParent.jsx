import React, { useState } from "react";
import QuestionComponent from "./QuestionComponent";
import QuestionDetails from "./QuestionDetails";
import "./QuestionParent.css";

const QuestionParent = ({ question }) => {
  const [openQuestionId, setOpenQuestionId] = useState(null);

  const toggleDetails = (id) => {
    setOpenQuestionId((prevId) => (prevId === id ? null : id));
  };

  return (
    <div className="question-container">
      <QuestionComponent
        key={question.questionId}
        question={question}
        isOpen={openQuestionId === question.questionId}
        toggleDetails={() => toggleDetails(question.questionId)}
      />
      {openQuestionId === question.questionId && (
        <QuestionDetails
          key={`${question.questionId}-details`}
          question={question}
          closeDetails={() => toggleDetails(question.questionId)}
        />
      )}
    </div>
  );
};

export default QuestionParent;
