import mongoose from "mongoose";

interface AttendancelogAttrs {
  userId: string;
  classId: string;
  dateTime: Date;
}

export interface AttendeancelogDoc extends mongoose.Document {
  userId: string;
  classId: string;
  dateTime: Date;
}

interface AttendeancelogModel extends mongoose.Model<AttendeancelogDoc> {
  build(attrs: AttendeancelogModel): AttendeancelogDoc;
}

const AttendancelogSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    classId: { type: String, required: true },
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

const Attendancelog = mongoose.model<AttendeancelogDoc, AttendeancelogModel>(
  "Attendancelog",
  AttendancelogSchema
);

export { Attendancelog };
