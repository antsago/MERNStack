const fakeDatabase = {};
const User = require('./userModel');

exports.getUser = async ({ id }) =>
  await User.findOne({ id });

exports.createUser = async ({ user }) => {
  const id = require('crypto').randomBytes(10).toString('hex');
  return await User.create({ ...user, id });
};

exports.updateUser = async ({ id, user }) => 
  await User.findOneAndUpdate({ id }, { $set: user }, { new: true});

exports.deleteUser = async ({ id }) =>
  await User.findOneAndDelete({ id });
