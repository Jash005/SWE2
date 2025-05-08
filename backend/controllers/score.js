import express from 'express';
import {
    createScore,
    getScore,
    getScoresFromUser,
    queryScores,
    updateScore,
    deleteScore
} from '../models/score.js';

const router = express.Router();

function validateScore(req, res, next) {
    const { username, scores, set } = req.body;
    
    if (username && scores && set.setId) {
        next();
    } else {
        res.status(400).json({ message: 'Username, Set ID or Score is missing' });
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

// Read all scores from user
router.get('/:username', async (req, res) => {
    const scores = await getScoresFromUser(req.params.username);
    if (!scores) return res.status(404).json({ message: 'No scores found for this user' });
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
