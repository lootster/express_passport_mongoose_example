process.env.NODE_ENV = "integration";

const testDB = require("../test_helper/in_memory_mongodb_setup");
const fixtureLoader = require("../test_helper/fixtures");
const fixtures = require("../test_helper/fixtures").fixtures;
const request = require("supertest");
const app = require("../app");

beforeAll(testDB.setup);
beforeAll(fixtureLoader.load);

afterAll(testDB.teardown);

async function loginAsTom(password, agent) {
  let email = fixtures.users.tom.email;
  let response = await agent
    .post("/api/users/login")
    .send({ user: { email, password } });

  expect(response.statusCode).toBe(200);
}

test("Change password on the current user", async () => {
  const agent = request.agent(app);
  await loginAsTom(fixtures.users.tom.password, agent);

  const newPassword = "new-password";
  const updatedUser = {
    password: newPassword
  };

  let response = await agent.put("/api/user").send({ user: updatedUser });

  expect(response.statusCode).toBe(200);

  await loginAsTom(newPassword, agent);
});
