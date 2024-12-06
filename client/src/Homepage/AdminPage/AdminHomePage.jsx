import React, { useState } from "react";
import "./AdminHomePage.css";
import ApprovedQuestions from "./ApprovedQuestions";
import PendingQuestions from "./PendingQuestions";
import { useAdminContext } from "../../Context/AdminContext"; // Import the context

const AdminHomePage = () => {
  const [view, setView] = useState("pending");
  const { setIsAdminLoggedIn, setIsUserLoggedIn } = useAdminContext(); // Access the context for login state

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userName");
    localStorage.removeItem("userId");
    setIsAdminLoggedIn(false); // Update admin login state
    setIsUserLoggedIn(false); // Update user login state
    window.location.href = "/"; // Redirect to the login page
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
        {view === "pending" ? <PendingQuestions /> : <ApprovedQuestions />}
      </main>
    </div>
  );
};

export default AdminHomePage;
