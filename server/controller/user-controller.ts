import { Request, Response } from "express";
import { compare } from "bcrypt";
import jwt from "jsonwebtoken";

import { User } from "../model/user-model";
import { BadRequestError } from "../errors/bad-request-error";
import { School } from "../model/school-model";
import { UserStatus } from "../util/enum/user-status";

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

export const requestedUserController = async (req: Request, res: Response) => {
  const { schoolId } = req.currentUser;
  const school = await School.findById(schoolId);
  const users = await school.getUsers();
  const requestedUsers = await users.filter(
    ({ activity }) => activity === UserStatus.ApprovalPending
  );
  res.status(200).send(requestedUsers);
};

export const activeUsersController = async (req: Request, res: Response) => {
  const { schoolId } = req.currentUser;
  const { type } = req.params;
  const school = await School.findById(schoolId);
  const users = await school.getUsers();
  const requestedUsers = await users.filter(
    ({ role, activity }) => activity === UserStatus.Approved && role === type
  );
  res.status(200).send(requestedUsers);
};

export const getParticularUserController = async (
  req: Request,
  res: Response
) => {
  const { userId } = req.params;
  const user = await User.findById(userId);
  if (!user) throw new BadRequestError("No User found for the provided id.");
  res.status(200).send(user);
};
