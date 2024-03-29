require("ts-node/register");

// REFERENCE TYPESCRIPT MODULES
const { setup } = require("./setup");

module.exports = async function () {
  // CALL TS MODULE INITIALIZE METHODS
  if (!process.env.TEST_HOST) {
    await setup();
  }
  return null;
};
