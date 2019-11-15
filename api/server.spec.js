const request = require("supertest");
const server = require("./server");
const db = require("../database/dbConfig");

describe("server", () => {
  beforeEach(async () => {
    await db("users").truncate();
  });

  describe("POST /api/auth/register", () => {
    it("should return 201 status and return the correct username for register", () => {
      return request(server)
        .post("/api/auth/register")
        .send({
          username: "femi",
          password: "password2"
        })
        .set("Content-Type", "application/json")
        .then(res => {
          expect(res.status).toBe(201);
          expect(res.body.username).toBe("femi");
        });
    });
  });

  describe("POST /api/auth/login", () => {
    it("should return 201 status and return the correct username for login", () => {
      return request(server)
        .post("/api/auth/login")
        .send({
          username: "femi",
          password: "password2"
        })
        .set("Content-Type", "application/json")
        .then(res => {
          expect(res.status).toBe(201);
          expect(res.body.username).toBe("femi");
        });
    });
  });
});
