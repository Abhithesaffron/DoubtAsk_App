const express = require('express');
const { authMiddleware, adminMiddleware } = require('../middleware/auth');
const Question = require('../models/Question');

const router = express.Router();

// Route 1: Get all approved questions
router.get('/approved', authMiddleware, async (req, res) => {
  try {
    const questions = await Question.find({ status: 'approved' });
    res.status(200).json(questions);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch approved questions' });
  }
});

// Route 2: Get all questions by a specific user
router.get('/user', authMiddleware, async (req, res) => {
  try {
    const questions = await Question.find({ userId: req.user.userId });
    res.status(200).json(questions);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch user questions' });
  }
});

// Route 3: Get all pending questions by a user
router.get('/user/pending', authMiddleware, async (req, res) => {
  try {
    const questions = await Question.find({ userId: req.user.userId, status: 'pending' });
    res.status(200).json(questions);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch pending questions' });
  }
});

// Route 4: Post a question
router.post('/', authMiddleware, async (req, res) => {
  // console.log(req);
  const { text } = req.body;
  // console.log(req.user.userId);
  try {
    const newQuestion = new Question({ questionText:text, userId: req.user.userId });
    await newQuestion.save();
    res.status(201).json(newQuestion);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create question' });
  }
});

// Route 5: Edit question text
router.put('/:id/edit', authMiddleware, async (req, res) => {
  try {
    const question = await Question.findOneAndUpdate(
      { questionId: req.params.id, userId: req.user.userId },
      { questionText: req.body.questionText },
      { new: true }
    );
    if (!question) {
      return res.status(404).json({ error: 'Question not found or unauthorized' });
    }
    res.status(200).json(question);
  } catch (err) {
    res.status(500).json({ error: 'Failed to edit question' });
  }
});

// Route 6: Update question status (Admin only)
router.put('/:id/status', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const question = await Question.findOneAndUpdate( {questionId : req.params.id}, { status: req.body.status }, { new: true });
    res.status(200).json(question);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update status' });
  }
});

// Route 7: Delete a question
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const question = await Question.findOneAndDelete({ questionId: req.params.id });
    if (!question) {
      return res.status(404).json({ error: 'Question not found or unauthorized' });
    }
    res.status(200).json({ message: 'Question deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete question' });
  }
});

// Route 8: Like/unlike a question
router.post('/:id/:action', authMiddleware, async (req, res) => {
  try {
    const question = await Question.findOne({ questionId: req.params.id });
    if (!question) {
      return res.status(404).json({ error: 'Question not found' });
    }

    const userId = req.user.userId;
    const action = req.params.action; // "like" or "unlike"

    // Toggle like or unlike based on the action
    if (action === "like" && !question.likes.includes(userId)) {
      question.likes.push(userId);
    } else if (action === "unlike" && question.likes.includes(userId)) {
      question.likes = question.likes.filter((id) => id !== userId);
    }

    await question.save();
    res.status(200).json({ likes: question.likes }); // Send back the updated likes array
  } catch (err) {
    console.error(err); // Log the error for debugging
    res.status(500).json({ error: 'Failed to update likes' });
  }
});


// Route 9: Add a comment
router.post('/:id/comment', authMiddleware, async (req, res) => {
  const { text } = req.body;
  
  try {
    const question = await Question.findOne({ questionId: req.params.id });    if (!question) {
      return res.status(404).json({ error: 'Question not found' });
    }

    // Create a new comment with the text provided
    const comment = {
      commentText: text,
    };

    // Push the comment to the comments array, which will trigger auto-increment for commentId
    question.comments.push(comment);
    await question.save();

    res.status(200).json(question);
  } catch (err) {
    res.status(500).json({ error: 'Failed to add comment' });
  }
});

// Route 10: Get all pending questions
router.get('/pending', authMiddleware, async (req, res) => {
  try {
    const questions = await Question.find({ status: 'pending' });
    res.status(200).json(questions);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch pending questions' });
  }
});

module.exports = router;
