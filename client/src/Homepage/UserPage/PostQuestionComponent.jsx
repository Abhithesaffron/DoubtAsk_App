import React, { useState } from "react";

const PostQuestionComponent = ({ handleSubmitQuestion }) => {
  const [newQuestion, setNewQuestion] = useState("");

  const onSubmit = () => {
    if (newQuestion.trim() === "") return;
    handleSubmitQuestion(newQuestion);
    setNewQuestion("");
  };

  return (
    <div className="post-question">
      <h2>Post a New Question</h2>
      <textarea
        placeholder="Type your question here..."
        value={newQuestion}
        onChange={(e) => setNewQuestion(e.target.value)}
      />
      <button className="submit-button" onClick={onSubmit}>
        Submit
      </button>
    </div>
  );
};

export default PostQuestionComponent;
