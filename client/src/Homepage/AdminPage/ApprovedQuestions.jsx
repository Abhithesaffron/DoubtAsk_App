import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AdminHomePage.css";
import QuestionParent from "../Question/QuestionParent";

const ApprovedQuestions = () => {
  const [approvedQuestions, setApprovedQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const API_BASE_URL = `${import.meta.env.VITE_BASE_URL}/api/questions`;

  const fetchApprovedQuestions = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/approved`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` },
      });
      setApprovedQuestions(response.data);
    } catch (error) {
      console.error("Error fetching approved questions:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchApprovedQuestions();
  }, []);

  const handleDelete = async (question) => {
    try {
      await axios.delete(`${API_BASE_URL}/${question.questionId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` },
      });
      setApprovedQuestions((prev) =>
        prev.filter((q) => q.questionId !== question.questionId)
      );
    } catch (error) {
      console.error("Error deleting question:", error);
    }
  };

  return (
    <div className="question-list">
      <h2>Approved Questions</h2>
      {isLoading ? (
        <div className="loading-spinner">Loading...</div>
      ) : approvedQuestions.length === 0 ? (
        <p>No approved questions.</p>
      ) : (
        Array.isArray(approvedQuestions) &&approvedQuestions.map((question) => (
          <div className="question-item" key={question.questionId}>
            <QuestionParent key={question.questionId} question={question} />
            <div className="actions">
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

export default ApprovedQuestions;
