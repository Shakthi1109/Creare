import { Request, Response } from "express";
import { compare } from "bcrypt";
import jwt from "jsonwebtoken";

import { User } from "../model/user-model";
import { BadRequestError } from "../errors/bad-request-error";

export const currentUserController = async (req: Request, res: Response) => {
  res.send({ currentUser: req.currentUser || null });
};

export const signupController = async (req: Request, res: Response) => {
  const { name, email, role, password } = req.body;
  const existingUser = await User.findOne({ email });
  if (existingUser) throw new BadRequestError("User already exists");
  const user = User.build({ email, name, password, role });
  // TODO send account activation email
  await user.save();
  res.status(201).send(user);
};

export const signinController = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const existingUser = await User.findOne({ email });
  if (!existingUser) throw new BadRequestError("Invalid credentials");
  const doesPasswordMatch = await compare(password, existingUser.password);
  if (!doesPasswordMatch) throw new BadRequestError("Invalid credentials");
  const token = await jwt.sign(
    {
      id: existingUser.id,
      email,
      role: existingUser.role,
      name: existingUser.name,
    },
    process.env.JWT_KEY
  );
  req.session.jwt = token;
  res.send(existingUser);
};
