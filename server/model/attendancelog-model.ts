import mongoose from "mongoose";

interface AttendancelogAttrs {
  userId: string;
  classroomId: string;
  dateTime: Date;
}

export interface AttendancelogDoc extends mongoose.Document {
  userId: string;
  classroomId: string;
  dateTime: Date;
}

interface AttendancelogModel extends mongoose.Model<AttendancelogDoc> {
  build(attrs: AttendancelogAttrs): AttendancelogDoc;
}

const AttendancelogSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    classroomId: { type: String, required: true },
    dateTime: { type: mongoose.Schema.Types.Date, required: true },
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
