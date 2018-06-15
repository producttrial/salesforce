'use strict';

const express = require('express');


module.exports = {
  router,
};

function router() {
  const router = express.Router();

  router.route('/')
    .get((req, res) => res.send('Running!'));

  return router;
}
