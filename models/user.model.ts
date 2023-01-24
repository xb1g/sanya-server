import { ObjectId } from "mongo";
import { db } from "../db.ts";

export interface UserSchema {
  _id: ObjectId;
  username: string;
  email: string;
  password: string;
  age: number;
  chats: ObjectId[];
}

export const Users = db.collection<UserSchema>("users");
