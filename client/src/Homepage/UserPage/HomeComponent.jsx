import React, { useEffect, useState } from "react";
import axios from "axios";
import QuestionParent from "../Question/QuestionParent";

const HomeComponent = () => {
  const [approvedQuestions, setApprovedQuestions] = useState([]);
  const token = localStorage.getItem("authToken");

  // Fetch approved questions from API
  useEffect(() => {
    const fetchApprovedQuestions = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/questions/approved`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setApprovedQuestions(response.data);
      } catch (error) {
        console.error("Error fetching approved questions:", error);
      }
    };

    fetchApprovedQuestions();
  }, [token]);

  return (
    <div className="question-list">
      <h2>Approved Questions</h2>
      {approvedQuestions.length === 0 ? (
        <p>No approved questions available.</p>
      ) : (
        approvedQuestions.map((question) => (
          <QuestionParent key={question.questionId} question={question} />
        ))
      )}
    </div>
  );
};

export default HomeComponent;
