/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const should = require('should');
const _ = require('lodash');
const validators = require('../../src/utils/validators');

const v = validators(_);
const body = {
  fristName: 'Raphael',
  lastName: 'ajilore',
  email: 'raphealolams@gmail.com',
  role: 'user',
};

describe('Validator', () => {
  it('should validate a query string', (done) => {
    v.isValidQuery({}).should.be.an.instanceOf(Object);
    done();
  });


  it('should validate that the request body is not empty', (done) => {
    should.equal(v.checkRequestContent(body), undefined);
    done();
  });

  it('should validate that the required request body is not empty', (done) => {
    should.equal(v.checkRequestBody(body, ['email']), undefined);
    done();
  });


  it('should validate that the a valid email is passed', (done) => {
    v.isEmail(body.email).should.be.an.instanceOf(Boolean);
    done();
  });
});
