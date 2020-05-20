/* eslint-disable no-undef */
const server = require('../../src/server/server');
const api = require('../../src/api');

describe('Server', () => {
  it('should require a port to start', () => server.start(api, {
    repo: {},
  }).should.be.rejectedWith(/port/));

  it('should require a repository to start', () => server.start(api, {
    port: {},
  }).should.be.rejectedWith(/repository/));
});
