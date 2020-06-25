import { Request, Response } from "express";
import { School } from "../model/school-model";
import { BadRequestError } from "../errors/bad-request-error";
import { randomBytes } from "crypto";

// add school  controller

export const addSchoolController = async (req: Request, res: Response) => {
  const { name, address1, address2, city, state, pincode } = req.body;
  const existingSchool = await School.findOne({ name });
  if (existingSchool) throw new BadRequestError("School already exists");

  const uniqId = randomBytes(7).toString("hex").substr(0, 7);
  const uniqRef = name.substr(0, 2) + uniqId;
  const school = School.build({
    name,
    address1,
    address2,
    city,
    state,
    pincode,
    uniqRef,
  });
  await school.save();
  res.status(201).send(school);
};

// modify school controller

export const updateSchoolController = async (req: Request, res: Response) => {
  const { schoolId } = req.params;
  const existingSchool = await School.findById(schoolId);
  if (!existingSchool) throw new BadRequestError("No Such School Exists");
  existingSchool.set(req.body);
  await existingSchool.save();
  res.status(201).send(existingSchool);
};

// fetch all school controller
export const getAllSchoolController = async (req: Request, res: Response) => {
  const existingSchool = await School.find();
  if (!existingSchool) throw "No Schools Found";
  res.status(201).send(existingSchool);
};

// fetch school by id
export const getSchoolByIdController = async (req: Request, res: Response) => {
  const { schoolId } = req.params;
  const existingSchool = await School.findById(schoolId);
  if (!existingSchool) throw new BadRequestError("No Such School Exists");
  res.status(201).send(existingSchool);
};

// isActive controller
export const schoolActivityController = async (req: Request, res: Response) => {
  const { schoolId } = req.params;
  const existingSchool = await School.findById(schoolId);
  if (!existingSchool) throw new BadRequestError("No such School Exists");
  existingSchool.set({ isActive: !existingSchool.isActive });
  await existingSchool.save();
  res.status(201).send(existingSchool);
};
