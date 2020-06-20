import { Request, Response } from 'express';
import User from '@models/user';

export const createUser = async (req: Request, res: Response) => {
  if (req.body.email && req.body.name) {
    const { name, email } = req.body;

    const user = new User({ name, email });

    try {
      const result = await user.save();

      return res.json({ success: result });
    } catch (error) {
      return res.status(400).json({ error });
    }
  }

  return res.status(400).json({ error: 'Data seems to be empty' });
};

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await User.find();

    return res.json({ success: result });
  } catch (error) {
    return res.status(400).json({ error });
  }
};
