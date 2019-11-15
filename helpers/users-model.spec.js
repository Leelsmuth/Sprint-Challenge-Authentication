const request = require("supertest");
const Users = require("./usersModel");
const db = require("../database/dbConfig");

describe("usersModel", () => {
  // beforeEach cleans up the table, resets the database with truncate()
  beforeEach(async () => {
    await db("users").truncate();
  });

  it("should set environment to testing", () => {
    // expect(process.env.DB_ENV).toBe("production"); --- make test fail first
    expect(process.env.DB_ENV).toBe("testing");
  });

  describe("add()", () => {
    it("should add users into the db", async () => {
      // insert a record
      await Users.add({ username: "Reese", password: "password" });

      let users = await db("users");
      // assert (check) the record was inserted
      //   expect(users).toHaveLength(0);
      expect(users).toHaveLength(1);
    });

    it("should add a user into the db", async () => {
      // insert a record (user)
      const { id } = await Users.add({
        username: "Reese",
        password: "password"
      });
      //   console.log("id", id);
      let user = await db("users")
        .where({ id })
        .first();
      //   console.log(user);
      //   expect(user.username).toBe("Sam");
      expect(user.username).toBe("Reese");
    });
  });
});
