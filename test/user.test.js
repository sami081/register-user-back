// test/user.test.js
const request = require("supertest");
const mongoose = require("mongoose");
const { app } = require("../server");

let userId;

describe("User API", () => {
  it("should create a new user", async () => {
    const response = await request(app)
      .post("/users")
      .send({
        firstname: "John",
        surname: "Doe",
        email: "john.doe@example.com",
        phone: "1234567890",
        dateOfBirth: "1990-01-01",
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("user._id");
    expect(response.body.user.firstname).toBe("John");
    expect(response.body.user.surname).toBe("Doe");

    userId = response.body.user._id;
  });

  it("should fetch all users", async () => {
    const response = await request(app).get("/users");

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body.length).toBeGreaterThan(0);
  });

  it("should update an existing user", async () => {
    const response = await request(app)
      .put(`/users/${userId}`)
      .send({ firstname: "Jane" });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("firstname", "Jane");
  });

  it("should delete an existing user", async () => {
    const response = await request(app).delete(`/users/${userId}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("message", "User deleted successfully");
  });
});
