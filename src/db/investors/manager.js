'use strict';

const config = require('../../config');
const moment = require('moment');
const queries = require('./queries');
const rp = require('request-promise');


module.exports = {
  create,
  readSingle,
  update,
};

function create(req) {
 // TODO: implement this
}

function readSingle(req) {
  // TODO: validate request

  const query = queries.readInvestorQuery(req);
  let investorData = {}

  // TODO: parallel calls to DB and unified service

  return config.db().oneOrNone(query)
    .then(data => {
      if (!data) {
        throwError(
          errorCodes.NOT_FOUND,
          `Investor ${req.params.investorId} does not exist.`);
      }
      return data;
    })
    .then(data => {
      investorData = data;
      return getInvestorFromUnified(req.params.investorId)
        .then(investor => {
          const unifiedTime = moment(investor['last_password_changed'], 'YYYY-MM-DDTHH:mm:ssZ');
          const salesforceTime = moment(investorData['last_password_changed'], 'YYYY-MM-DDTHH:mm:ssZ');
          if (unifiedTime.isBefore(salesforceTime)) {
            investorData['last_password_changed'] = investor['last_password_changed'];
          }

          return investorData;
        });
    })
    .catch(err => {
      if (err.code === errorCodes.NOT_FOUND) {
        throw err;
      }

      // TODO: Log unknown error
    });
}

function update(req) {
  // TODO: validate request
  const query = queries.updateInvestorQuery(req);

  return config.db().result(query)
    .then(result => {
      if (!result.rowCount) {
        errors.throwError(
          errors.codes.NOT_FOUND,
          `Investor ${req.params.investorId} does not exist.`);
      }
    })
    .catch(err => {
      if (err.code === errorCodes.NOT_FOUND) {
        throw err;
      }

      // TODO: Log unknown error
    });
}

function getInvestorFromUnified(investorId) {
  const unified = config.get().unified;
  return rp(`${unified.host}:${unified.port}/investors/${investorId}`);
}

// TODO: extract this
function throwError(code, message) {
  throw {
    code: code,
    message: message,
    errorResponse: {
      errors: [
        {
          message: message,
        },
      ],
    },
  };
}

const errorCodes = {
  NOT_FOUND: 1,
};
