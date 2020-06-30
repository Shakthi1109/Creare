import { Request, Response } from "express";
import { Classroom } from "../model/classroom-model";
import { BadRequestError } from "../errors/bad-request-error";
import { Subject } from "../model/subject-model";
import { User } from "../model/user-model";
import { UserRole } from "../util/enum/user-roles";

// add class -> except students add everything else and schedule class

// cancel class -> cancel class schedule , update status and cancelledBy
// end class -> status update and endDateTime update (use Date.now())
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

export const endClassroomController = async (req: Request, res: Response) => {};

// join  Classroom controller for students
// this is put method
export const joinClassroomController = async (req: Request, res: Response) => {
  // join Classroom -> check for user role ,
  // ** if teacher don't do anything
  // ** if student also check if student is already in Classroom
  // **** if not then  add to students

  const existingClassroom = await Classroom.findById(req.params.classId);
  if (!existingClassroom) throw new BadRequestError("No class found");

  const students = existingClassroom.students;
  console.log({ students });
  const studentIndex = students.findIndex(
    (studentId) =>
      JSON.stringify(studentId) === JSON.stringify(req.currentUser.id)
  );

  if (studentIndex >= 0) return res.send(existingClassroom);

  const student = await User.findById(req.currentUser.id);
  const updatedStudents = [...students, student];
  console.log({ updatedStudents });
  existingClassroom.set({ students: updatedStudents });

  res.send(existingClassroom);
};
