import express, { Request, Response } from "express";
import { BadRequestError } from "../errors/badRequestError";

import { Subscription } from "../models/subscription";

const router = express.Router();

router.get("/api/subscription/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  const subscription = await Subscription.findOne({ _id: id });
  if (!subscription) {
    throw new BadRequestError("Subscription not found");
  }
  res.status(200).send(subscription);
});
export { router as getSubscriptionRouter };
