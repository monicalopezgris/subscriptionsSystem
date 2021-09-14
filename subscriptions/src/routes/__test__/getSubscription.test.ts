import request from "supertest";
import { app } from "../../index";

it("should return 200 when getting info o a subscription", async () => {
  const res = await request(app)
    .post("/api/subscription/add")
    .send({
      email: "test@test.dev",
      olderThan16: true,
    })
    .expect(200);
  const subscription = await request(app)
    .get(`/api/subscription/${res.body._id}`)
    .expect(200);
  expect(subscription.body.email).toEqual("test@test.dev");
});

it("should return 400 if subscription doesn't exist", () => {
  return request(app).get("/api/subscription/888").expect(400);
});
