import { Request, Response } from "express";
import { Classroom } from "../model/classroom-model";
import { BadRequestError } from "../errors/bad-request-error";
import { Subject } from "../model/subject-model";
import { User } from "../model/user-model";
import { UserRole } from "../util/enum/user-roles";
import { ClassroomStatus } from "../util/enum/classroom-status";
import { scheduler } from "../util/scheduler";

// add class -> except students add everything else and schedule class
// get all classes only for admin

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

export const fetchAllClassroomController = async (
  req: Request,
  res: Response
) => {
  const classrooms = await Classroom.find()
    .populate("teacher", "name id")
    .populate("students", "name id")
    .populate("subject", "id name grade");

  res.status(200).send(classrooms);
};

export const fetchClassroomByIdController = async (
  req: Request,
  res: Response
) => {
  const classrooms = await Classroom.findById(req.params.classId)
    .populate("teacher", "name id")
    .populate("students", "name id")
    .populate("subject", "id name grade");

  res.status(200).send(classrooms);
};

export const addClassController = async (req: Request, res: Response) => {
  const {
    topic,
    subject,
    teacher,
    addedBy,
    startDateTime,
    endDateTime,
  } = req.body;

  const exisitingClassroom = await Classroom.findOne({
    topic,
    status: ClassroomStatus.Scheduled || ClassroomStatus.InProgress,
  });
  if (exisitingClassroom)
    throw new BadRequestError("A classroom already exists");
  const existingTeacher = await User.findById(teacher);
  const exisitingSubject = await Subject.findById(subject);

  if (!exisitingSubject) throw new BadRequestError("No subject exists");
  if (!existingTeacher) throw new BadRequestError("No Teacher exists");
  const milliSecsInHour = 3600000;
  const duration =
    (new Date(endDateTime).valueOf() - new Date(startDateTime).valueOf()) /
    milliSecsInHour;

  // schedeule the classroom using scheduler
  // TODO scheduleing debug.
  scheduler.scheduleJob(topic, startDateTime, (data: any) => {
    const status = (exisitingClassroom.status = ClassroomStatus.InProgress);
    data = status;
    data.save();
  });

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

// end class
export const endClassroomController = async (req: Request, res: Response) => {
  // end class -> status update and endDateTime update (use Date.now())
  const existingClassroom = await Classroom.findById(req.params.classId);
  const topic = existingClassroom.topic;
  if (!existingClassroom) throw new BadRequestError("No such classroom exists");
  // const status = existingClassroom.status;
  const isStudent = req.currentUser.role === UserRole.Student;
  if (isStudent)
    throw new BadRequestError("only teacher or admin is allowed to end ");
  existingClassroom.set({ status: ClassroomStatus.Completed });
  existingClassroom.set({ endDateTime: Date.now() });
  scheduler.cancel(topic);
  existingClassroom.save();
  res.send(existingClassroom);
};

// cancel class
export const cancelClassController = async (req: Request, res: Response) => {
  // cancel class -> cancel class schedule , update status and cancelledBy
  const existingClassroom = await Classroom.findById(req.params.classId);
  const topic = existingClassroom.topic;
  if (!existingClassroom) throw new BadRequestError("No such classroom exists");
  // const status = existingClassroom.status;
  const isStudent = req.currentUser.role === UserRole.Student;
  if (isStudent)
    throw new BadRequestError("only teacher or admin is allowed to cancel");
  existingClassroom.set({ status: ClassroomStatus.Cancelled });
  existingClassroom.set({ cancelledBy: req.currentUser.id });
  scheduler.cancel(topic);
  existingClassroom.save();
  res.send(existingClassroom);
};

// join  Classroom controller for students
export const joinClassroomController = async (req: Request, res: Response) => {
  const existingClassroom = await Classroom.findById(
    req.params.classId
  ).populate("students", "name id");
  if (!existingClassroom) throw new BadRequestError("No classroom found");

  if (
    existingClassroom.status === ClassroomStatus.Completed ||
    existingClassroom.status === ClassroomStatus.Cancelled
  )
    throw new BadRequestError("Class is unavailable");
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
