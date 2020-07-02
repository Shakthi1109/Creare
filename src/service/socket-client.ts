import Io from "socket.io-client";

import { ClassroomEvent } from "../../server/util/enum/classroom-event";
import { StudentJoined } from "../../server/util/interface/student-joined";

const socket = Io();

export const socketEvent = {
  joinClassroom(data: StudentJoined) {
    socket.emit(ClassroomEvent.StudentJoined, data);
    // TODO make axios classroom join request
  },
  addToClassroom: (addStudent: Function) => {
    socket.on(ClassroomEvent.StudentAdd, (data) => {
      addStudent(data);
    });
  },
};
