import mongoose from "mongoose";
import { SchoolDoc } from "./school-model";

interface SubjectAttrs {
  name: string;
  subjectId: string;
  grade: string;
  isActive: boolean;
  school: SchoolDoc;
}

export interface SubjectDoc extends mongoose.Document {
  name: string;
  subjectId: string;
  grade: string;
  isActive: boolean;
  school: SchoolDoc;
}

interface SubjectModel extends mongoose.Model<SubjectDoc> {
  build(attrs: SubjectAttrs): SubjectDoc;
}

const SubjectSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    subjectId: { type: String, required: true },
    grade: { type: String, required: true },
    isActive: { type: Boolean, required: true, default: false },
    school: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Schools",
    },
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

SubjectSchema.statics.build = (attrs: SubjectAttrs) => {
  return new Subject(attrs);
};

const Subject = mongoose.model<SubjectDoc, SubjectModel>(
  "Subjects",
  SubjectSchema
);

export { Subject };
