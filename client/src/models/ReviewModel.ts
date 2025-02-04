import { UserModel } from "./UserModel";

export interface ReviewModel {
  ReviewID: number;
  __typename: string;
  createAt: string;
  star: number;
  text: string;

  reviewer?: UserModel
}
