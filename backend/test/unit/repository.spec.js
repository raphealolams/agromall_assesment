/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const should = require('should');
const repository = require('../../src/repository/repository');

describe('Repository', () => {
  it('should connect with a promise', (done) => {
    repository.connect({}).should.be.a.Promise();
    done();
  });
});
