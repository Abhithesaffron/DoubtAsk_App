import React, { useState } from "react";
import axios from "axios";
import "./QuestionDetails.css";

const QuestionDetails = ({ question, closeDetails }) => {
  const [comments, setComments] = useState(question.comments || []); // Initialize with existing comments
  const [newComment, setNewComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const token = localStorage.getItem("authToken");

  const API_BASE_URL = `${import.meta.env.VITE_BASE_URL}/api/questions`;

  // Function to add a comment
  const handleAddComment = async () => {
    if (newComment.trim() === "") return; // Prevent empty comments

    setIsSubmitting(true); // Disable UI during submission

    try {
      // Send a POST request to add the new comment
      const response = await axios.post(
        `${API_BASE_URL}/${question.questionId}/new/comment`,
        { text: newComment },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Update comments state with the new list of comments from the backend
      setComments(response.data.comments);
      question.comments=response.data.comments;
      question.likes=response.data.likes;
      // Clear the input field
      setNewComment("");
    } catch (error) {
      console.error("Error adding comment:", error);
      alert("Failed to add comment. Please try again.");
    } finally {
      setIsSubmitting(false); // Re-enable UI
    }
  };

  return (
    <div className="question-details">
      {/* Close button */}
      <button className="close-button" onClick={closeDetails}>
        &times;
      </button>

      {/* Comments Section */}
      <div className="comments-section">
        <h4>Comments:</h4>
        {comments.length === 0 ? (
          <p>No comments yet. Be the first to comment!</p>
        ) : (
          <ul className="comment-list">
            {comments.map((comment, index) => (
              <li key={index} className="comment-item">
                {comment.commentText}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Add Comment Section */}
      <div className="add-comment">
        <input
          type="text"
          placeholder="Add a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="comment-input"
          disabled={isSubmitting} // Disable input while submitting
        />
        <button
          onClick={handleAddComment}
          className="comment-button"
          disabled={isSubmitting} // Disable button while submitting
        >
          {isSubmitting ? "Adding..." : "Add"}
        </button>
      </div>
    </div>
  );
};

export default QuestionDetails;
