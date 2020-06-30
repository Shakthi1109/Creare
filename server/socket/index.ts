import SocketIo from "socket.io";

import { MessageEvent } from "../util/enum/message-event";
import { ClassroomEvent } from "../util/enum/classroom-event";

import { StudentJoined } from "../util/interface/student-joined";

export const socketServer = (server: any) => {
  const io = SocketIo(server);
  io.on("connection", async (socket) => {
    console.log("socket connected");
    socket.on(ClassroomEvent.StudentJoined, (data: StudentJoined) => {
      socket.join(data.room);
      io.to(data.room).emit(ClassroomEvent.StudentAdd, data);
    });
  });
};
