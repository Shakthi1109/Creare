import mongoose from "mongoose";

interface SchoolAttrs {
  name: string;
  address1: string;
  address2: string;
  pincode: Number;
  city: string;
  state: string;
  uniqRef: string;
}

interface SchoolDoc extends mongoose.Document {
  name: String;
  address1: String;
  address2: String;
  pincode: Number;
  city: String;
  state: String;
  uniqRef: String;
  isActive: Boolean;
}

interface SchoolModel extends mongoose.Model<SchoolDoc> {
  build(attrs: SchoolAttrs): SchoolDoc;
}

const SchoolSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    address1: { type: String, required: true },
    address2: { type: String },
    pincode: { type: Number, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    isActive: { type: Boolean, required: true, default: false },
    uniqRef: { type: String, required: true },
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

SchoolSchema.statics.build = (attrs: SchoolAttrs) => {
  return new School(attrs);
};

const School = mongoose.model<SchoolDoc, SchoolModel>("Schools", SchoolSchema);

export { School };
