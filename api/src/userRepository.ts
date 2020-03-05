import { v4 as uuid } from 'uuid';
import User from './userModel';

const toPlainObject = mongoUser => ({
  id: mongoUser.id,
  email: mongoUser.email,
  givenName: mongoUser.givenName,
  familyName: mongoUser.familyName,
  created: String(mongoUser.created),
});

function toPlainObjects(arrayUsers) {
  return arrayUsers.map(user => toPlainObject(user));
}

export async function getUsers() {
  return toPlainObjects(await User.find());
}

export async function getUser({ id }) {
  return toPlainObject(await User.findOne({ id }));
}

export async function createUser({ user }) {
  const id = uuid();
  return toPlainObject(await User.create({ ...user, id }));
}

export async function updateUser({ id, user }) {
  return toPlainObject(await User.findOneAndUpdate({ id }, { $set: user }, { new: true}));
}

export async function deleteUser({ id }) {
  return toPlainObject(await User.findOneAndDelete({ id }));
}
