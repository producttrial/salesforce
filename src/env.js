'use strict'

module.exports = {
  key: getEnvKey,
};

function getEnvKey() {
  const nodeEnv = (process.env.NODE_ENV || '').toLowerCase();

  const env = ['tst', 'stg', 'prd'].find((e) => {
    return e === nodeEnv;
  });

  return env || 'dev';
}
