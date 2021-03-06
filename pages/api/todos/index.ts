import {NextApiRequest, NextApiResponse} from 'next';
import {InsertTodo, TodoItem} from '../../../interfaces';
import {ObjectId} from 'mongodb';
import {openCollection} from '../../../middleware/storage';
import {methodNotAllowed} from '../../../middleware/method-not-allowed';

// noinspection JSUnusedGlobalSymbols
export default async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case 'GET':
      return readAllTodos(res);
    case 'POST':
      return createNewTodo(req.body, res);
    case 'PUT':
      return updateTodo(req.body, res);
    default:
      return methodNotAllowed(req, res, 'GET', 'PUT', 'POST');
  }
}

const readAllTodos = async (res: NextApiResponse<TodoItem[]>): Promise<void> => {
  const todoCollection = await openCollection();
  const items = await todoCollection.find<TodoItem>().toArray();
  res.status(200).json(items);
};

const createNewTodo = async (body: InsertTodo, res: NextApiResponse): Promise<void> => {
  const newTodo: TodoItem = {...body, _id: new ObjectId().toHexString()};
  const todoCollection = await openCollection();
  await todoCollection.updateOne({_id: newTodo._id}, {$set: newTodo}, {upsert: true});
  res.setHeader('Location', `${process.env.NEXT_PUBLIC_HOST}/api/todos/${newTodo._id}`)
  res.status(201).end();
};

const updateTodo = async (body: TodoItem, res: NextApiResponse): Promise<void> => {
  const todoCollection = await openCollection();
  await todoCollection.updateOne({_id: body._id}, {$set: body}, {upsert: true});
  res.status(204).end();
};
