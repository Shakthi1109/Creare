import mongoose from "mongoose";

interface AttendancelogAttrs {
  userId: string;
  classroomId: string;
  pingCount: number;
}

export interface AttendancelogDoc extends mongoose.Document {
  userId: string;
  classroomId: string;
  pingCount: number;
}

interface AttendancelogModel extends mongoose.Model<AttendancelogDoc> {
  build(attrs: AttendancelogAttrs): AttendancelogDoc;
}

const AttendancelogSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    classroomId: { type: String, required: true },
    pingCount: { type: Number, default: 1 },
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

AttendancelogSchema.statics.build = (attrs: AttendancelogAttrs) => {
  return new Attendancelog(attrs);
};

const Attendancelog = mongoose.model<AttendancelogDoc, AttendancelogModel>(
  "Attendancelog",
  AttendancelogSchema
);

export { Attendancelog };
