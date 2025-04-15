import Datastore from '@seald-io/nedb';

export const echoDb = new Datastore({ filename: './databases/echo.db', autoload: true });

export const scoreDb = new Datastore({ filename: './databases/score.db', autoload: true });

export const userDb = new Datastore({ filename: './databases/user.db', autoload: true });

export const setDb = new Datastore({ filename: './databases/set.db', autoload: true });
