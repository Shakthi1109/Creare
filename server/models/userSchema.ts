const mongoose = require("mongoose");
const Schema = mongoose.Schema;
import { userType } from "../enums/user-types";

const userSchema = new Schema(
  {
    email: { type: String, required: true },
    type: {
      type: String,
      required: true,
      enum: Object.values(userType),
    },
    password: { type: String },
    userid: {
      type: Schema.Types.ObjectId,
      ref: "users",
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret._v;
      },
    },
  }
);

const User = mongoose.model("user", userSchema);
export { User };
