const mongoose = require('mongoose')
const NodeEnvironment = require('jest-environment-node')
const Users = require('../src/userModel')

const testUser = {
  id: 'testing',
  email: 'test@test.com',
  givenName: 'Test',
  familyName: 'Jest'
}

// The code is mostly an skeleton with the different technologies and
// very little business logic. As such, end2end and integration
// tests make more sense than unit ones.

// This environment aims at creating a reproducible test environment
// for every test suite. This is done mostly as a learning exercise
// as it is entirely superfluous for the current code.

// UnitTests can easily skip this setup face by using the
// '@jest-environment node' annotation.

class E2EEnvironment extends NodeEnvironment {
  async setup () {
    await super.setup()

    await Users.create(testUser)
  }

  async teardown () {
    await mongoose.connection.db.dropCollection('users')
    await super.teardown()
  }
}

module.exports = E2EEnvironment
