import { Request, Response } from "express";
import { compare } from "bcrypt";
import jwt from "jsonwebtoken";

import { User } from "../model/user-model";
import { BadRequestError } from "../errors/bad-request-error";
import { School } from "../model/school-model";

export const currentUserController = async (req: Request, res: Response) => {
  res.send({ currentUser: req.currentUser || null });
};

export const signoutController = async (req: Request, res: Response) => {
  req.session = null;
  res.send({});
};

export const getUsersController = async (req: Request, res: Response) => {
  const { schoolId } = req.currentUser;
  const school = await School.findById(schoolId);
  const users = await school.getUsers();
  res.status(200).send(users);
};

export const signupController = async (req: Request, res: Response) => {
  const { name, email, role, password, uniqRef } = req.body;
  const existingSchool = await School.findOne({ uniqRef, isActive: true });
  if (!existingSchool) throw new BadRequestError("No School Found");
  const existingUser = await User.findOne({ email });
  if (existingUser) throw new BadRequestError("User already exists");

  const user = User.build({
    email,
    name,
    password,
    role,
    school: existingSchool,
  });
  // TODO send account activation email
  await user.save();
  res.status(201).send(user.role);
};

export const signinController = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const existingUser = await User.findOne({ email });
  if (!existingUser) throw new BadRequestError("Invalid credentials");
  if (existingUser.isNotActive())
    throw new BadRequestError("This account is currently inactive");
  const doesPasswordMatch = await compare(password, existingUser.password);
  if (!doesPasswordMatch) throw new BadRequestError("Invalid credentials");
  // TODO redirect user to complete profile if user has no profile
  const token = await jwt.sign(
    {
      id: existingUser.id,
      email,
      role: existingUser.role,
      name: existingUser.name,
      schoolId: existingUser.school,
    },
    process.env.JWT_KEY
  );
  req.session.jwt = token;
  res.send(existingUser.role);
};
