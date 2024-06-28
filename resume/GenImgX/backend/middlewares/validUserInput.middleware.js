import { userSchema } from '../controllers/validations/user.validation.js';

export const validReq = (req, res, next) => {
  const valid = userSchema.safeParse(req.body);
  if (!valid.success) {
    return res.status(411).json({ msg: 'Invalid inputs' });
  }
  req.email = req.body.email ? req.body.email : null;
  req.password = req.body.password ? req.body.password : null;
  req.googleJwt = req.body.googleJwt ? req.body.googleJwt : null;
  next();
};
