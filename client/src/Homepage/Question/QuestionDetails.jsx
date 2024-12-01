import React, { useState } from "react";
import axios from "axios";
import "./QuestionDetails.css";

const QuestionDetails = ({ question, closeDetails }) => {
  const [comments, setComments] = useState(question.comments || []);
  const [newComment, setNewComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const token = localStorage.getItem("authToken");

  const API_BASE_URL = `${import.meta.env.VITE_BASE_URL}/api/questions`;

  const handleAddComment = async () => {
    if (newComment.trim() === "") return;

    const newCommentObj = { commentText: newComment }; // Match backend format
    setComments((prevComments) => [...prevComments, newCommentObj]);
    setNewComment("");

    setIsSubmitting(true);
    try {
      await axios.post(
        `${API_BASE_URL}/${question.questionId}/comment`,
        { text: newComment },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      console.error("Error adding comment:", error);
      alert("Failed to add comment. Rolling back...");
      setComments((prevComments) =>
        prevComments.filter((comment) => comment !== newCommentObj)
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="question-details">
      <button className="close-button" onClick={closeDetails}>
        &times;
      </button>
      <div className="comments-section">
        <h4>Comments:</h4>
        {comments.length === 0 ? (
          <p>No comments yet. Be the first to comment!</p>
        ) : (
          <ul className="comment-list">
            {comments.map((comment, index) => (
              <li key={index} className="comment-item">
                {typeof comment === "string" ? comment : comment.commentText}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="add-comment">
        <input
          type="text"
          placeholder="Add a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="comment-input"
          disabled={isSubmitting}
        />
        <button
          onClick={handleAddComment}
          className="comment-button"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Adding..." : "Add"}
        </button>
      </div>
    </div>
  );
};

export default QuestionDetails;
