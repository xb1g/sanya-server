import { Router } from "oak";
import { Users } from "../models/user.model.ts";
import { ObjectId } from "mongo";

export const usersRouter = new Router();

usersRouter
  .get("/", async (ctx) => {
    const users = await Users.find().toArray();
    ctx.response.body = users || [];
  })
  .get("/:id", async (ctx) => {
    const user = await Users.findOne({ _id: new ObjectId(ctx.params.id) });
    ctx.response.body = user;
  })
  .post("/", async (ctx) => {
    const body = await ctx.request.body({ type: "json" }).value;
    console.log(typeof body);
    const user = await Users.insertOne(body);
    ctx.response.body = user;
  })
  .post("/login/email", async (ctx) => {
    const body = await ctx.request.body({ type: "json" }).value;

    if (!body.email || !body.password) {
      ctx.response.body = { error: "Email or password not provided" };
      return;
    }

    const users = await Users.find({
      email: body.email,
    }).toArray();

    console.log(users);

    // check password
    const user = users.find((user) => {
      return user.password === body.password;
    });

    if (user) {
      ctx.response.body = user;
    } else {
      ctx.response.body = { error: "User not found" };
    }
  })
  .put("/:id", async (ctx) => {
    const body = await ctx.request.body({ type: "json" }).value;
    const user = await Users.updateOne(
      { _id: new ObjectId(ctx.params.id) },
      { $set: body }
    );
    ctx.response.body = user;
  })
  .delete("/:id", async (ctx) => {
    const user = await Users.deleteOne({ _id: new ObjectId(ctx.params.id) });
    ctx.response.body = user;
  });
