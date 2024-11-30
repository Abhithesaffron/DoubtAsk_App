import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Ensure you're using React Router
import "./UserHomePage.css";
import HomeComponent from "./HomeComponent";
import PostQuestionComponent from "./PostQuestionComponent";
import YourQuestionsComponent from "./YourQuestionsComponent";
import PendingApprovalsComponent from "./PendingApprovalsComponent";
import { useAdminContext } from '../../Context/AdminContext';

const BASE_URL = `${import.meta.env.VITE_BASE_URL}/api`;

const UserHomePage = () => {
  const [approvedQuestions, setApprovedQuestions] = useState([]);
  const [pendingQuestions, setPendingQuestions] = useState([]);
  const [userQuestions, setUserQuestions] = useState([]);
  const [view, setView] = useState("home");
  const navigate = useNavigate(); // For navigation
  const token = localStorage.getItem("authToken");
  const username = localStorage.getItem("userName");
  const { setIsUserLoggedIn } = useAdminContext(); // Access the context for user login state

  // Fetch data from the server
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const approved = await axios.get(`${BASE_URL}/questions/approved`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const pending = await axios.get(`${BASE_URL}/questions/user/pending`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const userQ = await axios.get(`${BASE_URL}/questions/user`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setApprovedQuestions(approved.data);
        setPendingQuestions(pending.data);
        setUserQuestions(userQ.data);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };

    fetchQuestions();
  }, [token]);

  // Handle submitting a new question
  const handleSubmitQuestion = async (newQuestion) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/questions/`,
        { text: newQuestion },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const question = response.data;
      setPendingQuestions((prev) => [...prev, question]);
      setUserQuestions((prev) => [...prev, question]);
      setView("home");
    } catch (error) {
      console.error("Error submitting question:", error);
    }
  };

  // Handle Logout
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userName");
    setIsUserLoggedIn(false);
    navigate("/"); // Navigate to login page
  };

  return (
    <div className="user-home">
      <header>
        <div className="header-left">
          <button
            className={`tab-button ${view === "home" ? "active" : ""}`}
            onClick={() => setView("home")}
          >
            Home
          </button>
          <button
            className={`tab-button ${view === "post-question" ? "active" : ""}`}
            onClick={() => setView("post-question")}
          >
            Post Question
          </button>
          <button
            className={`tab-button ${view === "your-questions" ? "active" : ""}`}
            onClick={() => setView("your-questions")}
          >
            Your Questions
          </button>
          <button
            className={`tab-button ${view === "pending-approvals" ? "active" : ""}`}
            onClick={() => setView("pending-approvals")}
          >
            Pending Approvals
          </button>
        </div>
        <div className="header-right">
          <span>{username}</span>
          <button className="logout-button" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </header>

      <main>
        {view === "home" && <HomeComponent approvedQuestions={approvedQuestions} />}
        {view === "post-question" && (
          <PostQuestionComponent handleSubmitQuestion={handleSubmitQuestion} />
        )}
        {view === "your-questions" && <YourQuestionsComponent userQuestions={userQuestions} />}
        {view === "pending-approvals" && (
          <PendingApprovalsComponent pendingQuestions={pendingQuestions} />
        )}
      </main>
    </div>
  );
};

export default UserHomePage;
