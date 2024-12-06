import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Ensure you're using React Router
import "./UserHomePage.css";
import HomeComponent from "./HomeComponent";
import PostQuestionComponent from "./PostQuestionComponent";
import YourQuestionsComponent from "./YourQuestionsComponent";
import PendingApprovalsComponent from "./PendingApprovalsComponent";
import { useAdminContext } from '../../Context/AdminContext';

const UserHomePage = () => {
  const [view, setView] = useState("home");
  const navigate = useNavigate(); // For navigation
  const { setIsUserLoggedIn } = useAdminContext(); // Access the context for user login state

  // Handle Logout
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userName");
    localStorage.removeItem("userId");
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
          <span>{localStorage.getItem("userName")}</span>
          <button className="logout-button" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </header>

      <main>
        {view === "home" && <HomeComponent />}
        {view === "post-question" && <PostQuestionComponent />}
        {view === "your-questions" && <YourQuestionsComponent />}
        {view === "pending-approvals" && <PendingApprovalsComponent />}
      </main>
    </div>
  );
};

export default UserHomePage;
