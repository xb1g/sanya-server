import { ObjectId } from "mongo";
import { db } from "../db.ts";

export interface ChatSchema {
  _id: ObjectId;
  messages: ObjectId[];
  users: ObjectId[];
}

export const Chats = db.collection<ChatSchema>("chats");
