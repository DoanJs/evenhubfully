import { BillModel } from "./BillModel";
import { CategoryModel } from "./CategoryModel";

export interface UserModel {
  __typename: string;
  UserID: number;
  Username: string;
  Email: string;
  Password: string;
  PhotoUrl: string;
  isChangePassword: number;
  about: string;
  type: "Organizer" | "Personal" | undefined;

  followings?: [UserModel];
  followers?: [UserModel];
  interests?: [CategoryModel];
  bills?:[BillModel]
}
