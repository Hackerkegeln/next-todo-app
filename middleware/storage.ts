import {MongoClient} from 'mongodb';

export const openCollection = async () => {
  const url = 'mongodb://localhost:27017/todos';
  const client = new MongoClient(url, {useUnifiedTopology: true});
  const connection = await client.connect();
  const db = connection.db();
  return db.collection('todos');
};
