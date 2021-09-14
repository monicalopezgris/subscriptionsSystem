import request from "supertest";
import { app } from "../../index";

it("should return 201 on correct subscription", () => {
  return request(app)
    .post("/api/subscription/add")
    .send({
      email: "test@test.dev",
      olderThan16: true,
    })
    .expect(201);
});

it("should return 400 if incorrect email", () => {
  return request(app)
    .post("/api/subscription/add")
    .send({
      email: "testtest.dev",
      olderThan16: true,
    })
    .expect(400);
});

it("should return 400 if age is not higher than 16", async () => {
  await request(app)
    .post("/api/subscription/add")
    .send({
      email: "test@test.dev",
      olderThan16: false,
    })
    .expect(400);
  await request(app)
    .post("/api/subscription/add")
    .send({
      email: "test@test.dev",
      olderThan16: null,
    })
    .expect(400);
});

it("should return 400 if missing data", async () => {
  await request(app).post("/api/subscription/add").send({}).expect(400);
  await request(app)
    .post("/api/subscription/add")
    .send({ email: "test@test.dev" })
    .expect(400);
  await request(app)
    .post("/api/subscription/add")
    .send({ olderThan16: true })
    .expect(400);
});

it("should allow resubscribe", async () => {
  await request(app)
    .post("/api/subscription/add")
    .send({
      email: "test@test.dev",
      olderThan16: true,
    })
    .expect(201);
  await request(app)
    .post("/api/subscription/add")
    .send({
      email: "test@test.dev",
      olderThan16: true,
    })
    .expect(201);
});
