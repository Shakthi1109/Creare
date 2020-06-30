import { Request, Response } from "express";
import { Classroom } from "../model/classroom-model";
import { BadRequestError } from "../errors/bad-request-error";
import { Subject } from "../model/subject-model";
import { User } from "../model/user-model";
import { UserRole } from "../util/enum/user-roles";
import { stat } from "fs";
import { ClassroomStatus } from "../util/enum/classroom-status";

// add class -> except students add everything else and schedule class
// get all classes only for admin
// cancel class -> cancel class schedule , update status and cancelledBy

// fetch class by id -> populate all here;
// ** NOTE: .populate("students").populate("teacher").populate("subject")
// ** in users only name and id
// ** in subject only name and grade

// .populate("subject","id grade name")

// in schedule class, 2 schedules should should be created
// 15mins before class notify teacher
// when schedule is executed update status

// add class controller
// populate means adding data to references in data
// classroom has user ref
// user doesnt have user ref
// classroom has subject ref
// subject doesnt have subject ref
// in case you want to check if student is still there get classroom.students and incoming studentId
// and just compare them like finding if element exists in an array; cool? yes
// ///////////////ok now should i just add  that agenda and commit or complete this all and then??
// add agenda and commit
// while i work on agenda code , you complete this ok..
// you got agenda output right, b.y.. o utput i dont mean database data, i mean the job got executed right?

// in db i saw that repeated job were getting initialized each 10 seconnds...add console.log   in jobs and see if they were being diplayed in console
// classroom is the one with user reference you should populate classroom

export const addClassController = async (req: Request, res: Response) => {
  const {
    topic,
    subject,
    teacher,
    addedBy,
    startDateTime,
    endDateTime,
  } = req.body;

  const existingTeacher = await User.findById(teacher);
  const exisitingSubject = await Subject.findById(subject);

  if (!exisitingSubject) throw new BadRequestError("No subject exists");
  if (!existingTeacher) throw new BadRequestError("No Teacher exists");
  const milliSecsInHour = 3600000;
  const duration =
    (new Date(endDateTime).valueOf() - new Date(startDateTime).valueOf()) /
    milliSecsInHour;

  const classroom = Classroom.build({
    topic,
    subject: exisitingSubject,
    teacher: existingTeacher,
    addedBy,
    duration,
    startDateTime,
    endDateTime,
  });
  await classroom.save();
  res.status(201).send(classroom);
};

// update class
export const updateClassroomController = async (
  req: Request,
  res: Response
) => {
  const existingClassroom = await Classroom.findById(req.params.classId);
  if (!existingClassroom) throw new BadRequestError("No Classroom found");
  existingClassroom.set(req.body);
  await existingClassroom.save();
  res.send(existingClassroom);
};

export const endClassroomController = async (req: Request, res: Response) => {
  // end class -> status update and endDateTime update (use Date.now())
  const existingClassroom = await Classroom.findById(req.params.classId);
  if (!existingClassroom) throw new BadRequestError("No such classroom exists");
  // const status = existingClassroom.status;
  existingClassroom.set({ status: ClassroomStatus.Cancelled });
  existingClassroom.set({ endDateTime: Date.now() });
  res.send(existingClassroom);
};

// join  Classroom controller for students
export const joinClassroomController = async (req: Request, res: Response) => {
  const existingClassroom = await Classroom.findById(
    req.params.classId
  ).populate("students", "name id");
  if (!existingClassroom) throw new BadRequestError("No class found");

  if (req.currentUser.role !== UserRole.Student)
    return res.send(existingClassroom);

  const students = existingClassroom.students;
  const studentIndex = students.findIndex(
    (student) =>
      JSON.stringify(student.id) === JSON.stringify(req.currentUser.id)
  );
  if (studentIndex >= 0) return res.send(existingClassroom);
  const student = await User.findById(req.currentUser.id).select("name id");
  const updatedStudents = [...students, student];
  existingClassroom.set({ students: updatedStudents });
  await existingClassroom.save();
  res.send(existingClassroom);
};
