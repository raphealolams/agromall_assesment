/* eslint-disable no-undef */
const server = require("../../server/server");
const api = require("../../api");

describe("Server", () => {
  it("should require a repository to start", () =>
    server
      .start(api, {
        repo: {},
      })
      .should.be.rejectedWith(/repository/));

  it("should require a port to start", () =>
    server
      .start(api, {
        port: {},
      })
      .should.be.rejectedWith(/port/));
});
