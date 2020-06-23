import mongoose from "mongoose";
import { genSalt, hash } from "bcrypt";

import { UserRole } from "../util/enum/user-roles";

interface UserAttrs {
  name: string;
  email: string;
  role: UserRole;
  password: string;
}

interface UserDoc extends mongoose.Document {
  name: string;
  email: string;
  role: UserRole;
  password: string;
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

const User = mongoose.model<UserDoc, UserModel>("Users", UserSchema);

export { User };
