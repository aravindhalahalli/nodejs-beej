import { Request, Response } from 'express';

const users: { [key: string]: string }[] = [
  {
    name: 'Rahul',
    age: '29',
  },
];

export const getAllUser = (__: Request, res: Response) => res.json({ users });
