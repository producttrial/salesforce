'use strict';

const config = require('../../config');
const moment = require('moment');

module.exports = {
  createInvestorQuery,
  readInvestorQuery,
  updateInvestorQuery,
};


const SCHEMA = config.get().db.schema;

function createInvestorQuery(req) {

}

function readInvestorQuery(req) {
  return {
    text: 'SELECT id, name, active, last_password_change' +
    ` FROM ${SCHEMA}.investor` +
    ' WHERE id = $1',
    values: [req.params.investorId],
  };
}

function updateInvestorQuery(req) {
  const investorValues = [];
  let query = `update ${SCHEMA}.investor ` +
    `set id=id`;

  if (req.body.hasOwnProperty('name')) {
    investorValues.push(req.body.name);
    query += `, name = $${investorValues.length}`;
  }

  if (req.body.hasOwnProperty('active')) {
    investorValues.push(req.body.active);
    query += `, active = $${investorValues.length}`;
  }

  if (req.body.hasOwnProperty('password')) {
    investorValues.push(req.body.password);
    query += `, password = $${investorValues.length}`;
    investorValues.push(moment.utc().format('YYYY-MM-DDTHH:mm:ssZ'));
    query += `, last_password_change = $${investorValues.length}`;
  }

  investorValues.push(req.params.investorId);
  query += ` where id = $${investorValues.length}`;

  return {
    text: query,
    values: investorValues,
  };
}

