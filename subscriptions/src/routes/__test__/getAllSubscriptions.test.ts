import request from "supertest";
import { app } from "../../index";

it("should return 200 and the list of subscriptions", async () => {
  await request(app)
    .post("/api/subscription/add")
    .send({
      email: "test@test.dev",
      olderThan16: true,
    })
    .expect(200);
  await request(app)
    .post("/api/subscription/add")
    .send({
      email: "test2@test.dev",
      olderThan16: true,
    })
    .expect(200);
  const subscriptionList = await request(app)
    .get("/api/subscription/all")
    .expect(200);
  expect(subscriptionList.body[0].email).toEqual("test@test.dev");
  expect(subscriptionList.body[1].email).toEqual("test2@test.dev");
});

it("should return 200 and an empty array if there aren't subscriptions", async () => {
  const subscriptionList = await request(app)
    .get("/api/subscription/all")
    .expect(200);
  expect(subscriptionList.body).toEqual([]);
});
