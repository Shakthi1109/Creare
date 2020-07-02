import { Request, Response } from "express";
import { Attendancelog } from "../model/attendanceLog-model";
import { Classroom } from "../model/classroom-model";
import { BadRequestError } from "../errors/bad-request-error";

export const getAllAttendancelogController = async (
  userId: string,
  classroomId: string
) => {
  const exisitingAttendancelog = await Attendancelog.find({
    userId,
    classroomId,
  });
};

export const addAttendancelogController = async (
  userId: string,
  classroomId: string,
  dateTime: Date
) => {
  const exisitingUserId = await Attendancelog.findById(userId);
  if (exisitingUserId) throw new BadRequestError("User already there");

  const newAttendancelog = Attendancelog.build({
    userId,
    classroomId,
    dateTime,
  });
  await newAttendancelog.save();
};
