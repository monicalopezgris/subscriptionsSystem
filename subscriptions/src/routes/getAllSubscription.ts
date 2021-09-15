import express, { Request, Response } from "express";
import { BadRequestError } from "../errors/badRequestError";

import { Subscription } from "../models/subscription";

const router = express.Router();

router.get("/api/subscription/all", async (req: Request, res: Response) => {
  const subscriptionList = await Subscription.find({});
  res.status(200).send(subscriptionList);
});
export { router as getAllSubscriptionRouter };
