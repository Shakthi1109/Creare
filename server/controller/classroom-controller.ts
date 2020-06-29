import { Request, Response } from "express";
import { Classroom } from "../model/classroom-model";
import { BadRequestError } from "../errors/bad-request-error";
import { Subject } from "../model/subject-model";
import { User } from "../model/user-model";

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

  const existingTeacher = await User.findById(teacher).populate(
    "teacher",
    "name ,role, id"
  );
  const exisitingSubject = await Subject.findById(subject).populate(
    "subject",
    "name ,subjectId , grade"
  );

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

export const updateClassController = async (req: Request,res: Response){
  const existingClass = await Classroom.findById(req.params.classId);
  if (!existingClass) throw new BadRequestError("No Class found");
  existingClass.set(req.body);
  await existingClass.save();
  res.send(existingClass);
}

export const endClassController = async(req: Request, res: Response){
  
}

// join  class controller for students
export const joinClassController = async (req: Request, res: Response){
  
}
