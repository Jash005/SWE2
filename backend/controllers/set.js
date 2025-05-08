import express from 'express';
import { addCardPairToSet, createSet, deleteCardPairFromSet, deleteSet, getSet, querySets, updateCardPairInSet, updateSet } from '../models/set.js';
import { validateCardFields, validateSetFields } from '../services/set.js';
import { basicAuth } from '../util/auth.js';
import { updateSetTitleInScores } from '../models/score.js';

const router = express.Router();

async function validateSetObject(req, res, next) {
    if (req.body.title && req.body.cardPair) {
        
        const set = req.body;

        // Validate set object
        const validationResult = validateSetFields(set);
        if(!validationResult.success) {
            res.status(400);
            res.json({message: validationResult.message});
            return;
        }

        next();
    } 
    else {
        res.status(400);
        res.json({message: 'Set data is missing. Required fields are: Title and Card pair.'});
        return;
    }
}

async function validateCard(req, res, next) {
    if (req.body && req.body.question && req.body.answer) {
        
        const card = req.body;

        // Validate card object
        const validationResult = validateCardFields(card);
        if(!validationResult.success) {
            res.status(400);
            res.json({message: validationResult.message});
            return;
        }

        next();
    } 
    else {
        res.status(400);
        res.json({message: 'Card data is missing. Required fields are: Question and Answer.'});
        return;
    }
}

async function checkSetExists(req, res, next) {
    const setId = req.params['setId'];

    const set = await getSet(setId);
    if(!set) {
        return res.status(404).json({message: `Set with ID '${setId}' not found.`});
    }

    req.set = set;
    next();
}

async function authorizeUser(req, res, next) {
    const user = req.user;
    const set = req.set;

    if(user.username.toLowerCase() !== set.username.toLowerCase()) {
        return res.status(403).json({message: `Unauthorized action: Set '${set.title}' does not belong to user '${user.username}'.`});
    }
    
    next();
}

// Create new set
router.post('/', basicAuth, validateSetObject, async (req, res) => {
    const newSet = req.body;

    if(!newSet.hasOwnProperty("visibility") ){
        newSet.visibility = 0; // Default value for visibility is 0 (private)
    }
    
    const set = await createSet(req.user.username, newSet);

    res.status(201).json(set);
});

// Get set by setId with card pairs in random order
// TODO: Add logic for visibility
router.get('/:setId/random', async (req, res) => {
    const setId = req.params['setId'];

    const set = await getSet(setId);
    if(!set) {
        res.status(404).json({message: `Set with Id ${setId} not found.`});
        return;
    }
    
    // Shuffle and take top cards
    let numCards = req.query.numCards ? parseInt(req.query.numCards) : 8; // Default: 8 pairs

    if (isNaN(numCards) || numCards <= 0) {
        numCards = 8; // Default value
    }

    const shuffled = [...set.cardPair].sort(() => 0.5 - Math.random());
    const topCards = shuffled.slice(0, numCards);
    
    res.json({...set, cardPair: topCards});
});

// Get set by setId
// TODO: Add logic for visibility
router.get('/:setId', async (req, res) => {
    const setId = req.params['setId'];

    const set = await getSet(setId);
    if(!set) {
        res.status(404).json({message: `Set with Id ${setId} not found.`});
        return;
    }
    res.json(set);
});

// Get all sets
router.get('/', async (req, res) => {  
    const sets = await querySets();
    res.json(sets);
});

// Edit set
router.patch('/:setId', basicAuth, checkSetExists, authorizeUser, validateSetObject, async (req, res) => {
    const editedSet = req.body;
    const setId = req.params['setId'];

    await updateSet(setId, editedSet);
    const updatedSet = await getSet(setId);

    // Update all scores that use this set
    await updateSetTitleInScores(setId, updatedSet.title);

    res.json(updatedSet);
});

// Delete set
router.delete('/:setId', basicAuth, checkSetExists, authorizeUser, async (req, res) => {
    const setId = req.params['setId'];

    // TODO: Delete scores from the set

    await deleteSet(setId);

    res.status(204).send();
});

// Add a single card to set
router.post('/:setId/cards', basicAuth, checkSetExists, authorizeUser, validateCard, async (req, res) => {
    
    const newCard = req.body;
    
    const card = await addCardPairToSet(req.params['setId'], newCard);

    res.status(201).json(card);
});

// Edit a single card
router.patch('/:setId/cards/:pairId', basicAuth, checkSetExists, authorizeUser, validateCard, async (req, res) => {
    const editedCard = req.body;
    const setId = req.params['setId'];
    const pairId = req.params['pairId'];

    await updateCardPairInSet(setId, pairId, editedCard);
    const updatedSet = await getSet(setId);

    res.json(updatedSet);
});

// Delete a single card
router.delete('/:setId/cards/:pairId', basicAuth, checkSetExists, authorizeUser, async (req, res) => {
    const setId = req.params['setId'];
    const pairId = req.params['pairId'];

    await deleteCardPairFromSet(setId, pairId);

    res.status(204).send();
});

export { router as setController };

