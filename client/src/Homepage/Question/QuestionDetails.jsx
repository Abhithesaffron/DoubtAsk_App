import React, { useState } from "react";
import "./QuestionDetails.css";

const QuestionDetails = ({ question, closeDetails }) => {
  const [comments, setComments] = useState(question.comments || []);
  const [newComment, setNewComment] = useState("");

  const handleAddComment = () => {
    if (newComment.trim() !== "") {
      setComments((prev) => [...prev, newComment]);
      setNewComment("");
    }
  };

  return (
    <div className="question-details">
      <h3 className="question-title" onClick={closeDetails}>
        {question.questionText}
      </h3>
      <div className="comments-section">
        <h4>Comments:</h4>
        {comments.length === 0 ? (
          <p>No comments yet. Be the first to comment!</p>
        ) : (
          <ul className="comment-list">
            {comments.map((comment, index) => (
              <li key={index} className="comment-item">
                {comment}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="add-comment">
        <textarea
          placeholder="Add your comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button onClick={handleAddComment}>Add Comment</button>
      </div>
    </div>
  );
};

export default QuestionDetails;
