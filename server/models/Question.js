const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const QuestionSchema = new mongoose.Schema({
  questionId: { type: Number, unique: true }, // Auto-incremented
  userId: { type: Number, required: true }, // Reference to User.userId
  questionText: { type: String, required: true },
  status: {
    type: String,
    enum: ['pending', 'approved'],
    default: 'pending',
  },
  likes: { type: [Number], default: [] }, // Automatically initializes as an empty array
  comments: {
    type: [
      {
        commentId: { type: Number }, // Auto-incremented
        commentText: { type: String, required: true },
      },
    ],
    default: [],
  },
});

// Add auto-increment plugins to questionId and commentId
QuestionSchema.plugin(AutoIncrement, { inc_field: 'questionId' });
// QuestionSchema.plugin(AutoIncrement, { inc_field: 'comments.commentId' });

module.exports = mongoose.model('Question', QuestionSchema);
