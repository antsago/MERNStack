const mongoose = require('mongoose')

module.exports = async () => {
  await mongoose.connection.db.dropDatabase()
  global.__SERVER__.close()

  // Give the chance for gracefull shutdown before forcing it
  setTimeout(() => process.exit(0), 500)
}
