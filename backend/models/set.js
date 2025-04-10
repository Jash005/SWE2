import {setDb} from './databases.js';
import { v4 as uuidv4 } from 'uuid';

export function createSet(username, newSet) {
    const currentTimestamp = new Date().toISOString();

    // Add Ids to each card in the set
    newSet.cardPair.forEach((card) => {
        card.pairId = uuidv4();
    });

    const set = {
        _id: uuidv4(),
        title: newSet.title.trim(),
        cardPair: newSet.cardPair,
        username: username,
        createdAt: currentTimestamp,
        visibility: newSet.visibility,
        visibleToUsers: newSet.visibleToUsers,
    };
    return setDb.insertAsync(set);
}

export function getSet(setId) {
    return setDb.findOneAsync({ _id: setId });
}

// Get all sets from user (without cardPair)
export function getSetsFromUser(username) {
    return setDb.findAsync({ username }, { cardPair: 0 });
}

// Get all sets (without cardPair)
export async function querySets() {
    return setDb.findAsync({}, {cardPair: 0});
}

export function updateSet(setId, set) { 
    set.cardPair.forEach((card) => {
        // Add pairId only to new cards (those without a pairId)
        if (!card.hasOwnProperty("pairId")) {
            card.pairId = uuidv4();
        }
    });

    return setDb.updateAsync({_id: setId}, {$set: {  
        title: set.title.trim(),
        cardPair: set.cardPair,
        visibility: set.visibility,
        visibleToUsers: set.visibleToUsers,
    }});
}

//TODO: Add endpoint for this in controller
export function updateSetVisibility(setId, visibility) {
    return setDb.updateAsync({_id: setId}, {$set: {visibility}});
}

export function deleteSet(setId) {
    return setDb.removeAsync({_id: setId});
}

// Delete all sets from a user
export function deleteSetsByUser(username) {
    return setDb.removeAsync({username}, { multi: true });
}

// Functions specific to card pairs
export function addCardPairToSet(setId, card) {
    // Add Id to card
    card.pairId = uuidv4();
    return setDb.updateAsync({_id: setId}, {$push: {cardPair: {$each: [card]}}});
}

export function updateCardPairInSet(setId, cardPairId, card) {
    return setDb.findOneAsync({_id: setId})
        .then(set => {
            if (!set) {
                throw new Error('Set not found');
            }

            // Find the card pair
            const cardIndex = set.cardPair.findIndex(pair => pair.pairId === cardPairId);
            
            if (cardIndex === -1) {
                throw new Error('CardPair not found');
            }

            // Update the card at the found index
            set.cardPair[cardIndex].question = card.question;
            set.cardPair[cardIndex].answer = card.answer;

            // Save the updated set
            return setDb.updateAsync({_id: setId}, {$set: {cardPair: set.cardPair}});
        });
}

export function deleteCardPairFromSet(setId, cardPairId) {
    return setDb.updateAsync(
        { _id: setId },
        { $pull: { cardPair: { pairId: cardPairId } } } 
    );
}