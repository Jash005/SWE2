// import Datastore from 'nedb-promises';

// const scoreDb = Datastore.create({ filename: 'databases/score.db', autoload: true });

import { scoreDb } from './databases.js';

export function createScore(scoreData) {
    scoreData = { ...scoreData, playedOn: new Date().toISOString() };
    return scoreDb.insert(scoreData);
}

export function getScore(id) {
    return scoreDb.findOne({ _id: id });
}

export function queryScores() {
    return scoreDb.find({});
}

export function updateScore(id, data) {
    const existing = scoreDb.findOne({ _id: id });
    if (!existing) throw new Error("Score not found");
    
    const { _id, ...dataToUpdate } = data; // kein _id im Update!
    scoreDb.update({ _id: id }, { $set: dataToUpdate }, { upsert: false });

    //await db.update({ _id: id }, { $set: data });
    return getScore(id);
}

export function deleteScore(id) {
    const deleted = scoreDb.remove({ _id: id }, {});
    return deleted > 0;
}
