import {MongoClient} from 'mongodb';

export const openCollection = async () => {
  const url = 'mongodb://localhost:27017';
  const dbName = 'todos';
  const client = new MongoClient(url);
  const connection = await client.connect();
  const db = connection.db(dbName);
  return db.collection('todos');
};
