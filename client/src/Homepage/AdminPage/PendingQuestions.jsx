import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AdminHomePage.css";
import QuestionParent from "../Question/QuestionParent";

const PendingQuestions = () => {
  const [pendingQuestions, setPendingQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const API_BASE_URL = `${import.meta.env.VITE_BASE_URL}/api/questions`;

  const fetchPendingQuestions = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/pending`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` },
      });
    //   console.log("API Response:", response.data); // Debugging
      setPendingQuestions(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error("Error fetching pending questions:", error);
      setPendingQuestions([]); // Fallback to an empty array on error
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPendingQuestions();
  }, []);

  const handlePass = async (question) => {
    try {
      await axios.put(`${API_BASE_URL}/${question.questionId}/status`, {
        status: "approved",
      }, {
        headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` },
      });
      setPendingQuestions((prev) =>
        prev.filter((q) => q.questionId !== question.questionId)
      );
    } catch (error) {
      console.error("Error approving question:", error);
    }
  };

  const handleDelete = async (question) => {
    try {
      await axios.delete(`${API_BASE_URL}/${question.questionId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` },
      });
      setPendingQuestions((prev) =>
        prev.filter((q) => q.questionId !== question.questionId)
      );
    } catch (error) {
      console.error("Error deleting question:", error);
    }
  };

  return (
    <div className="question-list">
      <h2>Pending Approval Questions</h2>
      {isLoading ? (
        <div className="loading-spinner">Loading...</div>
      ) : pendingQuestions.length === 0 ? (
        <p>No pending questions.</p>
      ) : (
        Array.isArray(pendingQuestions) &&
        pendingQuestions.map((question) => (
          <div className="question-item" key={question.questionId}>
            <QuestionParent key={question.questionId} question={question} />
            <div className="actions">
              <button className="pass-button" onClick={() => handlePass(question)}>
                Pass
              </button>
              <button className="delete-button" onClick={() => handleDelete(question)}>
                Delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default PendingQuestions;
