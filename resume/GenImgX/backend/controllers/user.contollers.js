import jwt from 'jsonwebtoken';
import { User } from '../db/db.js';
import dotenv from 'dotenv';
import { OAuth2Client } from 'google-auth-library';

dotenv.config();

export const signup = async (req, res) => {
  if (req.googleJwt) {
    const client = new OAuth2Client(
      process.env.CLIENT_ID,
      process.env.CLIENT_SECRET
    );

    try {
      const googleToken = await client.verifyIdToken({
        idToken: req.googleJwt,
        audience: process.env.CLIENT_ID,
      });
      const payload = googleToken.getPayload();
      const existingUser = await User.findOne({ email: payload.email });
      if (existingUser) {
        return res.status(403).json({ msg: 'User already exist' });
      }
      const user = await User.create({
        email: payload.email,
        googleSubject: payload.sub,
      });
      const token = jwt.sign(
        { email: payload.email, userId: user._id },
        process.env.JWT_SECRET
      );
      return res.json({ msg: 'User created', token });
    } catch (error) {
      return res.status(500).json({ msg: 'Something went wrong' });
    }
  } else {
    try {
      const user = await User.create({
        email: req.email,
        password: req.password,
      });
      const token = jwt.sign(
        { email: req.email, userId: user._id },
        process.env.JWT_SECRET
      );
      return res.json({ msg: 'User created', token });
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
};
export const login = async (req, res) => {
  if (req.googleJwt) {
    const client = new OAuth2Client(
      process.env.CLIENT_ID,
      process.env.CLIENT_SECRET
    );
    try {
      const googleToken = await client.verifyIdToken({
        idToken: req.googleJwt,
        audience: process.env.CLIENT_ID,
      });
      const payload = googleToken.getPayload();
      const existingUser = await User.findOne({ email: payload.email });
      if (!existingUser) {
        return res.status(404).json({ msg: "User doesn't exist" });
      } else {
        const token = jwt.sign(
          { email: existingUser.email, userId: existingUser._id },
          process.env.JWT_SECRET
        );
        return res.json({ msg: 'User loggedin', token });
      }
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    try {
      const existingUser = await User.findOne({
        email: req.body.email,
        password: req.body.password,
      });
      if (!existingUser) {
        return res.status(404).json({ msg: "User doesn't exist" });
      } else {
        const token = jwt.sign(
          { email: existingUser.email, userId: existingUser._id },
          process.env.JWT_SECRET
        );
        return res.json({ msg: 'User loggedin', token });
      }
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
};
export const validToken = (req, res) => {
  res.json({ msg: 'You are authorized' });
};
