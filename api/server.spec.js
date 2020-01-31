const request = require("supertest");
const server = require("./server");

//* ========================================================================
describe("server.js", function() {
  describe("environment", function() {
    it("should set environment to development", function() {
      expect(process.env.NODE_ENV).toBe("development");
    });
  });
  //* ========================================================================
  describe("GET /", function() {
    it("should return a 200 OK", function() {
      // starts the server
      return request(server)
        .get("/")
        .then((res) => {
          expect(res.status).toBe(200);
        });
      // make GET request to /
      // look at the http status code for the response
    });
    //* ========================================================================
    it("should return JSON", function() {
      return request(server)
        .get("/")
        .then((res) => {
          expect(res.type).toMatch(/json/i);
        });
    });
    //* ========================================================================
    it("should return ==> Sprint Challenge api is working!!!", function() {
      return request(server)
        .get("/")
        .then((res) => {
          expect(res.body.message).toBe("Sprint Challenge api is working!!!");
        });
    });
    //* ========================================================================
    it("should return a list of users", function() {
      return request(server)
        .post("/api/auth/login")
        .send({ username: "test", password: "123" })
        .then((res) => {
          return request(server)
            .get("/api/users")
            .set("authorization", res.body.token)
            .then((res) => {
              expect(res.status).toBe(200);
              expect(Array.isArray(res.body)).toBe(true);
            });
        });
    });
    //* ========================================================================
    it("should return a 400 bad request when trying to get a list of users", function() {
      return request(server)
        .get("/api/users")
        .then((res) => {
          expect(res.status).toBe(400);
        });
    });
    //* ========================================================================
    it("can log in", function() {
      return request(server)
        .post("/api/auth/login")
        .send({ username: "test", password: "123" })
        .then((res) => {
          expect(res.status).toBe(200);
          expect(res.body.message).toBe("Welcome test!");
        });
    });
  });
  //* ========================================================================
  describe("returns a list of jokes", function() {
    it("should return a 200 ok", function() {
      return request(server)
        .post("/api/auth/login")
        .send({ username: "test", password: "123" })
        .then((res) => {
          return request(server)
            .get("/api/jokes")
            .set("authorization", res.body.token)
            .then((res) => {
              expect(res.status).toBe(200);
            });
        });
    });
    //* ========================================================================
    it("should return a 400 bad request when trying to get the list of jokes", function() {
      return request(server)
        .get("/api/jokes")
        .then((res) => {
          expect(res.status).toBe(400);
        });
    });
  });
});
//* ========================================================================
