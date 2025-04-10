import express from 'express';
import {createUser, deleteUser, getUser, queryUsers, updateUser} from '../models/user.js';
import { validateUserFields } from '../services/user.js';
import { basicAuth } from '../util/auth.js';
import { deleteSetsByUser, getSetsFromUser } from '../models/set.js';

const router = express.Router();

// Middleware to validate username
async function validateUsername(req, res, next) {
    if (req.body.username && req.body.password && req.body.displayName) {

        // Check if username is already taken
        if(await getUser(req.body.username)) {
            res.status(409);
            res.json({message: 'Username is already taken.'});
            return;
        }
        else {
            next();
        }
    } 
    else {
        res.status(400);
        res.json({message: 'User data is missing'});
        return;
    }
}

// Middleware to validate user object
async function validateUserObject(req, res, next) {

    // Validate user object and send info, whether user is new or not
    const validationResult = validateUserFields(req.body, !req.user);
    if(!validationResult.success) {
        res.status(400);
        res.json({message: validationResult.message});
        return;
    }

    next();
}

// Middleware to check rights of user
async function authorizeUser(req, res, next) {
    // TODO: maybe put this in shared folder for all endpoints
    const user = req.user;
    const paramUsername = req.params['username'];

    if(user.username.toLowerCase() !== paramUsername.toLowerCase()) {
        return res.status(403).json({message: `Unauthorized action: User '${paramUsername}' does not belong to user '${user.username}'.`});
    }    
    next();
}

// Create new user
router.post('/', validateUsername, validateUserObject, async (req, res) => {
    const newUser = req.body;

    const {password, ...user} = await createUser(newUser);
    res.status(201).json(user);
});

// Get users
router.get('/', async (req, res) => {    
    const users = await queryUsers();
    res.json(users);
});

// Get user by username
router.get('/:username', async (req, res) => {
    const username = req.params['username'];

    const user = await getUser(username);
    if(!user) {
        res.status(404).json({message: `User '${username}' not found.`});
        return;
    }
    res.json(user);
});

// Login
router.post('/login', basicAuth, async (req, res) => {
    res.status(200).json({isSuccess: true});
})

// Edit user
router.patch('/:username', basicAuth, authorizeUser, validateUserObject, async (req, res) => {
    const editedUser = req.body;
    const username = req.user.username;

    await updateUser(username, editedUser);
    const updatedUser = await getUser(username);

    res.json(updatedUser);
});

// Delete user
router.delete('/:username', basicAuth, authorizeUser, async (req, res) => {
    const username = req.user.username;

    await deleteUser(username);   

    // TODO: Delete scores from the user
    // Delete sets from the user
    await deleteSetsByUser(username);

    res.status(204).send();
});

// Get sets from a user
// TODO: Add logic for visibility
router.get('/:username/sets', async (req, res) => {
    const username = req.params['username'];
    
    const sets = await getSetsFromUser(username);
    res.json(sets);
});

export { router as userController };
