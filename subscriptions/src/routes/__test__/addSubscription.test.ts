import request from "supertest";
import { app } from "../../app";

it("should return 201 on correct subscription", () => {
  return request(app)
    .post("/api/subscription/add")
    .send({
      email: "test@test.dev",
      isOlderThan16: true,
    })
    .expect(201);
});

it("should return 400 if incorrect email", () => {
  return request(app)
    .post("/api/subscription/add")
    .send({
      email: "testtest.dev",
      isOlderThan16: true,
    })
    .expect(400);
});

it("should return 400 if age is not higher than 16", async () => {
  const response = await request(app).post("/api/subscription/add").send({
    email: "test@test.dev",
  });
});

it("should disallow resubscribe", async () => {
  await request(app)
    .post("/api/subscription/add")
    .send({
      email: "test@test.dev",
      isOlderThan16: true,
    })
    .expect(201);
  await request(app)
    .post("/api/subscription/add")
    .send({
      email: "test@test.dev",
      isOlderThan16: true,
    })
    .expect(400);
});
