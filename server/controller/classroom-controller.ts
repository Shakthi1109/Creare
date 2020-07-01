import { Request, Response } from "express";
import { Classroom } from "../model/classroom-model";
import { BadRequestError } from "../errors/bad-request-error";
import { Subject } from "../model/subject-model";
import { User } from "../model/user-model";
import { UserRole } from "../util/enum/user-roles";
import { ClassroomStatus } from "../util/enum/classroom-status";
import { scheduler } from "../util/scheduler";
import { start } from "repl";

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
    status: { $in: [ClassroomStatus.InProgress, ClassroomStatus.Scheduled] },
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

  if (duration < 1)
    throw new BadRequestError("Class duration should be atleast 1 hour");

  const startTime =
    (new Date(startDateTime).valueOf() - Date.now()) / milliSecsInHour;
  if (startTime < 1)
    throw new BadRequestError("Class scheduled must be min of 1 hour");

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

  // schedeule the classroom using scheduler

  scheduler.scheduleJob(
    topic,
    startDateTime,
    async (data: any) => {
      const classroom = await Classroom.findById(data.classroomId);

      if (classroom) {
        classroom.set({ status: ClassroomStatus.InProgress });
        await classroom.save();
      }
    },
    { classroomId: classroom.id }
  );

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
  if (req.currentUser.role !== UserRole.Student) return res.send({});

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
