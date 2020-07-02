import { Request, Response } from "express";
import { Classroom } from "../model/classroom-model";
import { BadRequestError } from "../errors/bad-request-error";
import { Subject } from "../model/subject-model";
import { User } from "../model/user-model";
import { UserRole } from "../util/enum/user-roles";
import { ClassroomStatus } from "../util/enum/classroom-status";
import { scheduler } from "../util/scheduler";
import { Message } from "../model/message-model";

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
  const classroom = await Classroom.findById(req.params.classId)
    .populate("teacher", "name id")
    .populate("students", "name id")
    .populate("subject", "id name grade");

  if (!classroom) throw new BadRequestError("No such classroom");

  // NEW ADDITION
  // const messages = await Message.find({ roomId: classroom.id });
  // // classroom["messages"] = messages;
  // const classroomWithMessages = { ...classroom, messages };

  res.status(200).send(classroom);
};

export const addClassController = async (req: Request, res: Response) => {
  const { topic, subjectId, teacherId, startDateTime, endDateTime } = req.body;

  const milliSecsInHour = 3600000;

  const duration =
    (new Date(endDateTime).valueOf() - new Date(startDateTime).valueOf()) /
    milliSecsInHour;

  if (duration < 1)
    throw new BadRequestError("Class duration should be atleast 1 hour");

  const startTime =
    (new Date(startDateTime).valueOf() - Date.now().valueOf()) /
    milliSecsInHour;
  if (startTime < 1)
    throw new BadRequestError("Class must be scheduled atleast 1 hour ahead");

  const exisitingClassroom = await Classroom.findOne({
    topic,
    status: { $in: [ClassroomStatus.InProgress, ClassroomStatus.Scheduled] },
  });

  if (exisitingClassroom) throw new BadRequestError("Classroom already exists");

  const existingTeacher = await User.findById(teacherId);

  if (!existingTeacher) throw new BadRequestError("No Teacher exists");
  if (existingTeacher.isNotActive())
    throw new BadRequestError("Cannot create class with this teacher");

  const exisitingSubject = await Subject.findById(subjectId);

  if (!exisitingSubject) throw new BadRequestError("No subject exists");

  const user = await User.findById(req.currentUser.id);
  const classroom = Classroom.build({
    topic,
    subject: exisitingSubject,
    teacher: existingTeacher,
    addedBy: user,
    duration,
    startDateTime,
    endDateTime,
  });

  await classroom.save();

  // schedule the classroom using scheduler
  scheduler.scheduleJob(
    classroom.id,
    startDateTime,
    async (data: any) => {
      const classroom = await Classroom.findById(data.classroomId);
      if (classroom && classroom?.status === ClassroomStatus.Scheduled) {
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
  const existingClassroom = await Classroom.findById(req.params.classId);
  if (!existingClassroom) throw new BadRequestError("No such classroom exists");
  if (existingClassroom.status !== ClassroomStatus.InProgress)
    throw new BadRequestError("Class has not started yet");
  const isStudent = req.currentUser.role === UserRole.Student;
  if (isStudent)
    throw new BadRequestError("only teacher or admin is allowed to end ");

  existingClassroom.set({ status: ClassroomStatus.Completed });
  const milliSecsInHour = 3600000;
  const endDateTime = Date.now().valueOf();
  const startDateTime = new Date(existingClassroom.startDateTime).valueOf();
  const duration = (endDateTime - startDateTime) / milliSecsInHour;

  existingClassroom.set({ endDateTime, duration });
  existingClassroom.save();
  res.send(existingClassroom);
};

// cancel class
export const cancelClassController = async (req: Request, res: Response) => {
  const user = await User.findById(req.currentUser.id);
  const existingClassroom = await Classroom.findById(req.params.classId);
  if (!existingClassroom) throw new BadRequestError("No such classroom exists");
  if (existingClassroom.status !== ClassroomStatus.Scheduled)
    throw new BadRequestError("Cannot cancel class");

  const isStudent = req.currentUser.role === UserRole.Student;
  if (isStudent)
    throw new BadRequestError("only teacher or admin is allowed to cancel");

  scheduler.cancel(existingClassroom.id);

  existingClassroom.set({
    status: ClassroomStatus.Cancelled,
    cancelledBy: user,
  });

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
    throw new BadRequestError("Class unavailable");
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
