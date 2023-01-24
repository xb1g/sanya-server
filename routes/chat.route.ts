import { Router } from "oak";
import { Chats } from "../models/chat.model.ts";
import { ObjectId } from "mongo";

export const chatsRouter = new Router();

chatsRouter
  .get("/", async (ctx) => {
    const chats = await Chats.find().toArray();
    ctx.response.body = chats || [];
  })
  .get("/:id", async (ctx) => {
    const chatId = await Chats.findOne({ _id: new ObjectId(ctx.params.id) });
    ctx.response.body = chatId;
  })
  .post("/", async (ctx) => {
    const body = await ctx.request.body({ type: "json" }).value;
    console.log(typeof body);
    const chatId = await Chats.insertOne(body);
    ctx.response.body = chatId;
  })
  .put("/:id", async (ctx) => {
    const body = await ctx.request.body({ type: "json" }).value;
    const chatId = await Chats.updateOne(
      { _id: new ObjectId(ctx.params.id) },
      { $set: body }
    );
    ctx.response.body = chatId;
  })
  .delete("/:id", async (ctx) => {
    const chatId = await Chats.deleteOne({ _id: new ObjectId(ctx.params.id) });
    ctx.response.body = chatId;
  });
