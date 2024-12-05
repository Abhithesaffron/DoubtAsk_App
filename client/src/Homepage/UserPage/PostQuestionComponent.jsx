import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PostQuestionComponent = () => {
  const [newQuestion, setNewQuestion] = useState("");
  const token = localStorage.getItem("authToken");

  const onSubmit = async () => {
    if (newQuestion.trim() === "") {
      toast.error("Question cannot be empty!");
      return;
    }

    toast.promise(
      new Promise(async (resolve, reject) => {
        try {
          const response = await axios.post(
            `${import.meta.env.VITE_BASE_URL}/api/questions/`,
            { text: newQuestion },
            { headers: { Authorization: `Bearer ${token}` } }
          );

          setNewQuestion(""); // Clear the input field on success
          resolve("Question posted successfully!");

          // Optionally, trigger updates to question lists or UI here
        } catch (error) {
          reject("Failed to post the question. Please try again!");
        }
      }),
      {
        pending: "Submitting your question...",
        success: "Question posted successfully!",
        error: {
          render({ data }) {
            return data; // Use the custom error message
          },
        },
      }
    );
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
