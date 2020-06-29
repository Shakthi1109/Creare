import mongoose from "mongoose";
import { User, UserDoc } from "./user-model";

interface SchoolAttrs {
  name: string;
  address1: string;
  address2: string;
  pincode: string;
  city: string;
  state: string;
  uniqRef: string;
}

export interface SchoolDoc extends mongoose.Document {
  name: string;
  address1: string;
  address2: string;
  pincode: string;
  city: string;
  state: string;
  uniqRef: string;
  isActive: Boolean;
  getUsers(): Array<UserDoc>;
}

interface SchoolModel extends mongoose.Model<SchoolDoc> {
  build(attrs: SchoolAttrs): SchoolDoc;
}

const SchoolSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    address1: { type: String, required: true },
    address2: { type: String },
    pincode: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    isActive: { type: Boolean, default: false },
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

SchoolSchema.methods.getUsers = async function () {
  const users = await User.find({ school: this });
  return users;
};

const School = mongoose.model<SchoolDoc, SchoolModel>("Schools", SchoolSchema);

export { School };
