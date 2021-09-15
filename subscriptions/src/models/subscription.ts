import { Model, Document, Schema, model } from "mongoose";

interface SubscriptionData {
  email: string;
}

interface SubscriptionDoc extends Document {
  email: string;
}

interface SubscriptionModel extends Model<SubscriptionDoc> {
  build(data: SubscriptionData): SubscriptionDoc;
}

const subscriptionSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
});

subscriptionSchema.statics.build = (data: SubscriptionData) => {
  return new Subscription(data);
};

const Subscription = model<SubscriptionDoc, SubscriptionModel>(
  "Subscription",
  subscriptionSchema
);

export { Subscription };
