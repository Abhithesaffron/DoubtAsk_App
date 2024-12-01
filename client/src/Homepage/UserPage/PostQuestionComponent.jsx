import React, { useState } from "react";
import axios from "axios";

const PostQuestionComponent = () => {
  const [newQuestion, setNewQuestion] = useState("");
  const token = localStorage.getItem("authToken");

  const onSubmit = async () => {
    if (newQuestion.trim() === "") return;
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/questions/`,
        { text: newQuestion },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setNewQuestion("");
      // Optionally, update the list of pending or user questions here
    } catch (error) {
      console.error("Error submitting question:", error);
    }
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
