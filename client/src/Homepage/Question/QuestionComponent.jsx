import React, { useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa"; // Heart icons from react-icons
import axios from "axios"; // Make sure to install axios
import "./QuestionComponent.css";

const QuestionComponent = ({ question, toggleDetails }) => {
  const id =  Number(localStorage.getItem('userId'));
  const [likes, setLikes] = useState(question.likes || []);
  const [isLiked, setIsLiked] = useState(likes.includes(id));
  const token = localStorage.getItem("authToken");

  const handleLike = async () => {
    try {
      // Toggle like or dislike
      
      const action = isLiked ? "dislike" : "like"; // Determine if it's a like or dislike action
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/questions/${question.questionId}/${action}`,
        { userId: question.userId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Update likes array and like status based on response
      // console.log(response.data.likes);
      setLikes(response.data.likes);
      // console.log(response.data.likes);
      question.likes=response.data.likes;
      setIsLiked(response.data.likes.includes(id)); // Update like status

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
        <span className="username">Posted by: {question.userName}</span>
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
