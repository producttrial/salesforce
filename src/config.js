'use strict';

const config = require('../config');
const env = require('./env');
const pgp = require('pg-promise')();


module.exports = (() => {
  const db = getDb();

  return {
    db: () => db,
    get,
  };
})();

function get() {
  return config[env.key()] || {};
}

function validateConfig() {
  // TODO: validate configuration to make sure it has everything to run and matches a defined schema
}

function getDb() {
  return config[env.key()] && config[env.key()].db ?
    pgp(config[env.key()].db) :
    null;
}