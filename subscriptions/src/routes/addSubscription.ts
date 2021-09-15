import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { BadRequestError } from "../errors/badRequestError";
import { RequestValidationError } from "../errors/requestValidationError";
import { validateRequest } from "../middlewares/validateRequest";

import { Subscription } from "../models/subscription";

const router = express.Router();

router.post(
  "/api/subscription/add",
  [body("email").isEmail().withMessage("Email must be valid")],
  validateRequest,
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    const { email, isOlderThan16 } = req.body;

    if (!errors.isEmpty()) {
      throw new RequestValidationError(errors.array());
    }
    if (!isOlderThan16) {
      throw new BadRequestError("You need to be older than 16 to subscribe");
    }
    const subscription = await Subscription.findOne({ email });
    if (subscription) {
      throw new BadRequestError("You are already subscribed");
    }
    const newSubscription = await Subscription.build({ email });
    await newSubscription.save();
    // TODO: Send email notification
    res.status(201).send(subscription);
  }
);
export { router as addSubscriptionRouter };
