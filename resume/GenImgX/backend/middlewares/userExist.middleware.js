import { User } from '../db/db.js';

export const userExist = async (req, res, next) => {
  try {
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(403).json({ msg: 'User already exist' });
    } else {
      next();
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
