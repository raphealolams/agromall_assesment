/* eslint-disable no-undef */
require('dotenv').config();
const { EventEmitter } = require('events');
const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const test = require('assert');
const database = require('../../src/models/index');
const { dbSettings } = require('../../src/config/env_to_config');

describe('MySQL Connection', () => {
  it('should emit db Object with an EventEmitter', (done) => {
    const mediator = new EventEmitter();

    mediator.on('db.ready', (db) => {
      test.ok(db.sequelize);
      test.ok(db.Sequelize);
      done();
    });

    mediator.on('db.error', (err) => {
      done(err);
    });

    database.connect({
      Sequelize, fs, path, dbSettings,
    }, mediator);

    mediator.emit('boot.ready');
  });
});
