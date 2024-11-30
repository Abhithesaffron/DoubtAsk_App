import React, { useState } from "react";
import QuestionComponent from "./QuestionComponent";
import QuestionDetails from "./QuestionDetails";

const QuestionParent = ({ question }) => {
    console.log(question);
  const [openQuestionId, setOpenQuestionId] = useState(null);

  const toggleDetails = (id) => {
    setOpenQuestionId((prevId) => (prevId === id ? null : id));
  };

  return (
    <div className="question-list">
      
        openQuestionId === question.id ? (
          <QuestionDetails
            key={question.id}
            question={question}
            closeDetails={() => toggleDetails(question.id)}
          />
        ) : (
          <QuestionComponent
            key={question.id}
            question={question}
            isOpen={openQuestionId === question.id}
            toggleDetails={() => toggleDetails(question.id)}
          />
        )
      
    </div>
  );
};

export default QuestionParent;
