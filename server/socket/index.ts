import SocketIo from "socket.io";

import { MessageEvent } from "../util/enum/message-event";
import { ClassroomEvent } from "../util/enum/classroom-event";

import { StudentJoined } from "../util/interface/student-joined";

export const socketServer = (server: any) => {
  const io = SocketIo(server);
  io.on("connection", async (socket) => {
    console.log("socket connected");
    let room: string;
    socket.on(ClassroomEvent.StudentJoined, (data: StudentJoined) => {
      room = data.room;
      socket.join(data.room);
      io.to(data.room).emit(ClassroomEvent.StudentAdd, data);
    });

    socket.on(MessageEvent.Sent, (data) => {
      socket.to(room).emit(MessageEvent.Recieved, data);
    });
  });
};
