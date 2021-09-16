import request from "supertest";
import { app } from "../../app";

it("should return 400 when the user from the cancel subscription doesn't exist", () => {
  return request(app).delete("/api/subscription/e888").expect(400);
});

it("should return 200 if correct subscription cancellation", async () => {
  const res = await request(app)
    .post("/api/subscription/add")
    .send({
      email: "test@test.dev",
      isOlderThan16: true,
    })
    .expect(201);
  await request(app).delete(`/api/subscription/${res.body._id}`).expect(200);
});
