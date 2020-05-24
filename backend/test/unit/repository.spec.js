/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const should = require("should");
const Sequelize = require("sequelize");

const repository = require("../../repository/repository");

describe("Repository", () => {
  it("should connect with a promise", (done) => {
    repository.connect({ Sequelize }).should.be.a.Promise();
    done();
  });
});
