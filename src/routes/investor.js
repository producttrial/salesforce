'use strict';

var investors = require('../db/investors/manager');
var express = require('express');


module.exports = {
  router: () => {
    const router = express.Router();

    router.route('/').post((req, res) => {
      return investors.create();
    });

    router.route('/:investorId').get((req, res) => {
      return investors.readSingle(req)
        .then(data => res.json(data))
        .catch(err => {
          // TODO: handle 5xx error codes
          res.status(400).json(err.errorResponse);
        });
    });

    router.route('/:investorId').patch((req, res) => {
      return investors.update(req)
        .then(() => res.status(204).end())
        .catch(err => {
          console.log(err);
          console.log('err');
          // TODO: handle 5xx error codes
          res.status(400).json(err.errorResponse);
        });
    });

    return router;
  },
};
