import {NextApiRequest, NextApiResponse} from 'next';

type AllowedMethod = 'GET' | 'PUT' | 'POST' | 'DELETE';

export const methodNotAllowed = (req: NextApiRequest, res: NextApiResponse, ...allowedMethods: AllowedMethod[]) => {
  res.setHeader('Allow', allowedMethods);
  res.status(405).end(`Method ${req.method} Not Allowed`);
};
