async function loginAs(agent, email, password) {
  let response = await agent
    .post("/api/users/login")
    .send({ user: { email, password } });

  expect(response.statusCode).toBe(200);
  return response.body.user;
}

module.exports = loginAs;
