const request = require("supertest");
const app = require("./index.js"); // Assuming your Express app is named 'app'

describe("Authentication Endpoints", () => {
  beforeAll(async () => {
    await mongoose.connect("mongodb://localhost:27017/mydatabase", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  test("example test", async () => {
    // Your test code here
    // If you need to log the connection information, do it here
    console.log(`mongodb connected :${mongoose.connection.host}`);
  });

  it("should create a new user account", async () => {
    const res = await request(app).post("/api/auth/signup").send({
      firstname: "testuser",
      lastname: "testlast",
      email: "test@email.com",
      phoneno: 78415124,
      password: "password",
    });
    expect(res.statusCode).toEqual(201);
  });

  it("should log in to an existing user account and receive an access token", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({ username: "testuser", password: "password" });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("token");
  });
});

describe("Note Endpoints", () => {
  let token;

  beforeAll(async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({ username: "testuser", password: "password" });
    token = res.body.token;
  });

  it("should get a list of all notes for the authenticated user", async () => {
    const res = await request(app)
      .get("/api/notes")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  // Add more test cases for other endpoints
});
