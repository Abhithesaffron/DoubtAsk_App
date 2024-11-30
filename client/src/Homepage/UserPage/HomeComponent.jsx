import React from "react";
import QuestionParent from "../Question/QuestionParent";

const HomeComponent = ({ approvedQuestions }) => {
  return (
    <div className="question-list">
      <h2>Approved Questions</h2>
      {approvedQuestions.length === 0 ? (
        <p>No approved questions available.</p>
      ) : (
        approvedQuestions.map((question) => (
          <QuestionParent key={question.questionId} question={question} />
        ))
      )}
    </div>
  );
};

export default HomeComponent;
