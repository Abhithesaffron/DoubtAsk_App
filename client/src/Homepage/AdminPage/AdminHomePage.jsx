import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AdminHomePage.css";
import { useAdminContext } from '../../Context/AdminContext';
import QuestionParent from "../Question/QuestionParent";

const AdminHomePage = () => {
  const [view, setView] = useState("pending"); // "pending" or "approved"
  const [pendingQuestions, setPendingQuestions] = useState([]);
  const [approvedQuestions, setApprovedQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [questionToDelete, setQuestionToDelete] = useState(null);
  const token = localStorage.getItem('authToken');
  const { setIsAdminLoggedIn , setIsUserLoggedIn } = useAdminContext(); // Access the context for user login state
  const API_BASE_URL = `${import.meta.env.VITE_BASE_URL}/api/questions`;

  const fetchQuestions = async () => {
    setIsLoading(true);
    try {
      const pendingResponse = await axios.get(`${API_BASE_URL}/pending`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const approvedResponse = await axios.get(`${API_BASE_URL}/approved`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPendingQuestions(pendingResponse.data);
      setApprovedQuestions(approvedResponse.data);
    } catch (error) {
      console.error("Error fetching questions:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setIsAdminLoggedIn(false);
    setIsUserLoggedIn(false);
    window.location.href = "/"; // Redirect to the login page
  };

  const handlePass = async (question) => {
    try {
      await axios.put(`${API_BASE_URL}/${question.questionId}/status`, {
        status: "approved" }, 
         { headers: { Authorization: `Bearer ${token}` }
      });
      setApprovedQuestions((prev) => [...prev, question]);
      setPendingQuestions((prev) => prev.filter((q) => q.questionId !== question.questionId));
    } catch (error) {
      console.error("Error approving question:", error);
    }
  };

  const handleDelete = async (question, type) => {
    try {
      await axios.delete(`${API_BASE_URL}/${question.questionId}` , { headers: { Authorization: `Bearer ${token}` }
      });
      if (type === "pending") {
        setPendingQuestions((prev) => prev.filter((q) => q.questionId !== question.questionId));
      } else if (type === "approved") {
        setApprovedQuestions((prev) => prev.filter((q) => q.questionId !== question.questionId));
      }
    } catch (error) {
      console.error("Error deleting question:", error);
    }
  };

  const handleConfirmDelete = () => {
    if (questionToDelete) {
      handleDelete(questionToDelete.question, questionToDelete.type);
      setShowConfirmation(false);
    }
  };

  const handleDeleteCancel = () => {
    setShowConfirmation(false);
  };

  return (
    <div className="admin-home">
      <header className="admin-header">
        <div className="header-left">
          <button
            className={`tab-button ${view === "pending" ? "active" : ""}`}
            onClick={() => setView("pending")}
          >
            Pending Approvals
          </button>
          <button
            className={`tab-button ${view === "approved" ? "active" : ""}`}
            onClick={() => setView("approved")}
          >
            Approved Questions
          </button>
        </div>
        <div className="header-right">
          <span className="admin-name">Admin</span>
          <button className="logout-button" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </header>

      <main className="main-content">
        {isLoading ? (
          <div className="loading-spinner">Loading...</div>
        ) : view === "pending" ? (
          <div className="question-list">
            <h2>Pending Approval Questions</h2>
            {pendingQuestions.length === 0 ? (
              <p>No pending questions.</p>
            ) : (
              pendingQuestions.map((question) => (
                <div className="question-item" key={question.questionId}>
                  <QuestionParent key={question.questionId} question={question} />
                  <div className="actions">
                    <button
                      className="pass-button"
                      onClick={() => handlePass(question)}
                    >
                      Pass
                    </button>
                    <button
                      className="delete-button"
                      onClick={() => {
                        setQuestionToDelete({ question, type: "pending" });
                        setShowConfirmation(true);
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        ) : (
          <div className="question-list">
            <h2>Approved Questions</h2>
            {approvedQuestions.length === 0 ? (
              <p>No approved questions.</p>
            ) : (
              approvedQuestions.map((question) => (
                <div className="question-item" key={question.questionId}>
                  <QuestionParent key={question.questionId} question={question} />
                  <div className="actions">
                    <button
                      className="delete-button"
                      onClick={() => {
                        setQuestionToDelete({ question, type: "approved" });
                        setShowConfirmation(true);
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {showConfirmation && (
          <div className="confirmation-dialog">
            <p className="new">Are you sure you want to delete this question?</p>
            <div className="dialog-actions">
              <button onClick={handleConfirmDelete}>Yes</button>
              <button onClick={handleDeleteCancel}>No</button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminHomePage;
