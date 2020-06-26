import { Request, Response } from "express";
import { compare } from "bcrypt";
import jwt from "jsonwebtoken";

import { User } from "../model/user-model";
import { BadRequestError } from "../errors/bad-request-error";
import { School } from "../model/school-model";
import { randomBytes } from "crypto";
import { userInfo } from "os";
const mailer = require("../util/mail-activation");

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
  const users = await User.find({ school });
  res.status(200).send(users);
};

export const signupController = async (req: Request, res: Response) => {
  const { name, email, role, password, uniqRef } = req.body;
  const existingSchool = await School.findOne({ uniqRef });
  if (!existingSchool) throw new BadRequestError("No School Found");
  const existingUser = await User.findOne({ email });
  if (existingUser) throw new BadRequestError("User already exists");

  // TODO send account activation email
  const active = false;
  const activeToken = randomBytes(20).toString("hex").substr(0, 20);
  const activeExpires = Date.now() + 24 * 3600 * 1000;
  var link = "http://locolhost:3000/user/active/" + activeToken;

  // Sending activation email
  mailer.send({
    to: email,
    subject: "Welcome",
    html:
      'Please click <a href="' +
      link +
      '"> here </a> to activate your account.',
  });
  const user = User.build({
    email,
    name,
    password,
    role,
    active,
    activeToken,
    activeExpires,
    school: existingSchool,
  });

  await user.save();
  res.status(201).send(user);
};

export const signinController = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const existingUser = await User.findOne({ email });
  if (!existingUser) throw new BadRequestError("Invalid credentials");
  if (existingUser.isNotActive())
    throw new BadRequestError("This account is currently inactive");
  const doesPasswordMatch = await compare(password, existingUser.password);
  if (!doesPasswordMatch) throw new BadRequestError("Invalid credentials");
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
  res.send(existingUser);
};

// mail activating contoller
export const activateMailController = async (req: Request, res: Response) => {
  // const exisitingMail = await User.findOne({
  //   activeToken: req.params.activeToken,
  //   activeExpires: { $gt: Date.now().toPrecision() },
  // });
  // if (!exisitingMail)
  //   throw new BadRequestError(
  //     "Your activation mail is invalid .Register again"
  //   );
};
