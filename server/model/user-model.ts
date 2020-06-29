import mongoose from "mongoose";
import { genSalt, hash } from "bcrypt";

import { UserRole } from "../util/enum/user-roles";
import { UserStatus } from "../util/enum/user-status";
import { SchoolDoc, School } from "./school-model";
import { BadRequestError } from "../errors/bad-request-error";
import { TeacherProfile } from "./profile/teacher-model";

interface UserAttrs {
  name: string;
  email: string;
  role: UserRole;
  password: string;
  school: SchoolDoc;
}

export interface UserDoc extends mongoose.Document {
  name: string;
  email: string;
  role: UserRole;
  password: string;
  activity: UserStatus;
  isNotActive(): boolean;
  school: SchoolDoc;
  getSchool(): SchoolDoc;
  getProfile(): any;
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

UserSchema.methods.getSchool = async function () {
  const school = await School.findById(this.school);
  if (!school) throw new BadRequestError("User School not found");
  return school;
};

UserSchema.methods.getProfile = async function () {
  let profile;
  switch (this.role) {
    case UserRole.Teacher:
      profile = await TeacherProfile.findById(this.id).populate("subjects");
      break;
    case UserRole.Student:
    case UserRole.Admin:
    default:
      profile = false;
  }
  return profile;
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
