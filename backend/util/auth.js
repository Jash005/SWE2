import { getUserWithPassword } from "../models/user.js";
import bcrypt from "bcrypt";

// Middleware for authorization
export async function basicAuth(req, res, next) {

    if(!req.headers.authorization) {
        return res.status(401).json({message: 'Authorization header is missing.'});
    }

    const b64auth = req.headers.authorization.split(' ')[1];
    let [username, password] = Buffer.from(b64auth, 'base64').toString().split(':');

    const user = await getUserWithPassword(username);
    
    if(!user) {
        return res.status(404).json({message: `User '${username}' not found.`});
    }

    if (!comparePassword(password, user.password) ) {
        return res.status(401).json({message: 'Username / Password mismatch'});
    }
    
    req.user = user;
    next();
}

// Function to hash password for database
export function hashPassword(plainPassword) {
    const saltRounds = 10;
    return bcrypt.hashSync(plainPassword, saltRounds);
}

// Function to compare password with hashed password
export function comparePassword(plainPassword, hashedPassword) {
    return bcrypt.compareSync(plainPassword, hashedPassword);
}