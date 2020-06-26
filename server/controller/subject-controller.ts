import { Request, Response } from "express";
import { Subject } from "../model/subject-model";
import { BadRequestError } from "../errors/bad-request-error";
import { randomBytes } from "crypto";
import { School } from "../model/school-model";

// add Subject  controller
export const addSubjectController = async (req: Request, res: Response) => {
  const { name, grade, isActive, uniqRef } = req.body;
  const existingSchool = await School.findOne({ uniqRef });
  if (!existingSchool) throw new BadRequestError("No School found");
  const existingSubject = await Subject.findOne({ name });
  if (existingSubject) throw new BadRequestError("Subject already exists");
  const uniqId = randomBytes(4).toString("hex").substr(0, 4);
  const subjectId = name.substr(0, 3) + uniqId;

  const subject = Subject.build({
    name,
    grade,
    isActive,
    school: existingSchool,
    subjectId,
  });
  await subject.save();
  res.status(201).send(subject);
};

// modify Subject controller
export const updateSubjectController = async (req: Request, res: Response) => {
  const existingSubject = await Subject.findById(req.params.id);
  if (!existingSubject) throw new BadRequestError("No Subject found");
  existingSubject.set(req.body);
  await existingSubject.save();
  res.send(existingSubject);
};

export const getActiveSubjectController = async (
  req: Request,
  res: Response
) => {
  const subjects = await Subject.find({ isActive: true }).select([
    "name",
    "subjectId",
  ]);
  res.status(200).send(subjects);
};

// fetch Subject by id
export const getSubjectByIdController = async (req: Request, res: Response) => {
  const existingSubject = await Subject.findById(req.params.id);
  if (!existingSubject) throw new BadRequestError("No Subject found");
  res.status(200).send(existingSubject);
};

// isActive controller
export const subjectActivityController = async (
  req: Request,
  res: Response
) => {
  const existingSubject = await Subject.findById(req.params.id);
  if (!existingSubject) throw new BadRequestError("No Subject found");
  existingSubject.set({ isActive: !existingSubject.isActive });
  await existingSubject.save();
  res.send(existingSubject);
};
