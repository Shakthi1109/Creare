import { Request, Response } from "express";
import { TeacherProfile } from "../model/profile/teacher-model";
import { BadRequestError } from "../errors/bad-request-error";
import { User } from "../model/user-model";

export const getTeacherProfileController = async (
  req: Request,
  res: Response
) => {
  const { id } = req.currentUser;
  const teacherProfile = await TeacherProfile.findById(id);
  if (!teacherProfile) throw new BadRequestError("No Profile found");
  res.send(teacherProfile);
};

export const getTeacherProfileAdminController = async (
  req: Request,
  res: Response
) => {
  const { teacherId } = req.params;
  const teacherProfile = await TeacherProfile.findById(teacherId);
  if (!teacherProfile) throw new BadRequestError("No Profile found");
  res.send(teacherProfile);
};

export const addTeacherProfileController = async (
  req: Request,
  res: Response
) => {
  const { userId } = req.params;
  const {
    gender,
    subjects,
    education,
    idProof,
    workExperience,
    bankDetails,
    teacherApproval,
  } = req.body;

  const exisistingUser = await User.findById(userId);
  if (!exisistingUser) throw new BadRequestError("No user Found");

  const teacherProfile = TeacherProfile.build({
    gender,
    subjects,
    education,
    idProof,
    workExperience,
    bankDetails,
    teacherApproval,
  });
  teacherProfile._id = exisistingUser.id;
  await teacherProfile.save();
  res.status(201).send(teacherProfile);
};

export const updateTeacherProfileController = async (
  req: Request,
  res: Response
) => {
  const { id } = req.currentUser;
  const existingTeacherProfile = await TeacherProfile.findById(id);
  if (!existingTeacherProfile) throw new BadRequestError("No Teacher found");
  existingTeacherProfile.set(req.body);
  await existingTeacherProfile.save();
  res.send(existingTeacherProfile);
};

export const updateTeacherProfileAdminController = async (
  req: Request,
  res: Response
) => {
  const { teacherId } = req.params;
  const existingTeacherProfile = await TeacherProfile.findById(teacherId);
  if (!existingTeacherProfile) throw new BadRequestError("No Teacher found");
  existingTeacherProfile.set(req.body);
  await existingTeacherProfile.save();
  res.send(existingTeacherProfile);
};
