import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaTrashAlt, FaEdit } from "react-icons/fa";
import QuestionParent from "../Question/QuestionParent";

const PendingApprovalsComponent = () => {
  const [pendingQuestions, setPendingQuestions] = useState([]);
  const [editingQuestionId, setEditingQuestionId] = useState(null);
  const [editedQuestionText, setEditedQuestionText] = useState("");
  const token = localStorage.getItem("authToken");

  // Fetch all pending questions
  const fetchPendingQuestions = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/questions/user/pending`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPendingQuestions(response.data);
    } catch (error) {
      console.error("Error fetching pending questions:", error);
    }
  };

  // Fetch questions on initial render and when token changes
  useEffect(() => {
    fetchPendingQuestions();
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
      await axios.put(
        `${import.meta.env.VITE_BASE_URL}/api/questions/${id}/edit`,
        { questionText: editedQuestionText },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // Re-fetch the questions after a successful update
      fetchPendingQuestions();

      // Clear the editing state
      handleCancelEdit();
    } catch (error) {
      console.error("Error updating question:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_BASE_URL}/api/questions/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Remove the deleted question from the UI
      setPendingQuestions((prev) => prev.filter((q) => q.questionId !== id));
    } catch (error) {
      console.error("Error deleting question:", error);
    }
  };

  return (
    <div className="question-list">
      <h2>Pending Approvals</h2>
      {pendingQuestions.length === 0 ? (
        <p>No questions pending approval.</p>
      ) : (
        pendingQuestions.map((question) => (
          <div key={question.questionId} className="pending-question-item">
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
                  <FaEdit className="edit-icon" onClick={() => handleEdit(question)} />
                  <FaTrashAlt className="delete-icon" onClick={() => handleDelete(question.questionId)} />
                </div>
              </>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default PendingApprovalsComponent;
