import SocketIo from "socket.io";

import { MessageEvent } from "./event";

export const socketServer = (server) => {
  const io = SocketIo(server);
  io.on("connection", async (socket) => {
    socket.on(MessageEvent.Joined, (data) => {
      console.log({ socket: data });
    });
    socket.on(MessageEvent.Sent, (data) => {
      console.log({ socket: data });
      // socket.to()
    });
  });
};
