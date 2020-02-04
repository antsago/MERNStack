const fakeDatabase = {};

exports.getUser = ({ id }) => {
  if (!fakeDatabase[id]) {
    throw new Error(`no users exists with id ${id}`);
  }
  return { id, ...fakeDatabase[id] };
};

exports.createUser = ({ user }) => {
  const id = require('crypto').randomBytes(10).toString('hex');

  fakeDatabase[id] = user;
  return { id, ...fakeDatabase[id] };
};

exports.updateUser = ({ id, user }) => {
  if (!fakeDatabase[id]) {
    throw new Error(`no users exists with id ${id}`);
  }
  // This replaces all old data, but some apps might want partial update.
  fakeDatabase[id] = user;
  return { id, ...fakeDatabase[id] };
};

exports.deleteUser = ({ id }) => {
  if (!fakeDatabase[id]) {
    throw new Error(`no users exists with id ${id}`);
  }
  const user = fakeDatabase[id];
  fakeDatabase[id] = undefined;
  return { id, ...user };
};
