const request = require("supertest");
const { app, server } = require("../server");

describe("User API", () => {
  let userId;

  afterAll((done) => {
    server.close(done);
  });

  it("should create a new user", async () => {
    const response = await request(app)
      .post("/users")
      .send({ firstname: "John", lastname: "Doe" });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("firstname", "John");
    userId = response.body._id; // Save the user ID for further tests
  });

  it("should fetch all users", async () => {
    const response = await request(app).get("/users");

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
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
