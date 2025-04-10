import express from 'express';
import {
    createScore,
    getScore,
    queryScores,
    updateScore,
    deleteScore
} from '../models/score.js';

const router = express.Router();

function validateScore(req, res, next) {
    const { username, score, quizId } = req.body;
    if (typeof username === 'string' && typeof score === 'number' && typeof quizId === 'number') {
        next();
    } else {
        res.status(400).json({ message: 'username or score is invalid or missing' });
    }
}

// Create
router.post('/', validateScore, async (req, res) => {
    const score = await createScore(req.body);
    res.status(201).json(score);
});

// Read all
router.get('/', async (req, res) => {
    const scores = await queryScores();
    res.json(scores);
});

// Read single
router.get('/:id', async (req, res) => {
    const score = await getScore(req.params.id);
    if (!score) return res.status(404).json({ message: 'Score not found' });
    res.json(score);
});

// Update
router.put('/:id', validateScore, async (req, res) => {
    const updated = await updateScore(req.params.id, req.body);
    if (!updated) return res.status(404).json({ message: 'Score not found' });
    res.json(updated);
});

// Delete
router.delete('/:id', async (req, res) => {
    const success = await deleteScore(req.params.id);
    if (!success) return res.status(404).json({ message: 'Score not found' });
    res.json({ message: 'Score deleted' });
});

export { router as scoreController };
