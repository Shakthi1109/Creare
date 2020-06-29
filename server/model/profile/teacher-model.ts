import mongoose from "mongoose";
import { UserGender } from "../../util/enum/user-gender";
import { SubjectDoc } from "../subject-model";
import { UserProof } from "../../util/enum/user-proof";
import {
  Education,
  BankDetails,
  IdProof,
  TeacherApprovalInfo,
  WorkExperience,
} from "./interface";

interface TeacherAttrs {
  gender: UserGender;
  subjects: Array<SubjectDoc>;
  education: Array<Education>;
  idProof: Array<IdProof>;
  workExperience: Array<WorkExperience>;
  bankDetails: Array<BankDetails>;
  teacherApproval: TeacherApprovalInfo;
}

interface TeacherDoc extends mongoose.Document {
  gender: UserGender;
  subjects: Array<SubjectDoc>;
  education: Array<Education>;
  idProof: Array<IdProof>;
  workExperience: Array<WorkExperience>;
  bankDetails: Array<BankDetails>;
  teacherApproval: TeacherApprovalInfo;
}

interface TeacherModel extends mongoose.Model<TeacherDoc> {
  build(attrs: TeacherAttrs): TeacherDoc;
}

const TeacherProfileSchema = new mongoose.Schema(
  {
    gender: {
      type: String,
      enum: Object.values(UserGender),
      default: UserGender.Female,
    },
    subjects: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Subjects",
      },
    ],
    education: [
      {
        degree: String,
        institute: String,
        year: Number,
      },
    ],
    idProof: [
      {
        type: {
          type: String,
          enum: Object.values(UserProof),
        },
        imageUrl: String,
      },
    ],
    workExperience: [
      {
        institute: String,
        postion: String,
      },
    ],
    bankDetails: [
      {
        account: String,
        ifscCode: String,
        name: String,
        branch: String,
        city: String,
        state: String,
      },
    ],
    teacherApproval: {
      date: mongoose.Schema.Types.Date,
      imageUrl: String,
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

TeacherProfileSchema.statics.build = (attrs: TeacherAttrs) => {
  return new TeacherProfile(attrs);
};

const TeacherProfile = mongoose.model<TeacherDoc, TeacherModel>(
  "TeacherProfiles",
  TeacherProfileSchema
);

export { TeacherProfile };
