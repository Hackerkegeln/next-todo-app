import {NextApiRequest, NextApiResponse} from 'next';
import {openCollection} from '../../../middleware/storage';
import {methodNotAllowed} from '../../../utils/method-not-allowed';

const deleteTodo = async (id: string, res: NextApiResponse) => {
  const todoCollection = await openCollection();
  await todoCollection.deleteOne({_id: id});
  res.status(204).end();
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case 'DELETE':
      return deleteTodo(req.query.id as string, res);
    default:
      return methodNotAllowed(req, res, 'DELETE');
  }
}
