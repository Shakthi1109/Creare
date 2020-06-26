import mongoose from "mongoose";
import { genSalt, hash } from "bcrypt";

import { UserRole } from "../util/enum/user-roles";
import { UserStatus } from "../util/enum/user-status";
import { SchoolDoc } from "./school-model";

interface UserAttrs {
  name: string;
  email: string;
  role: UserRole;
  password: string;
  school: SchoolDoc;
}

interface UserDoc extends mongoose.Document {
  name: string;
  email: string;
  role: UserRole;
  password: string;
  activity: UserStatus;
  isNotActive(): boolean;
  school: SchoolDoc;
}

interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    role: {
      type: String,
      enum: Object.values(UserRole),
    },
    password: { type: String, required: true },
    activity: {
      type: String,
      enum: Object.values(UserStatus),
      default: UserStatus.ApprovalPending,
    },
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
        delete ret.password;
      },
    },
  }
);

UserSchema.pre("save", async function (done) {
  if (this.isModified("password")) {
    const salt = await genSalt(7);
    const hashPassword = await hash(this.get("password"), salt);
    this.set("password", hashPassword);
  }
  done();
});

UserSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};

UserSchema.methods.isNotActive = function () {
  if (
    this.activity === UserStatus.ApprovalPending ||
    this.activity === UserStatus.Removed
  )
    return true;

  return false;
};

const User = mongoose.model<UserDoc, UserModel>("Users", UserSchema);

export { User };
