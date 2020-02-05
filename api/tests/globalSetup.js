module.exports = async () => {
  console.log('\nStarting server');
  // eslint-disable-next-line global-require
  global.__SERVER__ = require('../src/server');
};
