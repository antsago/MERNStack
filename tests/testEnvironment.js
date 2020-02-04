const mongoose = require('mongoose');
const NodeEnvironment = require('jest-environment-node');
const Users = require('../src/userModel');

const testUser = {
  id: "testing",
  email: "test@test.com",
  givenName: "Test",
  familyName: "Jest",
}

class E2EEnvironment extends NodeEnvironment {
  async setup() {
    await super.setup();

    await Users.create(testUser);
  }

  async teardown() {
    await mongoose.connection.db.dropCollection('users');
    await super.teardown();
  }
}

module.exports = E2EEnvironment;
