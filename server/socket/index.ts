import SocketIo, { Server, Socket } from "socket.io";

export class Io {
  socketConnection: Server = null;

  connect(server) {
    this.socketConnection = SocketIo(server);
  }

  listen() {
    if (!this.socketConnection)
      throw new Error("Cannot listen before connection");
    this.socketConnection.on("connection", (socket: Socket) => {});
  }
}
