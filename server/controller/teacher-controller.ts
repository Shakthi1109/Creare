import { Request, Response } from "express";
import { TeacherProfile } from "../model/profile/teacher-model";
import { BadRequestError } from "../errors/bad-request-error";
import { User } from "../model/user-model";
import { UserRole } from "../util/enum/user-roles";
import { Subject } from "../model/subject-model";

// add Teacher  controller
export const addTeacherController = async (req: Request, res: Response) => {
  const {
    gender,
    subjects,
    education,
    idProof,
    workExperience,
    bankDetails,
    teacherApproval,
  } = req.body;

  const exisistingUser = await User.findById(req.params.userId);
  if (!exisistingUser) throw new BadRequestError("No user Found");

  const teacherProfile = TeacherProfile.build({
    user: exisistingUser,
    gender,
    subjects,
    education,
    idProof,
    workExperience,
    bankDetails,
    teacherApproval,
  });
  await teacherProfile.save();
  res.status(201).send(teacherProfile);
};

// modify Teacher controller
export const updateTeacherController = async (req: Request, res: Response) => {
  const existingTeacher = await TeacherProfile.findById(req.params.teacherId);
  if (!existingTeacher) throw new BadRequestError("No Teacher found");
  existingTeacher.set(req.body);
  await existingTeacher.save();
  res.send(existingTeacher);
};

// fetch Teacher by id
export const getTeacherByIdController = async (req: Request, res: Response) => {
  const existingTeacher = await TeacherProfile.findById(
    req.params.teacherId
  ).populate("subjects");
  if (!existingTeacher) throw new BadRequestError("No Teacher found");
  res.status(200).send(existingTeacher);
};
