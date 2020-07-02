import Io from "socket.io-client";
import axios from "axios";

import { ClassroomEvent } from "../../server/util/enum/classroom-event";
import { MessageEvent } from "../../server/util/enum/message-event";
import { StudentJoined } from "../../server/util/interface/student-joined";
import { MessageSent } from "../../server/util/interface/message-sent";

const socket = Io();

export const socketEvent = {
  joinStudentToClassroom: async (data: StudentJoined) => {
    try {
      await axios.put(`/api/classroom/join/${data.room}`);
      socket.emit(ClassroomEvent.StudentJoined, data);
    } catch (error) {
      alert("couldnt join class");
    }
  },
  joinClassroom: async (roomId) => {
    socket.emit(ClassroomEvent.UserJoined, roomId);
  },
  addToClassroom: (addStudent: Function) => {
    socket.on(ClassroomEvent.StudentAdd, (data) => {
      addStudent(data);
    });
  },
  sendMessage: async (data: MessageSent, onSuccess: Function) => {
    try {
      await axios.post(`/api/message/${data.room}`, { message: data.message });
      socket.emit(MessageEvent.Sent, data);
      onSuccess();
    } catch (error) {
      console.log("error here");
    }
  },
  recievedMessage: (addMessage: Function) => {
    socket.on(MessageEvent.Recieved, (data) => {
      addMessage(data);
    });
  },
};
