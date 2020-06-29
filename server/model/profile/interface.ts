import { UserProof } from "../../util/enum/user-proof";

export interface IdProof {
  type: UserProof;
  imageUrl: string;
}

export interface WorkExperience {
  years: number;
  position: string;
}

export interface BankDetails {
  account: string;
  ifscCode: string;
  name: string;
  branch: String;
  city: string;
  state: string;
}

export interface Education {
  degree: string;
  institute: string;
  year: number;
}

export interface TeacherApprovalInfo {
  date: Date;
  imageUrl: string;
}
