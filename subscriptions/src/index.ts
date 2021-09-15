import express from "express";
import "express-async-errors";
import mongoose from "mongoose";
import { json } from "body-parser";
import { addSubscriptionRouter } from "./routes/addSubscription";
import { getSubscriptionRouter } from "./routes/getSubscription";
import { getAllSubscriptionRouter } from "./routes/getAllSubscription";
import { errorHandler } from "./middlewares/errorHandler";

const app = express();
app.use(json());

app.use(addSubscriptionRouter);
app.use(getAllSubscriptionRouter);
app.use(getSubscriptionRouter);

app.all("*", async (req, res) => {
  console.error("Not found");
});

app.use(errorHandler);

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
