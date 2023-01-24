import { ObjectId } from "mongo";
import { db } from "../db.ts";

export interface messageSchema {
  _id: ObjectId;
  chatId: ObjectId;
  text: string;
  type: "text" | "image";
}

export const Messages = db.collection<messageSchema>("messages");
