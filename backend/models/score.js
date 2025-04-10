import Datastore from 'nedb-promises';

const db = Datastore.create({ filename: 'databases/score.db', autoload: true });

export async function createScore(scoreData) {
    return await db.insert(scoreData);
}

export async function getScore(id) {
    return await db.findOne({ _id: id });
}

export async function queryScores() {
    return await db.find({});
}

export function updateScore(id, data) {
    const existing = db.findOne({ _id: id });
    if (!existing) throw new Error("Score not found");
    
    const { _id, ...dataToUpdate } = data; // kein _id im Update!
    db.update({ _id: id }, { $set: dataToUpdate }, { upsert: false });

    //await db.update({ _id: id }, { $set: data });
    return getScore(id);
}

export async function deleteScore(id) {
    const deleted = await db.remove({ _id: id }, {});
    return deleted > 0;
}
