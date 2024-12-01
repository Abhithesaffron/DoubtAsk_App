import React, { useEffect, useState } from "react";
import axios from "axios";
import QuestionParent from "../Question/QuestionParent";
import { FaTrashAlt, FaEdit } from "react-icons/fa";
import "./UserHomePage.css";

const YourQuestionsComponent = () => {
  const [userQuestions, setUserQuestions] = useState([]);
  const [editingQuestionId, setEditingQuestionId] = useState(null);
  const [editedQuestionText, setEditedQuestionText] = useState("");
  const token = localStorage.getItem("authToken");

  // Fetch all user questions
  const fetchUserQuestions = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/questions/user`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      
      // Ensure response data is valid and set userQuestions
      if (Array.isArray(response.data)) {
        setUserQuestions(response.data);
      } else {
        console.error("Unexpected response format:", response.data);
      }
    } catch (error) {
      console.error("Error fetching user questions:", error);
    }
  };

  // Fetch questions on initial render and when token changes
  useEffect(() => {
    fetchUserQuestions();
  }, [token]);

  const handleEdit = (question) => {
    setEditingQuestionId(question.questionId);
    setEditedQuestionText(question.questionText); // Prefill with the current question text
  };

  const handleCancelEdit = () => {
    setEditingQuestionId(null);
    setEditedQuestionText(""); // Reset the edited text
  };

  const handleSubmitEdit = async (id) => {
    try {
      // Perform the API request to update the question
      const response = await axios.put(
        `${import.meta.env.VITE_BASE_URL}/api/questions/${id}/edit`,
        {
          questionText: editedQuestionText,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // console.log("Updated Question:", editedQuestionText);

      // Re-fetch the questions after a successful update
      fetchUserQuestions();

      // Clear the editing state
      handleCancelEdit();
    } catch (error) {
      console.error("Error updating question:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_BASE_URL}/api/questions/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      console.log("Deleted Question:", response.data);

      // Remove the deleted question from the state
      setUserQuestions((prev) => prev.filter((question) => question.questionId !== id));
    } catch (error) {
      console.error("Error deleting question:", error);
    }
  };

  return (
    <div className="question-list">
      <h2>Your Questions</h2>
      {userQuestions.length === 0 ? (
        <p>You have not posted any questions yet.</p>
      ) : (
        userQuestions.map((question) => {
          // Check if question is not null or undefined
          if (!question || !question.questionId) {
            return null; // Skip invalid question entries
          }

          return (
            <div key={question.questionId} className="pending-question-item">
              {/* If we are editing this question, render the form */}
              {editingQuestionId === question.questionId ? (
                <div className="edit-form">
                  <div>
                    <label>Question Text</label>
                    <textarea
                      value={editedQuestionText}
                      onChange={(e) => setEditedQuestionText(e.target.value)}
                    />
                  </div>
                  <button onClick={() => handleSubmitEdit(question.questionId)}>
                    Submit Edit
                  </button>
                  <button onClick={handleCancelEdit}>Cancel</button>
                </div>
              ) : (
                <>
                  {/* Question Details */}
                  <QuestionParent question={question} />

                  {/* Action Icons */}
                  <div className="question-actions">
                    <FaEdit
                      className="edit-icon"
                      onClick={() => handleEdit(question)}
                    />
                    <FaTrashAlt
                      className="delete-icon"
                      onClick={() => handleDelete(question.questionId)}
                    />
                  </div>
                </>
              )}
            </div>
          );
        })
      )}
    </div>
  );
};

export default YourQuestionsComponent;
