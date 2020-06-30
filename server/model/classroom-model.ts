import mongoose, { Mongoose } from "mongoose";
import { SubjectDoc, Subject } from "../model/subject-model";

import { UserDoc } from "./user-model";
import { UserRole } from "../util/enum/user-roles";

// TODO add addedBy (admin or teacher) - UserDoc
interface ClassroomAttrs {
  topic: string;
  subject: SubjectDoc;
  teacher: UserDoc;
  duration: number;
  startDateTime: Date;
  endDateTime: Date;
  addedBy: UserDoc;
}
// TODO add class status
// TODO add addedBy (admin or teacher) - UserDoc
// TODO add cancelledBy (admin or teacher) - UserDoc
export interface ClassroomDoc extends mongoose.Document {
  topic: string;
  subject: SubjectDoc;
  teacher: UserDoc;
  students: Array<UserDoc>;
  duration: number;
  startDateTime: Date;
  endDateTime: Date;
  addedBy: UserDoc;
  cancelledBy: UserDoc;
}

interface ClassroomModel extends mongoose.Model<ClassroomDoc> {
  build(attrs: ClassroomAttrs): ClassroomDoc;
}
// TODO add class status (scheduled,in-progress,completed,cancelled)
// TODO add addedBy (admin or teacher) - UserDoc
// TODO add cancelledBy (admin or teacher) - UserDoc
const ClassroomSchema = new mongoose.Schema(
  {
    addedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
    },

    cancelledBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
    },

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
    duration: { type: Number, required: true },
    startDateTime: { type: mongoose.Schema.Types.Date, required: true },
    endDateTime: { type: mongoose.Schema.Types.Date, required: true },
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
