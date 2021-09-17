import express from "express";
import "express-async-errors";
import { json } from "body-parser";
import { addSubscriptionRouter } from "./routes/addSubscription";
import { getSubscriptionRouter } from "./routes/getSubscription";
import { getAllSubscriptionRouter } from "./routes/getAllSubscription";
import { errorHandler } from "./middlewares/errorHandler";
import { cancelSubscriptionRouter } from "./routes/cancellSubscription";

const app = express();
app.use(json());

const swaggerUi = require("swagger-ui-express"),
  swaggerDocument = require("../swagger.json");

app.use(addSubscriptionRouter);
app.use(getAllSubscriptionRouter);
app.use(getSubscriptionRouter);
app.use(cancelSubscriptionRouter);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.all("*", async (req, res) => {
  console.error("Not found");
});

app.use(errorHandler);

export { app };
