import { hashPassword } from '../util/auth.js';
import {userDb} from './databases.js';

export function createUser(newUser) {
    const currentTimestamp = new Date().toISOString();
    const hashedPassword = hashPassword(newUser.password);

    const user = {
        username: newUser.username.trim(),
        password: hashedPassword,
        displayName: newUser.displayName.trim(), 
        createdAt: currentTimestamp
    };
    return userDb.insertAsync(user);
}

export function getUserWithPassword(username) {
    return userDb.findOneAsync({username: new RegExp(`^${username}$`, "i")});
}

export function getUser(username) {
    return userDb.findOneAsync({username: new RegExp(`^${username}$`, "i")}, {password: 0});
}

export async function queryUsers() {
    return userDb.findAsync({}, {password: 0});
}

export function updateUser(username, user) { 
    const { password, displayName } = user;
    const editUser = {};

    if(password) {
        editUser.password = hashPassword(password);
    }

    if(displayName) {
        editUser.displayName = displayName;
    }  

    return userDb.updateAsync({username}, {$set: editUser}, {password: 0});
}

export function deleteUser(username) {
    return userDb.removeAsync({username}, {});
}
