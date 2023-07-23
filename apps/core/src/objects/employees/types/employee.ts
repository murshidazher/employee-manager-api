import { ObjectId } from "mongodb";

export interface RawEmployee {
  _id: ObjectId,
  firstName: string,
  lastName: string,
  email: string,
  number: string,
  photo: string,
  gender: string,
  createdAt: Date,
  updatedAt: Date,
}
