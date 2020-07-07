import {NextApiRequest, NextApiResponse} from 'next';
import {openCollection} from '../../../middleware/storage';
import {methodNotAllowed} from '../../../middleware/method-not-allowed';
import {TodoItem} from '../../../interfaces';

// noinspection JSUnusedGlobalSymbols
export default async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case 'GET':
      return readTodo(req.query.id as string, res);
    case 'DELETE':
      return deleteTodo(req.query.id as string, res);
    default:
      return methodNotAllowed(req, res, 'DELETE', 'GET');
  }
}

const deleteTodo = async (id: string, res: NextApiResponse) => {
  const todoCollection = await openCollection();
  await todoCollection.deleteOne({_id: id});
  res.status(204).end();
};

const readTodo = async (id: string, res: NextApiResponse) => {
  const todoCollection = await openCollection();
  const todo = await todoCollection.findOne<TodoItem>({_id: id});
  if (todo) {
    res.status(200).json(todo);
  } else {
    res.status(204).end();
  }
};

