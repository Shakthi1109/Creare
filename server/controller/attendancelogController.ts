import { Request, Response } from "express";
import { Attendancelog } from "../model/attendancelog-model";

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
  pingCount: number
) => {
  const existingPingCount = Attendancelog.findOne({ userId, classroomId });
  if (!existingPingCount) {
    const count = (await existingPingCount).pingCount + 1;
    (await existingPingCount).set({ pingCount: count });
  }
  const newAttendancelog = Attendancelog.build({
    userId,
    classroomId,
    pingCount,
  });
  await newAttendancelog.save();
};
