import mongoose from "mongoose";
import { app } from "./app";

const start = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/subscriptions", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log("Connected to mongodb");
  } catch (error) {
    console.error(error);
  }

  app.listen(3001, () => {
    console.log("Listening on port 3001!");
  });
};

start();

export { app };
