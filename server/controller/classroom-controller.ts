import { Request, Response } from "express";
import { Classroom } from "../model/classroom-model";
import { BadRequestError } from "../errors/bad-request-error";
import { Subject } from "../model/subject-model";
import { User } from "../model/user-model";
import { randomBytes } from "crypto";

// add class controller
export const addClassController = async (req: Request, res: Response) => {
  const {
    topic,
    subject,
    teacher,
    duration,
    students,
    startTime,
    endTime,
  } = req.body;

  const existingTeacher = await User.findById(teacher);
  const exisitingSubject = await Subject.findById(subject);

  if (!exisitingSubject) throw new BadRequestError("No subject exists");
  if (!existingTeacher) throw new BadRequestError("No Teacher exists");

  const classroom = Classroom.build({
    topic,
    subject: exisitingSubject,
    teacher: existingTeacher,
    duration,
    students,
    startTime,
    endTime,
  });
  await classroom.save();
  res.status(201).send(classroom);
};

// join  class controller for students
// export const joinClassController = async (req: Request, res: Response){
//   const exisitingClass = await Classroom.findById(req.params.classId);
//   if (!exisitingClass) throw new BadRequestError("No class found");
//   // const exisitingStudent = await User.findById(req.currentUser.id);
//   // if (!exisitingStudent) throw new BadRequestError("You are not registered ");

// }
