const User = require('./userModel');

const toPlainObject = mongoUser => ({
  id: mongoUser.id,
  email: mongoUser.email,
  givenName: mongoUser.givenName,
  familyName: mongoUser.familyName,
  created: String(mongoUser.created),
});

const toPlainObjects = arrayUsers =>
  arrayUsers.map(user => toPlainObject(user));

exports.getUsers = async () =>
  toPlainObjects(await User.find());

exports.getUser = async ({ id }) =>
  toPlainObject(await User.findOne({ id }));

exports.createUser = async ({ user }) => {
  const id = require('crypto').randomBytes(10).toString('hex');
  return toPlainObject(await User.create({ ...user, id }));
};

exports.updateUser = async ({ id, user }) => 
  toPlainObject(await User.findOneAndUpdate({ id }, { $set: user }, { new: true}));

exports.deleteUser = async ({ id }) =>
  toPlainObject(await User.findOneAndDelete({ id }));
