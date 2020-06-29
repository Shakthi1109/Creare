import mongoose from "mongoose";
import { SubjectDoc, Subject } from "../model/subject-model";

import { UserDoc } from "./user-model";

interface ClassroomAttrs {
  topic: string;
  subject: SubjectDoc;
  teacher: UserDoc;
  students: Array<UserDoc>;
  duration: string;
  startTime: string;
  endTime: String;
}

export interface ClassroomDoc extends mongoose.Document {
  topic: string;
  subject: SubjectDoc;
  teacher: UserDoc;
  students: Array<UserDoc>;
  duration: String;
  startTime: String;
  endTime: String;
}

interface ClassroomModel extends mongoose.Model<ClassroomDoc> {
  build(attrs: ClassroomAttrs): ClassroomDoc;
}

const ClassroomSchema = new mongoose.Schema(
  {
    topic: { type: String, required: true },
    subject: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subjects",
    },

    teacher: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
    },

    students: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
      },
    ],
    duration: { type: String, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

ClassroomSchema.statics.build = (attrs: ClassroomAttrs) => {
  return new Classroom(attrs);
};

const Classroom = mongoose.model<ClassroomDoc, ClassroomModel>(
  "Classrooms",
  ClassroomSchema
);

export { Classroom };
