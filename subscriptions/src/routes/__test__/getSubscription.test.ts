import request from "supertest";
import { app } from "../../app";

it("should return 200 when getting info from a subscription", async () => {
  const res = await request(app)
    .post("/api/subscription/add")
    .send({
      email: "test@test.dev",
      isOlderThan16: true,
    })
    .expect(201);
  const subscription = await request(app)
    .get(`/api/subscription/${res.body._id}`)
    .expect(200);
  expect(subscription.body.email).toEqual("test@test.dev");
});

it("should return 400 if subscription doesn't exist", () => {
  return request(app).get("/api/subscription/idontexist").expect(400);
});
