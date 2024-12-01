import React, { useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa"; // Heart icons from react-icons
import axios from "axios"; // Make sure to install axios
import "./QuestionComponent.css";

const QuestionComponent = ({ question, toggleDetails }) => {
  const [likes, setLikes] = useState(question.likes || []);
  const [isLiked, setIsLiked] = useState(likes.includes(question.userId));
  const token = localStorage.getItem("authToken");

  const handleLike = async () => {
    try {
      // Toggle like or dislike
      const action = isLiked ? "unlike" : "like"; // Use "unlike" to handle both actions
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/questions/${question.questionId}/${action}`,
        { userId: question.userId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Update likes array and like status based on response
      setLikes(response.data.likes);
      setIsLiked(response.data.likes.includes(question.userId)); // Update like status

    } catch (error) {
      console.error("Failed to toggle like on the question", error);
    }
  };

  return (
    <div className="question-card">
      <p className="question-text" onClick={toggleDetails}>
        {question.questionText}
      </p>
      <div className="question-info">
        <span className="username">Posted by: {question.userId}</span>
        <span className="likes">
          <button onClick={handleLike} className="like-button">
            {isLiked ? (
              <FaHeart style={{ color: "red" }} />
            ) : (
              <FaRegHeart style={{ color: "gray" }} />
            )}
          </button>
          {likes.length} {/* Show updated like count */}
        </span>
      </div>
    </div>
  );
};

export default QuestionComponent;
